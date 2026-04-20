import { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'Option/Future Trading Tool',
    description:
      'Full-stack strategy backtesting platform enabling traders to simulate option/futures strategies using historical market data. Features configurable parameters, real-time P&L visualisation, and performance analytics. Built with performance optimisation for large financial datasets and responsive design across device sizes.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'WebSockets',
      'Charting Libraries',
    ],
    category: 'frontend',
  },
  {
    title: 'AI Note Keeper',
    description:
      'Productivity notes app integrating OpenAI API for auto-summarisation, smart tagging, and AI-assisted formatting. Built with component-driven architecture, scalable state management, and UX optimisation for daily-use tools. Includes rich-text editing, search, and tag-based organisation.',
    image:
      'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'TypeScript', 'OpenAI API', 'REST APIs'],
    category: 'frontend',
  },
];
