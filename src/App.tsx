import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import { useTheme } from './hooks/useTheme';
import AnimatedBackground from './components/background/AnimatedBackground';

const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Experience = lazy(() => import('./components/Experience'));
const ContactSection = lazy(() =>
  import('./components/contact/ContactSection')
);

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
  </div>
);

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <AnimatedBackground isDarkMode={isDarkMode} />
      <div className="bg-white dark:bg-midnight-900">
        <ScrollProgress />
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Portfolio />
          <Experience />
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
