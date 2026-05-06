import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/AnishChandak18', Icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/anish-chandak-871655166', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:chandakanish0018@gmail.com', Icon: Mail, label: 'Email' },
];

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setProgress(pct);
      setVisible(scrolled > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center"
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowUp className="w-3.5 h-3.5 text-white/60" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <footer className="relative py-12 border-t border-white/[0.06] bg-void">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo + tagline */}
            <div className="text-center sm:text-left">
              <span className="text-lg font-bold gradient-text">AC</span>
              <span className="text-white/20">.</span>
              <p className="text-xs text-white/25 mt-1 font-mono">
                Built with React · Three.js · Framer Motion
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass glass-hover flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-white/20 font-mono">
              © {new Date().getFullYear()} Anish Chandak
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
};

export default Footer;
