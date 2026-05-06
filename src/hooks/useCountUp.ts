import { useState, useEffect, useRef } from 'react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export const useCountUp = (target: number, duration = 2000, startOnMount = false) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(startOnMount);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const start = () => setIsActive(true);

  useEffect(() => {
    if (!isActive) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, target, duration]);

  return { count, start };
};
