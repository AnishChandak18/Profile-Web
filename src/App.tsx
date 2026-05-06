import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';

const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Experience = lazy(() => import('@/components/Experience'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

const SectionFallback: React.FC = () => (
  <div className="py-32 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-electric-500 border-t-transparent animate-spin" />
  </div>
);

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="py-20 text-center text-white/30 text-sm font-mono">
          Section failed to load.
        </div>
      );
    }
    return this.props.children;
  }
}

const LenisInit: React.FC = () => {
  useLenis();
  return null;
};

function App() {
  const [preloaderDone, setPreloaderDone] = useState(() => {
    return sessionStorage.getItem('preloader-done') === '1';
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-done', '1');
    setPreloaderDone(true);
  };

  return (
    <ThemeProvider>
      <LenisInit />
      <CustomCursor />

      {/* Skip nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-electric-600 focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className="min-h-screen bg-void text-white"
        style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        <ScrollProgress />
        <Navbar />

        <main id="main-content">
          <Hero />

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
