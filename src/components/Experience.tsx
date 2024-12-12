import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { SectionBackground } from './background/BackgroundPattern';

const experiences = [
  {
    title: 'Frontend Team Lead',
    company: 'Unifynd',
    period: '2023 - Present',
    description: 'Leading frontend development team in building loyalty programs for diverse brands. Optimized Shopify application widget with 27% performance boost. Developing CRM and application dashboards using microfrontend architecture.',
  },
  {
    title: 'Senior Fullstack Developer',
    company: 'Intygrate',
    period: '2023',
    description: 'Created scalable VueJS components and engineered e-commerce website with admin portal for efficient site management.',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Ivory Technolabs',
    period: '2022-2023',
    description: 'Partnered with UX/UI teams to revamp websites and applications. Delivered reliable client support and conducted software testing.',
  },
  {
    title: 'Software Engineer',
    company: 'Zeus Learning',
    period: '2020-2022',
    description: 'Built dynamic ReactJS websites with Redux and third-party plugins. Developed JavaScript algorithms for complex mathematical problems.',
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 bg-midnight-50 dark:bg-midnight-950">
      <SectionBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-12">
            Professional Experience
          </h2>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-primary-600 dark:bg-primary-400 transform -translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full transform -translate-x-1/2" />

                  <div className={`ml-6 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
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
                      <p className="text-midnight-600 dark:text-midnight-300">
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