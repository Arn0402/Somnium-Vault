import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Activity } from 'lucide-react';
import DreamDevice from './DreamDevice';

const features = [
  { id: 1, title: 'Neural Lace Sensor', desc: 'Reads REM frequency at 99.9% accuracy.', icon: Activity, x: 20, y: 30 },
  { id: 2, title: 'Haptic Feedback', desc: 'Transmits physical sensations directly to cortex.', icon: Cpu, x: 70, y: 60 },
  { id: 3, title: 'Cloud Sync', desc: 'Instant upload to the Somnium Vault.', icon: Wifi, x: 80, y: 20 },
];

const Showcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden bg-[#020204]">
      {/* Subtle Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#050508] to-[#020204]" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <div className="order-2 lg:order-1 relative h-[600px] flex items-center justify-center bg-white/[0.02] rounded-sm border border-white/5 backdrop-blur-sm">
            {/* Interactive Area */}
            <div className="relative w-full h-full flex items-center justify-center">
               <div className="w-64 h-64 md:w-80 md:h-80">
                  <DreamDevice interactive={true} />
               </div>
               
               {/* Hotspots */}
               {features.map((f) => (
                 <motion.button
                   key={f.id}
                   className="absolute w-6 h-6 rounded-full bg-teal-500/10 border border-teal-400/50 flex items-center justify-center hover:bg-teal-400/30 transition-colors z-20 cursor-pointer"
                   style={{ left: `${f.x}%`, top: `${f.y}%` }}
                   whileHover={{ scale: 1.2 }}
                   onClick={() => setActiveFeature(activeFeature === f.id ? null : f.id)}
                 >
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse absolute"></div>
                 </motion.button>
               ))}

                {/* Popups */}
                {features.map((f) => activeFeature === f.id && (
                  <motion.div
                    key={`popup-${f.id}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute z-30 w-64 p-5 bg-[#050508]/90 backdrop-blur-xl border border-white/10 text-left pointer-events-none shadow-2xl"
                    style={{ left: `${f.x + 5}%`, top: `${f.y - 10}%` }}
                  >
                    <div className="flex items-center gap-2 text-teal-300 mb-2">
                      <f.icon size={14} />
                      <span className="font-bold text-[10px] uppercase tracking-widest">{f.title}</span>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
            </div>
        </div>

        <div className="order-1 lg:order-2 space-y-10 pl-0 lg:pl-10">
           <h2 className="text-4xl md:text-6xl font-serif text-white/90">
             The <span className="text-teal-200">Dream Link</span>
           </h2>
           <p className="text-lg text-gray-400 font-light leading-relaxed">
             Biotech jelly interface that sits comfortably on your temple. No wires. No latency. Just pure immersion.
           </p>
           
           <div className="space-y-4 pt-4">
             {features.map((f) => (
               <div 
                 key={f.id}
                 className={`p-6 rounded-sm border transition-all cursor-pointer ${activeFeature === f.id ? 'bg-white/5 border-teal-500/30' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                 onMouseEnter={() => setActiveFeature(f.id)}
               >
                 <h4 className="font-bold text-gray-200 text-sm uppercase tracking-widest flex items-center gap-3">
                    <f.icon className={activeFeature === f.id ? "text-teal-300" : "text-gray-600"} size={16} /> {f.title}
                 </h4>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Showcase;