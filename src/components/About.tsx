import React from 'react';
import { motion } from 'framer-motion';
import FrontendSkills from './skills/FrontendSkills';
import LeadershipSkills from './skills/LeadershipSkills';
import DevOpsSkills from './skills/DevOpsSkills';
import TestingSkills from './skills/TestingSkills';
import { SectionBackground } from './background/BackgroundPattern';
import { fadeInUp } from './animations/variants';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-midnight-50 dark:bg-midnight-950"
    >
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <h2 className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-8">
            About Me
          </h2>
          <p className="text-lg text-midnight-600 dark:text-midnight-300 max-w-3xl mx-auto mb-16 text-center">
            Frontend engineer and tech lead with 6+ years building production-grade React and Next.js systems at scale. At Unifynd, led frontend delivery for 25K+ monthly users, cutting Shopify widget load time by 35% and compressing issue resolution from days to hours. At Knorex, managing 10 engineers across 3 parallel product tracks — shipping CI/CD pipelines that cut release failures 20%+ and a unified admin dashboard that reduced client onboarding time by 60%. Equally effective writing production code and unblocking teams.
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
                Leadership
              </h3>
              <LeadershipSkills />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-center text-midnight-900 dark:text-white mb-8">
                DevOps & Infrastructure
              </h3>
              <DevOpsSkills />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-center text-midnight-900 dark:text-white mb-8">
                Testing & Quality
              </h3>
              <TestingSkills />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
