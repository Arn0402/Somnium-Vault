
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (view: 'home' | 'about' | 'technology') => void;
  currentView: 'home' | 'about' | 'technology';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 py-8 mix-blend-difference text-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - Clicks to Home */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 group cursor-none interactive focus:outline-none"
        >
          {/* Custom User Provided Logo */}
          <svg width="23" height="40" viewBox="0 0 20 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white transition-transform group-hover:scale-110">
            <path d="M18.0003 7.04827H16.2503H14.5002C14.5002 7.04827 12.1544 1.94254 9.00027 1.54827C5.00027 1.04827 2.50024 4.50998 3.50027 8.00999C4.5003 11.51 15.5003 17.51 15.5003 17.51L9.00027 31.01L1.50027 17.51" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <span className="text-2xl font-sc font-bold tracking-widest pt-1 group-hover:text-teal-200 transition-colors">SOMNIUM VAULT</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-xs font-bold tracking-widest font-sans">
          <button 
            onClick={() => onNavigate('home')} 
            className={`hover:text-teal-400 transition-colors interactive uppercase ${currentView === 'home' ? 'text-teal-400' : 'text-white'}`}
          >
            Catalog
          </button>
          
          <button 
            onClick={() => onNavigate('technology')}
            className={`hover:text-teal-400 transition-colors interactive uppercase ${currentView === 'technology' ? 'text-teal-400' : 'text-white'}`}
          >
            Technology
          </button>
          
          <button 
            onClick={() => onNavigate('about')} 
            className={`hover:text-teal-400 transition-colors interactive uppercase ${currentView === 'about' ? 'text-teal-400' : 'text-white'}`}
          >
            About
          </button>
          
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors interactive">
            CONNECT DEVICE
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden cursor-none interactive" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-[#050510] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
           <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-gray-300 py-2 font-sans text-left">CATALOG</button>
           <button onClick={() => { onNavigate('technology'); setMobileMenuOpen(false); }} className="text-gray-300 py-2 font-sans text-left">TECHNOLOGY</button>
           <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="text-gray-300 py-2 font-sans text-left">ABOUT</button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
