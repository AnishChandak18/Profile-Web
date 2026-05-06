import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/utils/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.3,
  as: Tag = 'button',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x, y }}>
        <Tag
          className={cn(
            'relative inline-flex items-center justify-center',
            'transition-all duration-300',
            isHovered && 'scale-[1.02]',
            className
          )}
          {...props}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
};

export default MagneticButton;
