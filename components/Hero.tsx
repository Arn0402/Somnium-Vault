
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onBrowse: () => void;
  onSell: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowse, onSell }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // ANIMATION MAPS
  
  // 1. Content Fades out quickly (Buttons, Description)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  // 2. Text Explodes Outward (Zoom in massively)
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 50]); 
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]); // Disappears as it passes camera
  const textBlur = useTransform(scrollYProgress, [0.2, 0.4], ["0px", "20px"]);

  // 3. Vortex Sucks User In
  // Scales up to fill screen, rotates faster, then fades out to reveal next section
  const vortexScale = useTransform(scrollYProgress, [0, 0.8], [1, 6]);
  const vortexOpacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]); 
  const vortexRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // 4. Scroll Indicator
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    // Tall container creates "Time" for the scroll animation
    <section ref={containerRef} className="relative h-[300vh] z-10">
      
      {/* Sticky Viewport: This stays fixed while we scroll through the 300vh height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* BACKGROUND VORTEX */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
           <motion.div 
             style={{ scale: vortexScale, opacity: vortexOpacity, rotate: vortexRotate }}
             className="relative w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] flex items-center justify-center opacity-60 will-change-transform"
           >
              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-teal-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-4 md:inset-10 rounded-full border border-dashed border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              {/* Soft Glow Orbs */}
              <motion.div 
                 className="absolute w-full h-full bg-gradient-to-tr from-teal-900/20 via-transparent to-purple-900/20 rounded-full blur-[80px]"
                 animate={{ scale: [0.8, 1.1, 0.8] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner Spiral */}
              <svg viewBox="0 0 200 200" className="absolute w-2/3 h-2/3 opacity-30 animate-[spin_20s_linear_infinite]">
                 <path d="M100 100 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0" fill="none" stroke="url(#gradientHero)" strokeWidth="0.5" />
                 <path d="M100 100 m -70 0 a 70 70 0 1 1 140 0 a 70 70 0 1 1 -140 0" fill="none" stroke="url(#gradientHero)" strokeWidth="0.5" strokeDasharray="10 5" />
                 <defs>
                   <linearGradient id="gradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#a855f7" />
                   </linearGradient>
                 </defs>
              </svg>
              
              {/* Center Singularity */}
              <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)] animate-pulse" />
           </motion.div>
        </div>

        {/* MAIN TEXT (THE GATE) */}
        <motion.div 
          style={{ scale: textScale, opacity: textOpacity, filter: textBlur }}
          className="relative z-20 text-center space-y-2 mb-16 mix-blend-color-dodge origin-center will-change-transform"
        >
          <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-sc font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-widest drop-shadow-2xl">
             SOMNIUM
          </h1>
          <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-sc font-bold text-white/10 tracking-widest backdrop-blur-sm">
             VAULT
          </h1>
        </motion.div>

        {/* CONTENT LAYER (Buttons & Desc) - Fades out first */}
        <motion.div 
          className="absolute bottom-24 md:bottom-32 flex flex-col items-center text-center max-w-lg mx-auto space-y-12 z-30"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <p className="text-lg md:text-xl text-teal-100/70 font-light leading-relaxed font-sans tracking-wide max-w-sm">
            Enter the marketplace of the unconscious. <br/>
            <span className="text-white">Trade memories. Buy dreams.</span>
          </p>

          <div className="flex gap-8 pointer-events-auto">
            <button 
              onClick={onBrowse}
              className="group interactive relative px-10 py-4 overflow-hidden bg-white text-black font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 group-hover:text-white transition-colors">Enter Catalog</span>
            </button>
            <button 
              onClick={onSell}
              className="group interactive px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-white/5 hover:border-white/50 transition-all"
            >
              Upload Memory
            </button>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ArrowDown size={24} className="animate-bounce font-thin" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
