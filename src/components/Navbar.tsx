import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Coffee, Sun, Moon } from 'lucide-react';
import dLogo from '../../d-logo.png';

export default function Navbar({ 
  bookmarkCount,
  theme,
  onToggleTheme
}: { 
  bookmarkCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    //{ name: 'Admitere', path: '/admitere' },
    { name: 'Biologie', path: '/biologie' },
    { name: 'Chimie', path: '/chimie' },
    //{ name: 'Materiale', path: '/materiale' },
    { name: 'Salvate', path: '/salvate' },
    { name: 'Instrumente', path: '/instrumente' },
    //{ name: 'Diagrame', path: '/diagrame' },
    { name: 'Examen Practic', path: '/examen-practic' },
    //{ name: 'Forum', path: '/forum' },
    { name: 'Realizări', path: '/realizari' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-natural-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={dLogo} alt="HELIX logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-natural-green-dark">
                HELIX<span className="text-natural-green">.med</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium transition-colors relative ${
                  location.pathname === link.path 
                    ? 'text-natural-green underline decoration-2 underline-offset-4' 
                    : 'text-natural-gray hover:text-natural-green'
                }`}
              >
                {link.name}
                {link.path === '/salvate' && bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-3 w-4 h-4 bg-natural-earth text-white text-[10px] rounded-full flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </Link>
            ))}
            
            <button 
              onClick={onToggleTheme}
              className="p-2 bg-natural-muted rounded-xl text-natural-gray hover:text-natural-green transition-all"
              aria-label="Schimbă tema"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className="p-2 bg-natural-muted rounded-xl text-natural-gray"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-natural-green-dark">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-natural-bg border-b border-natural-green/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === link.path ? 'text-natural-green' : 'text-natural-gray hover:text-natural-green'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <a 
                  href="https://www.buymeacoffee.com/vladpopa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FFDD00] text-black px-4 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Susține proiectul</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}