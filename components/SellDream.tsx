import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, Coins, ArrowRight } from 'lucide-react';
import { analyzeDream } from '../services/geminiService';
import { DreamAnalysis } from '../types';

const SellDream: React.FC = () => {
  const [dreamText, setDreamText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [step, setStep] = useState<'input' | 'result'>('input');

  const handleAnalyze = async () => {
    if (!dreamText.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeDream(dreamText);
      setAnalysis(result);
      setStep('result');
    } catch (error) {
      console.error(error);
      alert("Extraction failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setDreamText('');
    setStep('input');
    setAnalysis(null);
  };

  return (
    <section className="py-32 px-6 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft Background Blob - GPU Accelerated */}
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none gpu-accelerated" style={{ transform: 'translate3d(0, 0, 0)' }} />

      <div className="container max-w-6xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
           {/* Left Column: Info */}
           <div className="flex flex-col justify-center space-y-10">
              <h2 className="text-5xl md:text-7xl font-serif text-white/90 leading-tight">
                Monetize <br/> Your Mind.
              </h2>
              <p className="text-lg text-gray-400 max-w-md font-light leading-relaxed">
                Our proprietary AI algorithms analyze the rarity and emotional depth of your subconscious experiences.
              </p>
              <div className="hidden md:block w-16 h-px bg-gradient-to-r from-teal-500 to-transparent"></div>
           </div>

           {/* Right Column: Form Slate */}
           <div>
            <motion.div 
              className="bg-[#080810] border border-white/5 p-10 md:p-12 relative shadow-2xl rounded-sm backdrop-blur-3xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-500/50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal-500/50"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal-500/50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-500/50"></div>

              <AnimatePresence mode="wait">
                {step === 'input' && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                       <label className="text-[10px] font-mono text-teal-500/70 tracking-[0.2em] uppercase">Input Memory Data</label>
                       <textarea
                        value={dreamText}
                        onChange={(e) => setDreamText(e.target.value)}
                        placeholder="Describe the dream environment, sensory details, and emotional state..."
                        className="w-full h-72 bg-white/[0.02] border border-white/5 p-6 text-xl text-gray-200 focus:outline-none focus:bg-white/[0.05] focus:border-teal-900/50 transition-all resize-none font-serif placeholder:text-gray-700 placeholder:font-light interactive rounded-sm"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                       <span className="font-mono text-[10px] text-gray-600 tracking-widest">{dreamText.length} BYTES</span>
                       <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || dreamText.length < 10}
                        className={`group flex items-center gap-4 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs transition-all interactive
                          ${isAnalyzing || dreamText.length < 10 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-50'}`}
                      >
                        {isAnalyzing ? (
                          <>Processing <Loader2 className="animate-spin ml-2" size={14} /></>
                        ) : (
                          <>Evaluate <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'result' && analysis && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-10"
                  >
                    <div className="flex items-baseline gap-6 border-b border-white/5 pb-8">
                       <h3 className="text-sm text-gray-500 font-mono tracking-widest">ESTIMATED VALUE</h3>
                       <p className="text-7xl text-white font-serif tracking-tighter">{analysis.estimatedValue} <span className="text-lg text-teal-500 font-sans tracking-normal">CR</span></p>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                       <div>
                         <span className="block text-[10px] text-gray-600 mb-3 font-mono tracking-widest uppercase">RARITY CLASS</span>
                         <span className={`text-3xl font-serif ${analysis.rarity === 'Legendary' ? 'text-amber-200' : 'text-gray-200'}`}>{analysis.rarity}</span>
                       </div>
                       <div>
                         <span className="block text-[10px] text-gray-600 mb-3 font-mono tracking-widest uppercase">SENTIMENT</span>
                         <span className="text-3xl font-serif text-gray-200">{analysis.sentiment}</span>
                       </div>
                    </div>

                    <div className="bg-white/[0.03] p-8 border-l border-teal-500/30">
                       <p className="italic text-gray-400 font-light text-lg">"{analysis.analysisText}"</p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={reset} className="flex-1 py-4 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold interactive transition-all">
                        Discard
                      </button>
                      <button className="flex-1 py-4 bg-teal-900/30 text-teal-100 hover:bg-teal-900/50 border border-teal-500/20 uppercase tracking-widest text-[10px] font-bold interactive transition-all">
                        Mint to Vault
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SellDream;