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
    description: 'Managing 10 engineers across 3 product tracks with an 85%+ on-time delivery rate. Architected CI/CD pipelines (Docker, Kubernetes, AWS) that cut deployment time from 45 min to under 10. Shipped a unified admin dashboard that reduced client onboarding time by 60%.',
  },
  {
    title: 'Frontend Team Lead',
    company: 'Unifynd',
    period: 'Jun 2023 – Jan 2025',
    description: 'Led 5 engineers delivering multi-brand loyalty platforms for 25K+ monthly users at 99.5% uptime. Cut Shopify widget load time by 35% through targeted render optimisations. Compressed release cycles from 3 weeks to 6 days via microfrontend architecture.',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Ivory Technolabs',
    period: 'Mar 2022 – Jun 2023',
    description: 'Built a no-code AI storefront builder (Next.js SSR/ISR) that reduced merchant launch time from 3–5 days to under 2 hours, onboarding 8+ D2C brands in 4 months. Delivered a real-time ERP dashboard processing 10K+ transactions/month for 500+ insurance brokers.',
  },
  {
    title: 'Software Engineer',
    company: 'Zeus Learning',
    period: 'Jan 2020 – Mar 2022',
    description: 'Delivered 6+ React + Redux applications for e-learning platforms with a sub-2% post-release bug rate. Shipped 10+ UI enhancements driven by A/B testing, improving session engagement by ~12%.',
  },
];
