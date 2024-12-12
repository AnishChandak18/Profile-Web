import { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'DeFi Dashboard',
    description: 'A comprehensive DeFi dashboard for tracking yields, liquidity pools, and token positions across multiple chains. Features real-time price feeds and portfolio analytics.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'TypeScript', 'ethers.js', 'Web3Modal', 'TailwindCSS'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'web3'
  },
  {
    title: 'Blockchain Chat App',
    description: 'Decentralized messaging application with end-to-end encryption, token-gated access, and permanent message storage on IPFS.',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'Solidity', 'IPFS', 'Push Protocol'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'web3'
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Interactive dashboard featuring AI-driven insights, real-time data visualization, and customizable widgets for personal productivity.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'D3.js', 'TailwindCSS', 'OpenAI API'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'frontend'
  },
  {
    title: 'Study Planner App',
    description: 'Personalized study planning application with smart scheduling, progress tracking, and adaptive learning paths.',
    image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Redux'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'frontend'
  }
];