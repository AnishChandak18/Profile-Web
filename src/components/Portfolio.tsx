import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './projects/ProjectCard';
import { projects } from '../data/projects';
import { fadeInUp, staggerChildren } from './animations/variants';
import { BackgroundPattern } from './background/BackgroundPattern';

type Filter = 'all' | 'frontend';

const filters: Filter[] = ['all', 'frontend'];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <section
      id="portfolio"
      className="relative py-20 bg-white dark:bg-midnight-900"
    >
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-8"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-4 mb-12"
          >
            {filters.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={`px-4 py-2 rounded-lg shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all ${
                  filter === category
                    ? 'bg-primary-600 text-white shadow-primary-500/25'
                    : 'bg-white dark:bg-midnight-800 text-midnight-600 dark:text-midnight-200 hover:bg-primary-50 dark:hover:bg-midnight-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Projects
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
