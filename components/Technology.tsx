
import React from 'react';
import { motion } from 'framer-motion';

const Technology: React.FC = () => {
  return (
    <motion.section 
      className="pt-32 pb-24 min-h-screen bg-[#020204] relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-7xl px-6 space-y-40">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-serif text-white mix-blend-color-dodge will-change-transform"
          >
            The Artifact
          </motion.h1>
          <p className="text-teal-400 font-mono tracking-widest text-xs uppercase">Dream Link Model-X</p>
        </div>

        {/* SECTION 1: WEARING THE DEVICE (Model Shot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
           <div className="lg:col-span-8 relative group overflow-hidden rounded-sm">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="aspect-video w-full will-change-transform"
              >
                 <img 
                   src="https://i.imgur.com/rY7CzsU.gif" 
                   alt="Model wearing Dream Link" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 will-change-transform"
                   decoding="async"
                 />
              </motion.div>
           </div>

           <div className="lg:col-span-4 space-y-6 lg:pb-0 flex flex-col items-start h-full justify-center">
              <h3 className="text-3xl font-serif text-white">Seamless <br/>Integration.</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                 The Dream Link adheres effortlessly to the temple, utilizing a biocompatible smart-gel that creates a zero-latency neural bridge. 
                 It becomes an extension of your own nervous system.
              </p>
              <div className="h-px w-24 bg-teal-900/50"></div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                 FIG 1.0 — NEURAL SYNC ACTIVE
              </p>
           </div>
        </div>

        {/* SECTION 2: LIGHTWEIGHT / MINIMAL (Lifting Device) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
           <div className="lg:col-span-5 order-2 lg:order-1 space-y-8 pl-0 lg:pl-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                 Weightless <br/> <span className="text-teal-200">Immersion.</span>
              </h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                 Weighing less than 12 grams, the device is designed to be forgotten. 
                 The minimalist form factor ensures no physical distractions during your REM cycles. 
                 It is as light as the dreams it carries.
              </p>
              <ul className="space-y-4 pt-4">
                 <li className="flex items-center gap-4 text-sm text-gray-300 font-mono">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> 12g Total Weight
                 </li>
                 <li className="flex items-center gap-4 text-sm text-gray-300 font-mono">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Hypoallergenic Shell
                 </li>
                 <li className="flex items-center gap-4 text-sm text-gray-300 font-mono">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Wireless Charging
                 </li>
              </ul>
           </div>

           <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-video overflow-hidden rounded-sm group">
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                src="https://i.imgur.com/mIZiKDG.gif" 
                alt="Hand holding futuristic device" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                decoding="async"
                loading="lazy"
              />
              {/* Very subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
           </div>
        </div>

        {/* SECTION 3: 360 VIEW (Static Image) */}
        <div className="space-y-12 text-center">
           <div className="space-y-4">
              <h3 className="text-3xl font-serif text-white">360° Examination</h3>
           </div>
           
           <div className="relative w-full max-w-4xl mx-auto aspect-video bg-white/[0.02] border border-white/5 rounded-sm flex items-center justify-center overflow-hidden group">
              
              {/* Static 360 View Image Placeholder */}
              <img 
                 src="https://i.imgur.com/v82UY5N.gif" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 will-change-transform"
                 decoding="async"
                 loading="lazy"
              />

              {/* Technical Annotations */}
              <div className="absolute top-8 left-8 text-left space-y-1 z-20 pointer-events-none">
                 <div className="text-[10px] font-mono text-teal-500 uppercase">Status</div>
                 <div className="text-sm font-sans text-black">Rotation Sequence</div>
              </div>
              <div className="absolute bottom-8 right-8 text-right space-y-1 z-20 pointer-events-none">
                 <div className="text-[10px] font-mono text-teal-500 uppercase">Material</div>
                 <div className="text-sm font-sans text-black">Silica-Graphene Gel</div>
              </div>
           </div>
        </div>

        {/* SECTION 4: VIDEO ARCHIVES (YouTube Embeds) */}
        <div className="space-y-16">
           <div className="flex items-end justify-between border-b border-white/10 pb-6">
              <h3 className="text-4xl font-serif text-white">Visual Archives</h3>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Somnium Vault Media</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Video 1: Brand Hero Shot */}
              <div className="space-y-6">
                 <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-white/10">
                    <iframe
                      src="https://www.youtube.com/embed/jLvkLgc4_PY?rel=0"
                      title="Somnium Brand Film"
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                 </div>
                 <div>
                    <p className="text-xs font-mono text-teal-400 uppercase mb-2">Brand Film</p>
                    <h4 className="text-2xl font-serif text-white">The Awakening</h4>
                    <p className="text-sm text-gray-500 mt-2 font-light">Hero Shot Video.</p>
                 </div>
              </div>

              {/* Video 2: Product Commercial */}
              <div className="space-y-6">
                 <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-white/10">
                    <iframe
                      src="https://www.youtube.com/embed/LIceTIT7Xr8?rel=0"
                      title="Dream Link Commercial"
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                 </div>
                 <div>
                    <p className="text-xs font-mono text-teal-400 uppercase mb-2">Commercial</p>
                    <h4 className="text-2xl font-serif text-white">Dream Link X</h4>
                    <p className="text-sm text-gray-500 mt-2 font-light">Experience the future of REM interfacing.</p>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Technology;
