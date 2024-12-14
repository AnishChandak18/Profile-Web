import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './projects/ProjectCard';
import { projects } from '../data/projects';
import { staggerChildren } from './animations/variants';
import { BackgroundPattern } from './background/BackgroundPattern';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'web3'>('all');

  const filteredProjects = projects.filter(
    project => filter === 'all' || project.category === filter
  );

  return (
    <section id="portfolio" className="relative py-20 bg-white dark:bg-midnight-900">
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <h2 className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-8">
            Featured Projects
          </h2>

          <div className="flex justify-center space-x-4 mb-12">
            {['all', 'frontend', 'web3'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category as typeof filter)}
                className={`px-4 py-2 rounded-lg shadow-md transition-all ${filter === category
                  ? 'bg-primary-600 text-white shadow-primary-500/25'
                  : 'bg-white dark:bg-midnight-800 text-midnight-600 dark:text-midnight-200 hover:bg-primary-50 dark:hover:bg-midnight-700'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Projects
              </motion.button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            variants={staggerChildren}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;