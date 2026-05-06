import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⚡',
    skills: [
      { name: 'React / Next.js',                    level: 95, color: '#818CF8' },
      { name: 'TypeScript',                          level: 93, color: '#818CF8' },
      { name: 'CSS / Tailwind / Design Systems',     level: 91, color: '#22D3EE' },
      { name: 'Three.js / WebGL / Framer Motion',    level: 82, color: '#22D3EE' },
      { name: 'State Management (Redux / Zustand)',   level: 88, color: '#8B5CF6' },
      { name: 'Testing (Jest / RTL / Playwright)',    level: 84, color: '#8B5CF6' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '🛠',
    skills: [
      { name: 'Node.js / Express',                   level: 85, color: '#10B981' },
      { name: 'GraphQL / REST APIs / WebSockets',    level: 83, color: '#10B981' },
      { name: 'PostgreSQL / Prisma',                 level: 82, color: '#22D3EE' },
      { name: 'MongoDB / Redis',                     level: 76, color: '#22D3EE' },
      { name: 'Supabase / Firebase',                 level: 80, color: '#818CF8' },
      { name: 'Ethers.js / Wagmi / Alchemy (Web3)',  level: 78, color: '#818CF8' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: '☁️',
    skills: [
      { name: 'Docker / Kubernetes',                 level: 83, color: '#22D3EE' },
      { name: 'AWS (EC2, S3, ECS, Lambda)',          level: 80, color: '#EC4899' },
      { name: 'CI/CD (GitHub Actions / Jenkins)',    level: 87, color: '#EC4899' },
      { name: 'Nginx / Load Balancing',              level: 76, color: '#818CF8' },
      { name: 'Terraform / IaC',                     level: 68, color: '#818CF8' },
      { name: 'Monitoring (Grafana / Datadog)',       level: 72, color: '#8B5CF6' },
    ],
  },
  {
    id: 'program-mgmt',
    label: 'Program Mgmt',
    icon: '🎯',
    skills: [
      { name: 'Engineering Team Leadership (10+)',   level: 92, color: '#10B981' },
      { name: 'Agile / Scrum / Kanban',              level: 94, color: '#10B981' },
      { name: 'Technical Roadmapping & OKRs',        level: 90, color: '#22D3EE' },
      { name: 'Stakeholder Management',              level: 88, color: '#22D3EE' },
      { name: 'Risk & Dependency Management',        level: 85, color: '#818CF8' },
      { name: 'Hiring, Mentorship & Onboarding',     level: 87, color: '#818CF8' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: '🏗',
    skills: [
      { name: 'Microfrontend Architecture',          level: 86, color: '#8B5CF6' },
      { name: 'SSR / SSG / ISR (Next.js)',           level: 91, color: '#8B5CF6' },
      { name: 'Bundle Optimization & Code Splitting', level: 89, color: '#818CF8' },
      { name: 'Monorepo (Nx / Turborepo)',            level: 76, color: '#818CF8' },
      { name: 'API Design & System Design',           level: 84, color: '#22D3EE' },
      { name: 'Web Accessibility (WCAG)',             level: 86, color: '#22D3EE' },
    ],
  },
];

const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors font-medium">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: skill.level / 100 }}
          transition={{ delay: delay + 0.15, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [active, setActive] = useState('frontend');
  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="relative py-28 bg-void overflow-hidden">
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
          <span className="font-mono text-xs text-electric-400 tracking-widest uppercase">02 / Skills</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-12 leading-tight"
        >
          Full-stack depth,{' '}
          <span className="gradient-text">end-to-end</span>
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                active === cat.id
                  ? 'bg-electric-600 text-white shadow-electric'
                  : 'glass glass-hover text-white/40 hover:text-white/70'
              )}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <div className="glass-card rounded-2xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {activeCategory.skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.07} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
