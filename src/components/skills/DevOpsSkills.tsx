import React from 'react';
import { Server, Boxes, Cloud } from 'lucide-react';
import SkillCard from './SkillCard';

const devOpsSkills = [
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Backend & APIs',
    technologies: ['Node.js', 'REST APIs', 'WebSockets'],
  },
  {
    icon: <Boxes className="w-6 h-6" />,
    title: 'CI/CD & Containers',
    technologies: ['CI/CD', 'Docker', 'Kubernetes'],
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud',
    technologies: ['AWS'],
  },
];

const DevOpsSkills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {devOpsSkills.map((skill) => (
        <SkillCard key={skill.title} skill={skill} />
      ))}
    </div>
  );
};

export default DevOpsSkills;
