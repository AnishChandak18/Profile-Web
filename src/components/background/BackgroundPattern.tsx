import React from 'react';

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32V0h32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-midnight-500/20 dark:bg-midnight-500/10 rounded-full blur-3xl" />
      
      {/* Animated Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--primary-500)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'var(--midnight-500)', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C300,100 400,200 500,100 C600,0 700,100 800,200 C900,300 1000,200 1100,100 L1100,400 L0,400 Z"
          fill="url(#gradient)"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,0 C300,100 400,200 500,100 C600,0 700,100 800,200 C900,300 1000,200 1100,100 L1100,400 L0,400 Z;
              M0,0 C200,150 400,50 500,150 C600,250 700,150 800,100 C900,50 1000,150 1100,100 L1100,400 L0,400 Z;
              M0,0 C300,100 400,200 500,100 C600,0 700,100 800,200 C900,300 1000,200 1100,100 L1100,400 L0,400 Z"
          />
        </path>
      </svg>
    </div>
  );
};

export const SectionBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.01]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonalLines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>
      
      {/* Gradient Corner */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
    </div>
  );
};