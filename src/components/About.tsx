import React from 'react';
import { motion } from 'framer-motion';
import FrontendSkills from './skills/FrontendSkills';
import Web3Skills from './skills/Web3Skills';
import { SectionBackground } from './background/BackgroundPattern';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-midnight-50 dark:bg-midnight-950">
      <SectionBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-8">
            About Me
          </h2>
          <p className="text-lg text-midnight-600 dark:text-midnight-300 max-w-3xl mx-auto mb-16 text-center">
            I'm a passionate developer specializing in both frontend and Web3 development. 
            With expertise in modern web technologies and blockchain development, 
            I create responsive, user-friendly applications and decentralized solutions.
          </p>

          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-semibold text-center text-midnight-900 dark:text-white mb-8">
                Frontend Skills
              </h3>
              <FrontendSkills />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-center text-midnight-900 dark:text-white mb-8">
                Web3 Skills
              </h3>
              <Web3Skills />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;