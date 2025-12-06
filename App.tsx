
import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import SellDream from './components/SellDream';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import ScrollReveal from './components/ScrollReveal';
import Preloader from './components/Preloader';
import About from './components/About';
import Technology from './components/Technology';
import { MOCK_DREAMS } from './constants';

const App: React.FC = () => {
  const catalogRef = useRef<HTMLDivElement>(null);
  const sellRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'technology'>('home');

  const scrollToCatalog = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Timeout to allow render before scrolling
      setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSell = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => sellRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      sellRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  // Scroll to top on view change
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, isLoading]);

  return (
    <div className="relative text-gray-200 min-h-screen selection:bg-cyan-500 selection:text-white bg-[#020204]">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="relative z-0 origin-center"
        initial={{ scale: 1.1, filter: 'blur(20px)', opacity: 0 }}
        animate={!isLoading ? { scale: 1, filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} 
        onAnimationComplete={() => setIsAnimationComplete(true)}
        style={{ transform: isAnimationComplete ? 'none' : undefined }}
      >
        <ParticleBackground />
        
        <Navbar onNavigate={setCurrentView} currentView={currentView} />
        
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.main 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            >
              <Hero onBrowse={scrollToCatalog} onSell={scrollToSell} />
              
              <div className="py-12 bg-[#050510] gpu-accelerated">
                 <Marquee text=" // UPLOAD MEMORY // BUY FANTASY // SLEEP DEEPER" speed={30} />
              </div>

              <ScrollReveal />

              <div ref={catalogRef}>
                <Catalog dreams={MOCK_DREAMS} />
              </div>
              
              <Showcase />
              
              <div className="py-12 bg-[#050510] gpu-accelerated">
                 <Marquee text="THE FUTURE OF SLEEP IS TRADABLE" direction="right" speed={25} />
              </div>

              <div ref={sellRef}>
                <SellDream />
              </div>
            </motion.main>
          )}

          {currentView === 'about' && (
            <About key="about" />
          )}

          {currentView === 'technology' && (
            <Technology key="technology" />
          )}
        </AnimatePresence>

        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
