import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';

import { About, Contact, Hero, Navbar } from './components';

const Education = lazy(() => import('./components/Education'));
const Experience = lazy(() => import('./components/Experience'));
const Tech = lazy(() => import('./components/Tech'));
const Projects = lazy(() => import('./components/Projects'));
const Awards = lazy(() => import('./components/Awards'));
const ChatBot = lazy(() => import('./components/ChatBot'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const schedule =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 2000);

    const id = schedule(() => setShowChat(true));
    return () => {
      if (typeof cancelIdleCallback !== 'undefined' && typeof id === 'number') {
        cancelIdleCallback(id);
      }
    };
  }, []);

  return (
    <div className="relative z-0 bg-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-md"
      >
        Skip to content
      </a>
      <div className="div bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <main id="main">
        <About />
        <Suspense fallback={null}>
          <Education />
          <Experience />
          <Tech />
          <Projects />
          <Awards />
        </Suspense>
        <div className="div relative z-0">
          <Contact />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>
      </main>
      {showChat && (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      )}
    </div>
  );
};

export default App;
