import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, cardHover } from '../animations/variants';

interface SkillCardProps {
  skill: {
    icon: React.ReactNode;
    title: string;
    technologies: string[];
  };
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover="hover"
      variants={cardHover}
      className="bg-white dark:bg-midnight-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-primary-600 dark:text-primary-400 mb-4">{skill.icon}</div>
      <h3 className="text-xl font-semibold text-midnight-900 dark:text-white mb-4">
        {skill.title}
      </h3>
      <ul className="space-y-2">
        {skill.technologies.map((tech) => (
          <motion.li
            key={tech}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-midnight-600 dark:text-midnight-200 flex items-center"
          >
            <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-2" />
            {tech}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;