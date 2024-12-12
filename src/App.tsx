import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import ContactSection from './components/contact/ContactSection';
import ScrollProgress from './components/ScrollProgress';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-midnight-900 transition-colors">
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