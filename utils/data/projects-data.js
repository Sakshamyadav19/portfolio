import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'MultiThreaded Proxy Web Server',
        description: "Developed a high-performance, multithreaded proxy web server in Go, leveraging a Least Recently Used (LRU) caching mechanism to optimize resource handling and reduce response times for frequently accessed data. By utilizing Go's goroutines and channels, I efficiently managed concurrent connections, demonstrating the ability to design scalable and thread-safe solutions for complex networking applications.",
        tools: ['Go', 'Goroutines', 'Mutexes', 'LRU', 'Threads'],
        role: 'Backend Developer',
        code: '',
        demo: 'https://github.com/Sakshamyadav19/multithreaded_web_server',
        image: crefin,
    },
    {
        id: 2,
        name: 'Draw.io',
        description: 'Developed a real-time Pictionary game that increased player retention by 35% through features like customizable room creation, dynamic leaderboards, and intuitive drawing tools. Efficiently managed user interactions and a point system to ensure smooth, engaging gameplay, demonstrating strong problem-solving and user-focused design skills.',
        tools: ['ReactJS', 'Tailwind CSS', "Redux", "NodeJS", "Express", "Sockets", "Shadcn"],
        role: 'Full Stack Developer',
        code: '',
        demo: 'https://draw-swart.vercel.app/',
        image: travel,
    },
    {
        id: 3,
        name: 'EasyShare',
        description: 'Led the development of a blockchain-based system for secure document storage and sharing within a university, transforming document management with enhanced security and efficiency. Implemented advanced cryptography techniques, reducing paperwork and manual tasks by 50% while ensuring transparency and authenticity of document ownership and content.',
        tools: ['Blockchain', 'Cryptography', 'React', 'Node', 'Express', 'MongoDB','JWT'],
        code: '',
        role: '',
        demo: 'https://github.com/muleyashutosh/miniature-octo-robot-frontend',
        image: realEstate,
    }
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