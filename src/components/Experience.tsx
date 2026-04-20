import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { SectionBackground } from './background/BackgroundPattern';
import { experiences } from '../data/experience';
import { fadeInUp, staggerChildren } from './animations/variants';

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-20 bg-midnight-50 dark:bg-midnight-950"
    >
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-12"
          >
            Professional Experience
          </motion.h2>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-primary-600 dark:bg-primary-400 transform -translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  variants={fadeInUp}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full transform -translate-x-1/2" />

                  <div
                    className={`ml-6 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-white dark:bg-midnight-900 p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold text-midnight-900 dark:text-white mb-2">
                        {experience.title}
                      </h3>
                      <div className="flex items-center text-midnight-600 dark:text-midnight-300 mb-4">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span className="mr-4">{experience.company}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{experience.period}</span>
                      </div>
                      <p className="text-midnight-600 dark:text-midnight-300 whitespace-pre-line">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
