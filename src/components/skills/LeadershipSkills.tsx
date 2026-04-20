import React from 'react';
import { Users, Target, Compass } from 'lucide-react';
import SkillCard from './SkillCard';

const leadershipSkills = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Management',
    technologies: ['Team Management', 'Stakeholder Communication'],
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Delivery',
    technologies: ['Sprint Planning', 'Agile'],
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Strategy',
    technologies: ['Product Roadmaps'],
  },
];

const LeadershipSkills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {leadershipSkills.map((skill) => (
        <SkillCard key={skill.title} skill={skill} />
      ))}
    </div>
  );
};

export default LeadershipSkills;
