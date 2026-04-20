import React from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from './animations/variants';

const socialLinks = [
  {
    label: 'GitHub profile',
    href: 'https://github.com/AnishChandak18',
    Icon: Github,
  },
  {
    label: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/anish-chandak-871655166',
    Icon: Linkedin,
  },
  {
    label: 'Send email',
    href: 'mailto:chandakanish0018@gmail.com',
    Icon: Mail,
  },
];

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl font-bold text-midnight-900 dark:text-white mb-6"
          >
            Senior Frontend Engineer
            <span className="text-primary-600 dark:text-primary-400"> · Tech Lead · Technical Manager</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-midnight-600 dark:text-midnight-200 mb-8 max-w-2xl mx-auto"
          >
            Frontend engineer and tech lead with 6+ years building production-grade React and Next.js systems at scale.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-4 mb-12"
          >
            {socialLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="p-3 rounded-full bg-white dark:bg-midnight-800 shadow-lg hover:shadow-xl hover:bg-primary-50 dark:hover:bg-midnight-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all"
              >
                <Icon className="w-6 h-6 text-midnight-600 dark:text-midnight-200" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#portfolio"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-midnight-800 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-midnight-700 rounded-lg font-medium shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all"
            >
              <FileDown className="w-5 h-5" />
              Download Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3 bg-white dark:bg-midnight-800 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-midnight-700 rounded-lg font-medium shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
