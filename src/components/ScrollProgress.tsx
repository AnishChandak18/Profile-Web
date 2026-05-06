import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, #6366F1, #818CF8, #22D3EE)',
        transformOrigin: '0%',
      }}
    />
  );
};

export default ScrollProgress;