import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '@/data/experience';

const companyColors: Record<string, string> = {
  Knorex: '#818CF8',
  Unifynd: '#22D3EE',
  'Ivory Technolabs': '#8B5CF6',
  'Zeus Learning': '#10B981',
};

const ExperienceCard: React.FC<{ exp: typeof experiences[0]; index: number }> = ({ exp, index }) => {
  const isEven = index % 2 === 0;
  const color = companyColors[exp.company] ?? '#818CF8';

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start`}
    >
      {/* Card */}
      <div className="flex-1">
        <div className="glass-card rounded-2xl p-6 sm:p-8 hover:border-white/15 transition-all duration-300 group">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{exp.title}</h3>
              <div className="flex items-center gap-4 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span style={{ color }}>{exp.company}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{ color, borderColor: `${color}40`, background: `${color}12` }}
            >
              {exp.period.includes('Present') ? 'Current' : 'Past'}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 group-hover:text-white/65 leading-relaxed transition-colors">
            {exp.description}
          </p>
        </div>
      </div>

      {/* Timeline dot (hidden on mobile) */}
      <div className="hidden md:flex flex-col items-center pt-6 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-4 h-4 rounded-full border-2 flex-shrink-0"
          style={{ borderColor: color, background: `${color}33`, boxShadow: `0 0 12px ${color}60` }}
        />
        <div className="w-px flex-1 bg-white/[0.06] mt-2" />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.3'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-28 bg-void overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest uppercase">03 / Experience</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-16 leading-tight"
        >
          Where I've made{' '}
          <span className="gradient-text">an impact</span>
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Scroll-driven vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04] -translate-x-1/2">
            <motion.div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                scaleY: lineScaleY,
                height: '100%',
                background: 'linear-gradient(to bottom, #6366F1, #22D3EE)',
              }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
