import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';
import { Project } from '@/types/project';

/* ── Carousel (shown on hover) ── */
const HoverCarousel: React.FC<{ screenshots: string[]; visible: boolean }> = ({
  screenshots,
  visible,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance while visible
  useEffect(() => {
    if (!visible) {
      setIndex(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % screenshots.length);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible, screenshots.length]);

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(dir);
    setIndex((i) => (i + dir + screenshots.length) % screenshots.length);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: visible ? 200 : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className="overflow-hidden relative w-full flex-shrink-0 rounded-t-2xl"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={screenshots[index]}
          alt={`Screenshot ${index + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlay at bottom so content below doesn't clash */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-midnight-950 to-transparent pointer-events-none" />

      {/* Prev / Next */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => go(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={cn(
              'rounded-full transition-all duration-300',
              i === index ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'
            )}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ── Project Card ── */
const ProjectCard: React.FC<{ project: Project; onClick: () => void; index: number }> = ({
  project,
  onClick,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group transition-shadow duration-300 hover:shadow-glass-hover hover:border-white/15"
      data-cursor-hover
    >
      {/* Carousel — visible on hover */}
      <HoverCarousel screenshots={project.screenshots} visible={isHovered} />

      {/* Card content */}
      <div className="p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:gradient-text transition-all leading-snug">
            {project.title}
          </h3>
          <span
            className={cn(
              'flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border',
              project.category === 'web3'
                ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/25'
                : 'bg-electric-500/10 text-electric-400 border-electric-500/25'
            )}
          >
            {project.category === 'web3' ? 'Web3' : 'Frontend'}
          </span>
        </div>

        <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono bg-white/[0.04] text-white/35 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-white/[0.04] text-white/25 border border-white/[0.06]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-electric-400 font-mono group-hover:text-electric-300 transition-colors">
            Click to expand →
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-white/40 hover:text-white transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-white/40 hover:text-white transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Modal ── */
const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setIndex(0);
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      if (e.key === 'ArrowRight') { setDirection(1); setIndex((i) => (i + 1) % project.screenshots.length); }
      if (e.key === 'ArrowLeft') { setDirection(-1); setIndex((i) => (i - 1 + project.screenshots.length) % project.screenshots.length); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + project.screenshots.length) % project.screenshots.length);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-void/85 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="relative glass-card rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image carousel */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-midnight-950">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={project.screenshots[index]}
              alt={`${project.title} screenshot ${index + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              draggable={false}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent pointer-events-none rounded-t-3xl" />

          {/* Nav arrows */}
          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === index ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="absolute top-4 left-4 text-xs font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded-full">
            {index + 1} / {project.screenshots.length}
          </span>
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <span
              className={cn(
                'flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border',
                project.category === 'web3'
                  ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/25'
                  : 'bg-electric-500/10 text-electric-400 border-electric-500/25'
              )}
            >
              {project.category === 'web3' ? 'Web3' : 'Frontend'}
            </span>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono glass electric-border text-white/60">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-sm font-semibold transition-all shadow-electric hover:shadow-electric-lg"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-white/60 hover:text-white text-sm font-semibold transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Section ── */
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative py-28 bg-void overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest uppercase">04 / Projects</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-14 leading-tight"
        >
          Things I've{' '}
          <span className="gradient-text">built</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
