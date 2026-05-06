import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const increment = () => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        setCount(100);
        setTimeout(() => setDone(true), 400);
        return;
      }
      setCount(current);
      setTimeout(increment, 20 + Math.random() * 30);
    };
    const t = setTimeout(increment, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Initials */}
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="text-6xl sm:text-8xl font-bold tracking-tight gradient-text select-none">
              AC
            </span>
            <div className="absolute -inset-4 rounded-full bg-electric-500/10 blur-2xl -z-10" />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-px bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-500 to-neon-cyan rounded-full"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="mt-4 font-mono text-xs text-white/30 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {String(count).padStart(3, '0')}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
