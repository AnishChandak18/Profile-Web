import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, FileDown } from 'lucide-react';
import HeroCanvas from './three/HeroCanvas';
import HeroGlow from './ui/HeroGlow';
import SplitText from './ui/SplitText';
import MagneticButton from './ui/MagneticButton';
import { useTypewriter } from '@/hooks/useTypewriter';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/AnishChandak18', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anish-chandak-871655166', Icon: Linkedin },
  { label: 'Email', href: 'mailto:chandakanish0018@gmail.com', Icon: Mail },
];

const roles = [
  'Technical Program Manager',
  'Fullstack Engineer',
  'Engineering Leader',
  'System Architect',
  'DevOps Practitioner',
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { displayed, isTyping } = useTypewriter(roles);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -180]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Three.js background */}
      <HeroCanvas />

      {/* Cursor-reactive glow — z-[2], behind content (z-10) */}
      <HeroGlow sectionRef={sectionRef} />

      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40 -z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-electric-950/30 via-transparent to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent -z-10" />

      {/* Ambient glow orbs (CSS) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-600/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-cyan/6 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-neon-green/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
          </span>
          <span className="text-xs font-medium text-white/60 font-mono tracking-wider">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name */}
        <div className="mb-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            <SplitText text="Anish Chandak" />
          </h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-8"
        >
          <span className="text-xl sm:text-2xl font-light text-white/50">
            <span className="gradient-text font-semibold">{displayed}</span>
            <span
              className="inline-block w-0.5 h-6 ml-0.5 bg-electric-400 align-middle"
              style={{ animation: isTyping ? 'none' : 'blink 1s step-end infinite' }}
            />
          </span>
        </motion.div>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          6+ years shipping full-stack products — React micro-frontends,
          Node.js APIs, Postgres schemas, Docker pipelines, and Kubernetes clusters.
          I lead engineering teams and manage programs end-to-end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <MagneticButton
            as="a"
            href="#portfolio"
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm shadow-electric hover:shadow-electric-lg transition-all duration-300"
          >
            View Projects
          </MagneticButton>

          <MagneticButton
            as="a"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass electric-border text-white/80 hover:text-white font-semibold text-sm transition-all duration-300 hover:shadow-electric"
          >
            <FileDown className="w-4 h-4" />
            Download CV
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center justify-center gap-5"
        >
          {socialLinks.map(({ label, href, Icon }) => (
            <MagneticButton
              key={label}
              as="a"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
