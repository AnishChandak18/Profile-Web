import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { fadeInUp, cardHover } from '../animations/variants';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    category: 'frontend' | 'web3';
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover="hover"
      variants={cardHover}
      className="bg-white dark:bg-midnight-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            project.category === 'web3' 
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
              : 'bg-midnight-100 dark:bg-midnight-900 text-midnight-600 dark:text-midnight-300'
          }`}>
            {project.category === 'web3' ? 'Web3' : 'Frontend'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-midnight-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-midnight-600 dark:text-midnight-200 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-midnight-600 dark:text-midnight-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Github className="w-5 h-5 mr-1" />
            Code
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-midnight-600 dark:text-midnight-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-1" />
            Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;