import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from 'framer-motion';

const AnimatedBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [init, setInit] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => {
    const isMobile =
      typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;

    return {
      background: {
        color: {
          value: isDarkMode ? '#25314d' : '#ffffff',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isDarkMode ? '#ffffff' : '#25314d',
        },
        links: {
          color: isDarkMode ? '#ffffff' : '#25314d',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: particleCount,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    };
  }, [isDarkMode]);

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-white dark:bg-midnight-900"
      />
    );
  }

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default AnimatedBackground;
