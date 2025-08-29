import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
  {
    id: 1,
    name: 'PixlDB',
    description: 'Architected a Go-based key–value store with a modular B+ Tree engine and a buffered Write-Ahead Log. Sustained ~129K ops/sec (≈77K writes/sec, 52K reads/sec) with sub-ms average latency, supporting durable range queries, node split/merge, and pluggable JSON persistence.',
    tools: ['Go', 'B+ Tree', 'WAL', 'Concurrency', 'Mutexes', 'JSON Persistence'],
    role: 'Systems/Backend Engineer',
    code: 'https://github.com/Sakshamyadav19/pixlDB',
    demo: '',
    image: ayla,
  },
  {
    id: 2,
    name: 'GAN-based Emoji Generator',
    description: 'Implemented a DCGAN in PyTorch (5-layer Generator/Discriminator) trained on ~8k 64×64 emoji-style faces with on-the-fly augmentation. Tracked experiments and metrics using torchvision/NumPy; improved sample fidelity through longer training and regularization.',
    tools: ['Python', 'PyTorch', 'torchvision', 'NumPy', 'Pillow', 'Matplotlib', 'DCGAN'],
    role: 'ML Engineer',
    code: 'https://github.com/Sakshamyadav19/GAN-Emoji-Generator',
    demo: '',
    image: crefin,
  },
  {
    id: 3,
    name: 'SenseiBoard – AI Chess Assistant',
    description: 'Integrated LangGraph + LlamaIndex with an MCP server to auto-extract FEN from live games and deliver on-board, real-time strategy tips. Designed a RAG pipeline with caching to serve recommendations in under ~3 seconds.',
    tools: ['Python', 'LangGraph', 'LlamaIndex', 'RAG', 'MCP'],
    role: 'AI Engineer',
    code: 'https://github.com/Sakshamyadav19/Chess-Sensei',
    demo: '',
    image: realEstate,
  },
  {
    id: 4,
    name: 'FirstFix – AI-Powered GitHub Issue Helper',
    description: 'Engineered a platform that ingests repo context and issues into a Vector DB (ChromaDB) to recommend “good first issues.” Built a RAG pipeline with persistent embeddings and caching, cutting redundant API calls and improving latency by ~40%.',
    tools: ['Python', 'Flask', 'React', 'LangGraph', 'RAG', 'VectorDB', 'ChromaDB'],
    role: 'Full Stack / AI Engineer',
    code: 'https://github.com/Sakshamyadav19/fastfixbackend',
    demo: 'https://firstfixfrontend.vercel.app/',
    image: travel,
  },
  {
    id: 5,
    name: 'Draw.io (Real-time Pictionary)',
    description: 'Built a real-time multiplayer Pictionary with room creation, live scoring, and leaderboards via Socket.io. Improved player retention by 35% and doubled average session length with tailored UX and 15+ custom UI components.',
    tools: ['React', 'Redux', 'Tailwind CSS', 'Shadcn', 'Node.js', 'Express', 'Socket.io'],
    role: 'Full Stack Developer',
    code: 'https://github.com/Sakshamyadav19/Draw',
    demo: 'https://draw-swart.vercel.app/',
    image: travel,
  },
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },