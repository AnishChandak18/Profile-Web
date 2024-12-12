import React from 'react';
import { Code2, Layout, Palette } from 'lucide-react';
import SkillCard from './SkillCard';

const frontendSkills = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Frontend Development',
    technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js'],
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'UI Frameworks',
    technologies: ['Tailwind CSS', 'Material-UI', 'Styled Components', 'Sass'],
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Design & UX',
    technologies: ['Figma', 'Responsive Design', 'Accessibility', 'UI Animation'],
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