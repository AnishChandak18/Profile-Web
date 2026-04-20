import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { fadeInUp } from '../animations/variants';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
      className="bg-white dark:bg-midnight-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              project.category === 'web3'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                : 'bg-midnight-100 dark:bg-midnight-900 text-midnight-600 dark:text-midnight-300'
            }`}
          >
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
        {(project.github || project.demo) && (
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-midnight-100 dark:bg-midnight-800 text-midnight-700 dark:text-midnight-200 hover:bg-primary-50 dark:hover:bg-midnight-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
