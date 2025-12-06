
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const phrases = [
  "INITIALIZING REM CYCLE...",
  "CONNECTING TO CORTEX...",
  "DECRYPTING MEMORIES...",
  "STABILIZING LUCID STATE...",
  "ENTERING THE VAULT"
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Cycle through phrases - Slowed down to 1500ms
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === phrases.length - 1) {
          clearInterval(interval);
          // Start exit sequence
          setTimeout(() => setIsExiting(true), 800);
          setTimeout(() => onComplete(), 2000); // Wait for animation to finish
          return prev;
        }
        return prev + 1;
      });
    }, 1500); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none">
      
      {/* Top Eyelid */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1/2 bg-[#020204] z-20 border-b border-white/5"
        initial={{ y: 0 }}
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom Eyelid */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020204] z-20 border-t border-white/5"
        initial={{ y: 0 }}
        animate={isExiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center Content (The Dream Signal) */}
      <motion.div 
        className="relative z-30 flex flex-col items-center justify-center"
        animate={isExiting ? { opacity: 0, scale: 1.5, filter: 'blur(20px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.0 }}
      >
        {/* Pulsating Orb */}
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 rounded-full bg-teal-500/20 blur-xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full bg-purple-500/20 blur-md"
              animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
        </div>

        {/* Cycling Text */}
        <div className="h-8 relative overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-sm md:text-base font-mono tracking-[0.3em] text-teal-100/80 uppercase"
            >
              {phrases[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Line */}
        <motion.div 
           className="mt-8 w-48 h-px bg-white/10 overflow-hidden relative"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
           <motion.div 
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent w-1/2"
             animate={{ left: ['-100%', '200%'] }}
             transition={{ duration: 2.0, repeat: Infinity, ease: "linear" }}
           />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Preloader;
