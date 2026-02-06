/**
 * Agent script - runs inside Vercel Sandbox.
 * Implements ReAct-style loop with explicit tools: read_file, edit_file, run_command, list_directory.
 * Validates with user-provided BUILD_COMMAND, retries on failure, creates PR on success.
 */
import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REQUIREMENTS = process.env.REQUIREMENTS || '';
const INSTALL_COMMAND = process.env.INSTALL_COMMAND?.trim() || '';
const BUILD_COMMAND = process.env.BUILD_COMMAND?.trim() || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_URL = process.env.REPO_URL || ''; // Passed for PR creation
const MAX_RETRIES = 3;

const client = new Anthropic();

const TOOLS = [
  {
    name: 'read_file',
    description: 'Read the contents of a file. Use relative paths from the repository root.',
    input_schema: {
      type: 'object',
      properties: { path: { type: 'string', description: 'Relative file path' } },
      required: ['path'],
    },
  },
  {
    name: 'edit_file',
    description: 'Overwrite a file with new content. Use relative paths. Preserve exact formatting where possible.',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Relative file path' },
        content: { type: 'string', description: 'New file content' },
      },
      required: ['path', 'content'],
    },
  },
  {
    name: 'run_command',
    description: 'Run a shell command. Returns stdout, stderr, and exit code.',
    input_schema: {
      type: 'object',
      properties: {
        cmd: { type: 'string', description: 'Command to run (e.g. npm, git)' },
        args: { type: 'array', items: { type: 'string' }, description: 'Arguments' },
        cwd: { type: 'string', description: 'Working directory (optional)' },
      },
      required: ['cmd', 'args'],
    },
  },
  {
    name: 'list_directory',
    description: 'List files and directories in a path. Use . for repo root.',
    input_schema: {
      type: 'object',
      properties: { path: { type: 'string', description: 'Relative directory path' } },
      required: ['path'],
    },
  },
  {
    name: 'done',
    description: 'Signal that you have finished making all changes and are ready for validation. Call this when no more edits are needed.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
];

function executeTool(name, input) {
  const cwd = process.cwd();
  const resolvePath = (p) => (path.isAbsolute(p) ? p : path.join(cwd, p));

  try {
    switch (name) {
      case 'read_file': {
        const filePath = resolvePath(input.path);
        const content = fs.readFileSync(filePath, 'utf-8');
        return { ok: true, content };
      }
      case 'edit_file': {
        const filePath = resolvePath(input.path);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, input.content, 'utf-8');
        return { ok: true, message: `Wrote ${input.path}` };
      }
      case 'run_command': {
        const cmdCwd = input.cwd ? resolvePath(input.cwd) : cwd;
        try {
          const result = execSync(
            [input.cmd, ...(input.args || [])].join(' '),
            { encoding: 'utf-8', cwd: cmdCwd, stdio: ['pipe', 'pipe', 'pipe'] }
          );
          return { ok: true, stdout: result || '(empty)', stderr: '', exitCode: 0 };
        } catch (e) {
          return {
            ok: false,
            stdout: e.stdout || '',
            stderr: e.stderr || e.message || '',
            exitCode: e.status ?? 1,
          };
        }
      }
      case 'list_directory': {
        const dirPath = resolvePath(input.path || '.');
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        const list = entries.map((e) => (e.isDirectory() ? `${e.name}/` : e.name));
        return { ok: true, entries: list };
      }
      case 'done':
        return { ok: true, message: 'Ready for validation' };
      default:
        return { ok: false, error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function runValidation() {
  if (!INSTALL_COMMAND && !BUILD_COMMAND) return { passed: true, output: '(skipped - no install or build command)' };
  try {
    if (INSTALL_COMMAND) {
      console.log('Installing dependencies...');
      execSync(INSTALL_COMMAND, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true,
      });
    }
    if (BUILD_COMMAND) {
      execSync(BUILD_COMMAND, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true,
      });
    }
    return { passed: true, output: '(success)' };
  } catch (e) {
    return {
      passed: false,
      output: [e.stdout, e.stderr].filter(Boolean).join('\n') || e.message,
    };
  }
}

function parseRepoOwnerName(repoUrl) {
  // https://github.com/owner/repo or https://github.com/owner/repo.git
  const m = repoUrl.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, '') } : null;
}

