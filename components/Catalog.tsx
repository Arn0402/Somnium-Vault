import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Zap, Hash, ArrowRight } from 'lucide-react';
import { Dream } from '../types';
import { RARITY_COLORS } from '../constants';

interface CatalogProps {
  dreams: Dream[];
}

const Catalog: React.FC<CatalogProps> = ({ dreams }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#020204]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-12 left-6 md:left-24 z-10 pointer-events-none mix-blend-difference">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <h2 className="text-6xl md:text-8xl font-serif text-white/80 tracking-tighter">CATALOG</h2>
            <p className="text-xl font-mono text-teal-400 ml-2 -mt-2 tracking-wider opacity-80">/ MOST POPULAR</p>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-24 pl-[10vw] md:pl-[20vw] items-center">
          {dreams.map((dream, index) => (
            <DreamCard key={dream.id} dream={dream} index={index} />
          ))}
          
          {/* Interactive End Card - Explore All */}
          <div className="relative h-[65vh] w-[350px] md:w-[450px] flex flex-col items-center justify-center shrink-0 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 cursor-pointer group rounded-sm interactive backdrop-blur-md">
             <div className="p-10 text-center space-y-8 relative z-10">
                <h3 className="text-5xl md:text-6xl font-serif text-gray-300 group-hover:text-white transition-colors">
                  Explore<br/>Archive
                </h3>
                <div className="w-12 h-px bg-white/10 mx-auto group-hover:w-24 group-hover:bg-teal-400 transition-all duration-700"></div>
                <button className="text-teal-500/80 font-mono text-xs tracking-[0.3em] flex items-center justify-center gap-3 uppercase group-hover:text-teal-300 transition-colors">
                  View Full Collection <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform"/>
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DreamCard: React.FC<{ dream: Dream; index: number }> = ({ dream, index }) => {
  const rarityStyle = RARITY_COLORS[dream.rarity];

  return (
    <div className="group relative h-[65vh] w-[350px] md:w-[500px] shrink-0 overflow-hidden bg-[#050508] border border-white/5 rounded-sm interactive shadow-2xl transition-all duration-700">
      
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 opacity-60 group-hover:opacity-40"
          style={{ backgroundImage: `url(${dream.imageUrl || ''})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/80 to-transparent" />
      </div>
      
      {/* Content Container */}
      <div className="relative h-full p-8 md:p-12 flex flex-col justify-between z-10">
        
        <div className="flex justify-between items-start">
           <span className="font-mono text-4xl text-white/20 group-hover:text-white/40 transition-colors">0{index + 1}</span>
           <div className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border rounded-full backdrop-blur-md ${rarityStyle}`}>
             {dream.rarity}
           </div>
        </div>

        <div className="space-y-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          <h3 className="text-4xl md:text-5xl font-serif text-gray-100 leading-[1.1] group-hover:text-white transition-colors">
            {dream.title}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed border-l border-white/10 pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-sans font-light">
            {dream.description}
          </p>

          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            {dream.tags.map(tag => (
              <span key={tag} className="text-[10px] text-teal-200/70 font-mono flex items-center gap-1 border border-white/5 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                <Hash size={9} />{tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 text-teal-500 font-mono text-xs tracking-wider">
            <Zap size={12} /> <span>{dream.intensity}%</span>
          </div>
          <button className="flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:text-teal-300 transition-colors group text-xs">
            {dream.price} CR <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;