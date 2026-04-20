import React from 'react';
import { Code2, Layout, Gauge } from 'lucide-react';
import SkillCard from './SkillCard';

const frontendSkills = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Core',
    technologies: ['React', 'Next.js', 'TypeScript', 'Redux'],
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Architecture',
    technologies: ['Microfrontends', 'SSR/ISR'],
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: 'Performance',
    technologies: ['Performance Optimisation'],
  },
];

const FrontendSkills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {frontendSkills.map((skill) => (
        <SkillCard key={skill.title} skill={skill} />
      ))}
    </div>
  );
};

export default FrontendSkills;
