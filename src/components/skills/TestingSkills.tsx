import React from 'react';
import { FlaskConical, CheckCircle2, GitPullRequest } from 'lucide-react';
import SkillCard from './SkillCard';

const testingSkills = [
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: 'Unit Testing',
    technologies: ['Jest', 'Unit Testing'],
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Quality',
    technologies: ['Load Testing', 'BDD'],
  },
  {
    icon: <GitPullRequest className="w-6 h-6" />,
    title: 'Process',
    technologies: ['Code Review'],
  },
];

const TestingSkills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testingSkills.map((skill) => (
        <SkillCard key={skill.title} skill={skill} />
      ))}
    </div>
  );
};

export default TestingSkills;