async function createPR(branchName, baseBranch) {
  const info = parseRepoOwnerName(REPO_URL);
  if (!info || !GITHUB_TOKEN) {
    throw new Error('Cannot create PR: missing REPO_URL or GITHUB_TOKEN');
  }
  const res = await fetch(
    `https://api.github.com/repos/${info.owner}/${info.repo}/pulls`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        title: `Questom: ${REQUIREMENTS.slice(0, 80)}${REQUIREMENTS.length > 80 ? '...' : ''}`,
        head: branchName,
        base: baseBranch,
        body: `Automated changes by Questom.\n\nRequirements:\n${REQUIREMENTS}`,
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${err}`);
  }
  const pr = await res.json();
  return pr.html_url;
}

async function main() {
  const repoRoot = process.cwd();
  let tryCount = 0;
  let validated = false;

  const systemPrompt = `You are a code-editing agent. The user has requested the following changes:

${REQUIREMENTS}

You are working in a cloned Git repository. Use the available tools to:
1. Explore the codebase (list_directory, read_file)
2. Make the required changes (edit_file)
3. Run commands if needed (run_command, e.g. npm install)
4. When done with ALL changes, call the 'done' tool

Work incrementally. Read files before editing. Make minimal, targeted changes.
When finished, call 'done' to trigger validation.`;

  let messages = [
    {
      role: 'user',
      content: `Apply the requested changes. Requirements:\n\n${REQUIREMENTS}\n\nStart by exploring the repo structure with list_directory, then make the necessary edits. Call 'done' when finished.`,
    },
  ];

  while (tryCount < MAX_RETRIES) {
    tryCount++;
    console.log(`\n--- Agent iteration ${tryCount}/${MAX_RETRIES} ---\n`);

    // LLM tool loop
    let doneCalled = false;
    while (true) {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: systemPrompt,
        messages,
        tools: TOOLS,
        tool_choice: { type: 'auto' },
      });

      const assistantContent = response.content || [];
      const assistantBlocks = assistantContent.filter(
        (b) => b.type === 'text' || b.type === 'tool_use'
      );

      messages.push({
        role: 'assistant',
        content: assistantBlocks,
      });

      if (response.stop_reason === 'end_turn') {
        break;
      }

      if (response.stop_reason !== 'tool_use') {
        break;
      }

      const toolUses = assistantContent.filter((b) => b.type === 'tool_use');
      const toolResults = [];

      for (const block of toolUses) {
        if (block.type !== 'tool_use') continue;
        if (block.name === 'done') {
          doneCalled = true;
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify({ ok: true }),
          });
          continue;
        }
        const result = executeTool(block.name, block.input || {});
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }

      messages.push({
        role: 'user',
        content: toolResults,
      });

      if (doneCalled) break;
    }

    // Validation
    console.log('Running validation...');
    const validation = await runValidation();

    if (validation.passed) {
      validated = true;
      console.log('Validation passed.');
      break;
    }

    console.log('Validation failed:\n', validation.output);
    messages.push({
      role: 'user',
      content: `Validation failed. Build/test output:\n\n${validation.output}\n\nPlease fix the issues and try again. Call 'done' when ready for re-validation.`,
    });
  }

  if (!validated) {
    console.error('Max retries exceeded. Validation did not pass.');
    process.exit(1);
  }

  // Create branch, commit, push, PR
  const timestamp = Date.now();
  const branchName = `questom-fix-${timestamp}`;

  execSync('git config user.email "questom@localhost"', { stdio: 'pipe' });
  execSync('git config user.name "Questom"', { stdio: 'pipe' });
  const baseBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  execSync(`git checkout -b ${branchName}`, { stdio: 'pipe' });
  execSync('git add -A', { stdio: 'pipe' });
  try {
    execSync(`git commit -m "Questom: ${REQUIREMENTS.slice(0, 72).replace(/"/g, "'")}..."`, {
      stdio: 'pipe',
    });
  } catch (e) {
    console.error('Nothing to commit - no changes?', e.message);
    process.exit(1);
  }

  const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
  const authUrl = remoteUrl.replace(
    /^(https:\/\/)([^@]+@)?/,
    `$1x-access-token:${GITHUB_TOKEN}@`
  );
  execSync(`git push ${authUrl} ${branchName}`, { stdio: 'pipe' });

  const prUrl = await createPR(branchName, baseBranch);
  console.log(`\n✓ PR created: ${prUrl}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
