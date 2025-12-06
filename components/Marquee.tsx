import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', speed = 20 }) => {
  return (
    <div className="relative flex overflow-hidden py-4 bg-transparent border-y border-white/10 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-6xl md:text-8xl font-serif font-bold text-transparent text-outline px-8 uppercase opacity-30">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;