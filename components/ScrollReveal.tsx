import React, { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring, MotionValue } from 'framer-motion';

const ScrollReveal: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "center 0.5"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  // Block 1: Main paragraph.
  const text1 = "Somnium Vault is the future of memory, where your past can become another's adventure. Turning ephemeral thoughts into tangible currency. We quantify the\u00A0intangible.";
  
  // Block 2 & 3: Distinct lines
  const text2 = "Every night is a new market.";
  const text3 = "Every mind is a new source.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");
  const words3 = text3.split(" ");

  const totalWords = words1.length + words2.length + words3.length;
  let globalWordIndex = 0;

  return (
    <div ref={container} className="relative min-h-[80vh] flex flex-col items-start justify-center bg-[#050510] px-6 py-24 md:px-24 md:py-32 select-none cursor-default font-sans">
       <div className="max-w-6xl text-left space-y-2 md:space-y-4 ml-auto mr-12 md:mr-24">
        
        {/* Block 1 */}
        <p className="flex flex-wrap justify-start gap-x-4 gap-y-1 text-5xl md:text-7xl font-light leading-tight tracking-tight text-gray-300 mb-12">
          {words1.map((word, i) => {
            const start = (globalWordIndex / totalWords) * 0.9;
            const end = start + (2.5 / totalWords);
            globalWordIndex++;
            return (
              <Word key={`p1-${i}`} progress={smoothProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Block 2 & 3 - Stacked closer together */}
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="flex flex-wrap justify-start gap-x-4 gap-y-1 text-5xl md:text-7xl font-light leading-tight tracking-tight text-gray-300">
            {words2.map((word, i) => {
              const start = (globalWordIndex / totalWords) * 0.9;
              const end = start + (2.5 / totalWords);
              globalWordIndex++;
              return (
                <Word key={`p2-${i}`} progress={smoothProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>

          <p className="flex flex-wrap justify-start gap-x-4 gap-y-1 text-5xl md:text-7xl font-light leading-tight tracking-tight text-gray-300">
            {words3.map((word, i) => {
              const start = (globalWordIndex / totalWords) * 0.9;
              const end = start + (2.5 / totalWords);
              globalWordIndex++;
              return (
                <Word key={`p3-${i}`} progress={smoothProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

       </div>
    </div>
  );
};

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]); 
  const color = useTransform(progress, range, ["#52525b", "#ffffff"]);
  
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity, color }} className="transition-colors duration-0">
        {children}
      </motion.span>
    </span>
  );
};

export default ScrollReveal;