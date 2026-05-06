import { useState, useEffect } from 'react';

export const useTypewriter = (words: string[], typeSpeed = 80, deleteSpeed = 40, pause = 1800) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pause);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 0);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((prev) => prev.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return { displayed, isTyping: phase === 'typing' };
};
