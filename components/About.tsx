
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Fingerprint, Database } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    }
  };

  return (
    <motion.section 
      className="pt-40 pb-24 px-6 min-h-screen relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto max-w-6xl">
        
        {/* Header / Manifesto */}
        <motion.div variants={itemVariants} className="mb-32 space-y-8">
          <p className="font-mono text-teal-500 text-xs tracking-[0.3em] uppercase">Est. 2088 — Vesperia Prime Node</p>
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mix-blend-color-dodge">
            We are the <br/>
            <span className="text-teal-200">Architects</span> of the <br/>
            Subconscious.
          </h1>
          <div className="flex flex-col md:flex-row gap-12 pt-12 border-t border-white/10 mt-12">
             <div className="md:w-1/3">
               <h3 className="text-xl font-sans font-bold text-gray-200 tracking-widest uppercase">Our Mission</h3>
             </div>
             <div className="md:w-2/3">
               <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed font-serif">
                 Before the Vault, dreams were ephemeral—lost the moment you opened your eyes. 
                 We built the infrastructure to capture, encrypt, and exchange these fragile neural tapestries. 
                 Somnium Vault isn't just a marketplace; it is the <span className="text-teal-200">Library of Human Experience</span>.
               </p>
             </div>
          </div>
        </motion.div>

        {/* Visual Break / Statistics */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/5 py-16">
           <Stat number="4.2B" label="Dreams Archived" />
           <Stat number="99.9%" label="Neural Fidelity" />
           <Stat number="150+" label="Countries Connected" />
           <Stat number="∞" label="Possibilities" />
        </motion.div>

        {/* Values Grid */}
        <motion.div variants={itemVariants} className="space-y-16">
          <div className="flex items-end justify-between">
             <h2 className="text-4xl md:text-5xl font-serif text-white/90">Core Protocols</h2>
             <div className="hidden md:block h-px w-32 bg-white/20 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard 
              icon={Eye}
              title="Absolute Clarity" 
              desc="The Somnium Vault™ technology upscales REM imagery to 16K resolution, filling in sensory gaps with generative neural fill." 
            />
            <ValueCard 
              icon={Shield}
              title="Sanctity & Privacy" 
              desc="Every uploaded memory is stripped of personally identifiable metadata. You sell the experience, not your identity." 
            />
            <ValueCard 
              icon={Fingerprint}
              title="Unique Ownership" 
              desc="Using blockchain-backed Neural Non-Fungible Tokens (N-NFTs), we ensure that every purchased dream is verifiably unique." 
            />
          </div>
        </motion.div>

        {/* Team / Signature */}
        <motion.div variants={itemVariants} className="mt-40 flex justify-end">
           <div className="text-right space-y-4">
              <div className="w-32 h-20 ml-auto opacity-50">
                 {/* Signature SVG */}
                 <svg viewBox="0 0 200 100" className="stroke-white fill-none stroke-2">
                    <path d="M10,80 Q50,10 90,80 T180,50" />
                    <path d="M20,60 L60,60" />
                 </svg>
              </div>
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Narim Jeong <br/> Founder & Lead Oneironaut</p>
           </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

const Stat: React.FC<{ number: string, label: string }> = ({ number, label }) => (
  <div className="text-center md:text-left">
    <div className="text-4xl md:text-6xl font-serif text-teal-200/80 mb-2">{number}</div>
    <div className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">{label}</div>
  </div>
);

const ValueCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="group p-10 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors rounded-sm backdrop-blur-sm">
    <div className="w-12 h-12 bg-teal-900/20 flex items-center justify-center rounded-full mb-8 text-teal-400 group-hover:scale-110 transition-transform duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-serif text-white mb-4 group-hover:text-teal-200 transition-colors">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed font-light">{desc}</p>
  </div>
);

export default About;
