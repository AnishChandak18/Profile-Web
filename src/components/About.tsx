import React, { useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

const techStack = [
  // Frontend
  "React", "Next.js", "TypeScript", "Three.js", "Framer Motion",
  "Vue.js", "Redux", "Zustand", "Tailwind CSS", "Vite", "Webpack",
  // Backend
  "Node.js", "Express", "GraphQL", "REST APIs", "WebSockets",
  "Prisma", "PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase",
  // DevOps & Cloud
  "Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD", "Nginx", "Terraform",
  // Web3
  "Ethers.js", "Wagmi", "viem", "Alchemy",
  // Testing & Tooling
  "Jest", "Playwright", "React Testing Library",
  // Architecture
  "Microfrontend", "SSR / SSG", "Monorepo", "Design Systems",
];

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = "",
  label,
  color,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { count, start } = useCountUp(value, 1800);

  React.useEffect(() => {
    if (isInView) start();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-1 hover:border-white/15 transition-all duration-300 group"
    >
      <span
        className={cn("text-3xl sm:text-4xl font-bold tabular-nums", color)}
      >
        {count}
        {suffix}
      </span>
      <span className="text-sm text-white/40 font-medium group-hover:text-white/60 transition-colors">
        {label}
      </span>
    </motion.div>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "glass-card rounded-2xl transition-shadow duration-300 hover:shadow-glass-hover",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-void overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest uppercase">
            01 / About
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-16 leading-tight"
        >
          From schema to deployment —{" "}
          <span className="gradient-text">I ship the whole stack</span>
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Bio — spans 2 cols */}
          <TiltCard className="md:col-span-2 p-8">
            <p className="text-white/50 text-sm font-mono tracking-wider uppercase mb-4">
              Background
            </p>
            <p className="text-white/75 text-base leading-relaxed">
              Fullstack technical program manager with 6+ years of end-to-end
              product delivery — spanning React micro-frontends, Node.js &
              GraphQL APIs, PostgreSQL schemas, Docker containers, and
              Kubernetes deployments. I operate across the entire stack and
              bridge the gap between engineering execution and business outcomes.
            </p>
            <p className="text-white/50 text-base leading-relaxed mt-4">
              At Knorex I manage 10 engineers across 3 product tracks while
              personally architecting CI/CD infrastructure that cut deployment
              time by 78%. At Unifynd I led full-stack delivery of loyalty
              platforms serving 25K+ monthly users at 99.5% uptime. At Ivory
              Technolabs I built a no-code AI storefront that onboarded 8+ D2C
              brands in 4 months — handling everything from Prisma schema to SSR
              caching strategy.
            </p>
          </TiltCard>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-6 border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
              </span>
              <span className="text-xs font-mono text-neon-green/80 tracking-wider uppercase">
                Available
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Open to fullstack engineering, technical program management, and
              engineering leadership roles. Comfortable as IC, tech lead, or TPM.
            </p>
            <p className="text-white/30 text-xs mt-4 font-mono">Silvassa, India · Remote OK</p>
          </motion.div>

          {/* Location / fun card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial from-electric-600/10 to-transparent pointer-events-none" />
            <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-3">
              Currently at
            </p>
            <p className="text-white text-lg font-bold">Knorex</p>
            <p className="text-white/40 text-sm">Technical Manager</p>
            <p className="text-electric-400 text-xs font-mono mt-4">
              Jan 2025 → Present
            </p>
          </motion.div>

          {/* Stats row */}
          <StatCard
            value={6}
            suffix="+"
            label="Years Experience"
            color="gradient-text"
            delay={0.1}
          />
          <StatCard
            value={25}
            suffix="K+"
            label="Users Served"
            color="text-neon-cyan"
            delay={0.15}
          />
          <StatCard
            value={10}
            label="Engineers Led"
            color="text-neon-violet"
            delay={0.2}
          />
          <StatCard
            value={4}
            label="Companies"
            color="gradient-text-warm"
            delay={0.25}
          />

          {/* Tech stack — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8 md:col-span-3 lg:col-span-4"
          >
            <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 rounded-lg glass electric-border text-xs font-mono text-white/60 hover:text-white transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
