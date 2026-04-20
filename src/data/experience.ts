export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    title: 'Technical Manager',
    company: 'Knorex',
    period: 'Jan 2025 – Present',
    description: [
      'Manage 10 frontend engineers across 3 simultaneous product tracks in an Agile/Scrum environment, sustaining an 85%+ on-time delivery rate and cutting sprint carryover from 6 to 2 tickets per cycle — with zero headcount increase.',
      'Architected CI/CD pipelines using Docker, Kubernetes, and AWS — reducing production release failures by 20%+ and cutting average deployment time from 45 minutes to under 10, enabling 3x faster shipping cadence.',
      'Shipped a unified admin dashboard consolidating 3 product workflows, cutting client onboarding time by 60% and eliminating ~8 hours/week of manual cross-tool reconciliation.',
      'Drove React and Next.js frontend architecture decisions — enforcing component reusability, code-splitting strategies, and bundle size optimisations that improved Lighthouse performance scores by an average of 15 points.',
      'Partnered with Product and Design to define sprint goals, prioritise backlogs, and translate business requirements into technical roadmaps.',
      'Standardised engineering best practices: pull request reviews, ESLint/Prettier pipelines, and technical documentation — reducing new hire onboarding time by an estimated 30%.',
    ].join('\n\n'),
  },
  {
    title: 'Frontend Team Lead',
    company: 'Unifynd',
    period: 'Jun 2023 – Jan 2025',
    description: [
      'Led 5 frontend engineers to architect multi-brand loyalty platforms serving 25K+ monthly active users — delivering 4 brand integrations in 6 months at 99.5% uptime.',
      'Diagnosed and resolved Shopify widget performance bottlenecks through lazy loading and render optimisations — reducing load time by 35% and lifting activation rates by 18%.',
      'Instituted bi-weekly cross-functional syncs between frontend, backend, and QA — reducing bug resolution time from 3 days to under 4 hours and eliminating 4 recurring blockers per sprint.',
      'Architected 3 CRM and application dashboards using microfrontend architecture and BDD in Agile settings — reducing deploy conflicts by 40% and compressing release cycles from 3 weeks to 6 days.',
      'Implemented responsive design, cross-browser compatibility, and WCAG accessibility standards across all products.',
      'Collaborated with UX/UI designers to translate Figma prototypes into pixel-perfect, accessible React components.',
      'Founded a monthly internal tech learning programme (18+ sessions), growing attendance from 4 to 14 engineers.',
    ].join('\n\n'),
  },
  {
    title: 'Senior Software Engineer',
    company: 'Ivory Technolabs',
    period: 'Mar 2022 – Jun 2023',
    description: [
      'Sole-engineered a no-code, AI-integrated storefront builder for D2C brands using Next.js 14 with SSR and ISR — enabling merchants to launch in under 2 hours vs. 3–5 days previously, onboarding 8+ brands in 4 months.',
      'Single-handedly built a real-time ERP dashboard for an insurance firm managing 500+ brokers using WebSockets and SSR — processing 10K+ transactions/month and reducing broker reporting time by 40%.',
      'Built a Jest unit testing suite achieving 75% code coverage — reducing manual QA effort by 6 hours per sprint and cutting regression bugs by 30% within 3 months.',
      'Applied performance optimisations including memoisation, virtualised lists, debounced handlers, and lazy loading.',
    ].join('\n\n'),
  },
  {
    title: 'Software Engineer',
    company: 'Zeus Learning',
    period: 'Jan 2020 – Mar 2022',
    description: [
      'Delivered 6+ React + Redux web applications for e-learning platforms, integrating 5+ third-party APIs — maintaining a sub-2% post-release bug rate.',
      'Worked within Agile delivery cycles: sprint planning, stand-ups, retrospectives, and backlog grooming.',
      'Shipped 10+ UI feature enhancements informed by user feedback and A/B testing — improving session engagement by ~12%.',
      'Built and maintained reusable component libraries and technical documentation.',
    ].join('\n\n'),
  },
];
