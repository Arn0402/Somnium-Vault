
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const title = "SOMNIUM VAULT";
  // Duplicate text to ensure seamless looping (4 copies)
  const marqueeContent = Array(4).fill(title);
  
  return (
    <footer className="bg-[#020204] pt-32 pb-16 border-t border-white/5 overflow-hidden relative">
      <div className="w-full mb-24 relative z-10 overflow-hidden">
         {/* Marquee Track */}
         <motion.div 
           className="flex whitespace-nowrap gap-16 md:gap-32 w-max"
           animate={{ x: ["0%", "-50%"] }} // Move Left (Right to Left flow)
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
         >
           {marqueeContent.map((text, groupIndex) => (
             <div key={groupIndex} className="flex gap-[0.5vw] cursor-default select-none shrink-0 items-center">
               {text.split("").map((char: string, i: number) => (
                 <LiquidChar key={`${groupIndex}-${i}`} char={char} />
               ))}
             </div>
           ))}
         </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-t border-white/5 pt-10">
          <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
            {/* Custom User Provided Logo */}
            <svg width="20" height="35" viewBox="0 0 20 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0003 7.04827H16.2503H14.5002C14.5002 7.04827 12.1544 1.94254 9.00027 1.54827C5.00027 1.04827 2.50024 4.50998 3.50027 8.00999C4.5003 11.51 15.5003 17.51 15.5003 17.51L9.00027 31.01L1.50027 17.51" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-bold text-white tracking-[0.2em] font-sc pt-1">SOMNIUM VAULT</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold tracking-[0.2em] text-gray-500 font-sans">
            <a href="#" className="hover:text-teal-200 transition-colors uppercase interactive">Terms</a>
            <a href="#" className="hover:text-teal-200 transition-colors uppercase interactive">Privacy</a>
            <a href="#" className="hover:text-teal-200 transition-colors uppercase interactive">Support</a>
            <a href="#" className="hover:text-teal-200 transition-colors uppercase interactive">Instagram</a>
          </div>

          <div className="text-[10px] text-gray-700 font-mono tracking-widest">
             © 2088 / ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

const LiquidChar: React.FC<{ char: string }> = ({ char }) => {
  if (char === " ") return <span className="w-[3vw]"></span>;

  return (
    <motion.span
      className="text-[13vw] leading-none font-sc font-bold text-white/5 cursor-default select-none interactive tracking-tighter"
      whileHover={{ 
         scale: 1.1, 
         y: -10,
         filter: "blur(4px)",
         color: "rgba(255,255,255,0.2)",
         transition: { type: "spring", stiffness: 200, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
};

export default Footer;
