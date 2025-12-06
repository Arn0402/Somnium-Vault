
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DreamDeviceProps {
  interactive?: boolean;
}

const DreamDevice: React.FC<DreamDeviceProps> = ({ interactive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Rotation State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation physics
  const rotateX = useSpring(useTransform(y, [-100, 100], [45, -45]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-45, 45]), { stiffness: 100, damping: 20 });

  // Reset on hover end
  const handleHoverEnd = () => {
    x.set(0);
    y.set(0);
  };

  // Softened Inverted Triangle / Pebble Shape
  // Modified bottom curve to be rounder (Q 100 195, 170 60)
  const jellyShapePath = "M30 60 C 30 20, 170 20, 170 60 C 170 120, 140 160, 100 180 C 60 160, 30 120, 30 60 Z";

  return (
    <motion.div 
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center perspective-[1000px] ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-64 h-64 md:w-80 md:h-80"
        drag={interactive}
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDrag={(event, info) => {
           x.set(info.offset.x);
           y.set(info.offset.y);
        }}
        // Idle animation if not interactive
        animate={!interactive ? { rotateY: [0, 15, 0, -15, 0], rotateX: [0, 5, 0, 5, 0] } : {}}
        transition={!interactive ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {/* === LAYER 1: BACK SHELL (Dark Core) === */}
        <div className="absolute inset-0" style={{ transform: "translateZ(-30px)" }}>
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_50px_rgba(45,212,191,0.15)]">
              <path d={jellyShapePath} fill="rgba(5, 2, 20, 0.9)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
           </svg>
        </div>

        {/* === LAYER 1.5: THICKNESS SIMULATION (Deep Volume) === */}
        {[...Array(6)].map((_, i) => (
           <div key={`fill-${i}`} className="absolute inset-0 pointer-events-none" style={{ transform: `translateZ(${(i * 5) - 25}px)` }}>
               <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                  <path d={jellyShapePath} fill="rgba(88, 28, 135, 0.05)" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5"/>
               </svg>
           </div>
        ))}

        {/* === LAYER 2: INTERNAL CIRCUITS (Deep Hologram) === */}
        <div className="absolute inset-0" style={{ transform: "translateZ(-10px)" }}>
           <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 mix-blend-screen">
              <path 
                d="M50 60 L70 60 L75 70 M150 60 L130 60 L125 75 M100 160 L100 120 M80 80 L120 80" 
                stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round"
                className="animate-pulse"
              />
              <circle cx="100" cy="120" r="3" fill="#a855f7" />
              <circle cx="75" cy="70" r="2" fill="#a855f7" />
              <circle cx="125" cy="75" r="2" fill="#a855f7" />
           </svg>
        </div>

        {/* === LAYER 3: CORE LOGO (Floating Center) === */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(0px)" }}>
           <div className="w-16 h-24 opacity-80 mix-blend-overlay">
              {/* Stylized S-V Monogram (Curved) */}
              <svg viewBox="0 0 20 35" fill="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                <path d="M18.0003 7.04827H16.2503H14.5002C14.5002 7.04827 12.1544 1.94254 9.00027 1.54827C5.00027 1.04827 2.50024 4.50998 3.50027 8.00999C4.5003 11.51 15.5003 17.51 15.5003 17.51L9.00027 31.01L1.50027 17.51" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
           </div>
        </div>

        {/* === LAYER 4: FRONT CIRCUITS (Bright Overlay) === */}
        <div className="absolute inset-0" style={{ transform: "translateZ(15px)" }}>
           <svg viewBox="0 0 200 200" className="w-full h-full opacity-80 mix-blend-plus-lighter">
              <path 
                d="M80 90 L60 70 M120 90 L140 70 M40 50 L160 50 M100 40 L100 50" 
                stroke="#2dd4bf" strokeWidth="1.5" fill="none" strokeLinecap="round"
              />
              <circle cx="60" cy="70" r="1.5" fill="#2dd4bf" />
              <circle cx="140" cy="70" r="1.5" fill="#2dd4bf" />
           </svg>
        </div>

        {/* === LAYER 5: FRONT GLASS SHELL (Specular & Gradient) === */}
        <div className="absolute inset-0" style={{ transform: "translateZ(30px)" }}>
           <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                 <linearGradient id="glassGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="30%" stopColor="rgba(45,212,191,0.05)" />
                    <stop offset="60%" stopColor="rgba(168,85,247,0.05)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                 </linearGradient>
                 <radialGradient id="glassSheen" cx="30%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                 </radialGradient>
                 <filter id="blurFilter3D">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                 </filter>
              </defs>
              
              {/* Glass Body with Sheen */}
              <path 
                d={jellyShapePath} 
                fill="url(#glassGrad3D)" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="0.5"
                className="backdrop-blur-[3px]"
              />
              {/* Specular Highlight Spot */}
              <path 
                 d={jellyShapePath}
                 fill="url(#glassSheen)"
                 opacity="0.3"
                 style={{ mixBlendMode: 'overlay' }}
              />

              {/* Hard Edge Highlights (Rim Light) */}
              <path 
                 d="M50 50 Q 100 30 150 50"
                 fill="none"
                 stroke="white"
                 strokeWidth="3"
                 strokeLinecap="round"
                 opacity="0.7"
                 filter="url(#blurFilter3D)"
              />
              
              {/* Bottom Rim Reflection */}
              <path 
                 d="M70 150 Q 100 165 130 150"
                 fill="none"
                 stroke="rgba(45,212,191,0.6)"
                 strokeWidth="2"
                 strokeLinecap="round"
                 opacity="0.5"
                 filter="url(#blurFilter3D)"
              />
           </svg>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default DreamDevice;
