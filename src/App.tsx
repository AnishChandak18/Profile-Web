import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import ContactSection from './components/contact/ContactSection';
import ScrollProgress from './components/ScrollProgress';
import { useTheme } from './hooks/useTheme';
import AnimatedBackground from './components/background/AnimatedBackground';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <AnimatedBackground isDarkMode={isDarkMode} />
      <div className="bg-white dark:bg-midnight-900">
        <ScrollProgress />
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Portfolio />
        <Experience />
        <ContactSection />
      </div>
    </div>
  );
}

export default App;