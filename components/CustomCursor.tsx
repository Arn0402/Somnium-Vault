import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // Offset by half the width/height (w-12 is 3rem = 48px, so offset is 24)
      mouseX.set(e.clientX - 24);
      mouseY.set(e.clientY - 24);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.classList.contains('interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white pointer-events-none z-[100] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
         className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100]"
         style={{ x: mouseX, y: mouseY, translateX: 20, translateY: 20 }} // Adjusted to center within the larger circle
      />
    </>
  );
};

export default CustomCursor;