import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  variants?: Variants;
  staggerDelay?: number;
  once?: boolean;
  animate?: string;
  initial?: string;
}

const defaultVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  charClassName = '',
  variants = defaultVariants,
  once = true,
}) => {
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char) => {
            const currentIndex = charIndex++;
            return (
              <span key={currentIndex} className="inline-block overflow-hidden">
                <motion.span
                  className={`inline-block ${charClassName}`}
                  custom={currentIndex}
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once }}
                  aria-hidden="true"
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
