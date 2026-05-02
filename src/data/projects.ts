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
  {
    title: 'Stadium Pulse',
    description:
      'Stadium Pulse is a full-stack web app for social IPL predictions: private circles, match-winner voting when polls open, and per-group leaderboards—fan engagement without stakes. Built with Next.js (App Router), React, TypeScript, and Tailwind CSS, it exposes RESTful APIs via Next.js Route Handlers for tournaments, votes, leaderboards, profiles, and joins, with server logic separated from the UI. Data lives in PostgreSQL via Prisma (relational modelling, migrations, indexes, constraints). Supabase handles authentication, SSR-friendly sessions, and middleware-protected routes; Row Level Security SQL supports database-aligned access control. Third-party REST integration supplies IPL fixture and schedule data with display metadata. The app delivers onboarding, dashboards, tournament creation, invite codes, voting, live and history views, results, leaderboards, and account flows—showing end-to-end full-stack work across frontend, backend, ORM, auth, and external APIs.',
    image:
      'https://images.unsplash.com/photo-1531415074967-36d4fd3bc9c3?auto=format&fit=crop&q=80&w=800',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Supabase',
      'Tailwind CSS',
      'REST APIs',
    ],
    category: 'frontend',
    demo: 'https://stadium-pulse-app.vercel.app/',
  },
];
