import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface NavbarProps {
  currentRoute: Page;
  onNavigate: (route: Page) => void;
}

export default function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home' as Page },
    { label: 'Product Focus', route: 'product' as Page },
    { label: 'Our Vision', route: 'about' as Page },
    { label: 'Partners & Investors', route: 'partner' as Page },
    { label: 'Contact', route: 'contact' as Page },
  ];

  const handleNavClick = (route: Page) => {
    onNavigate(route);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer focus:outline-none text-left select-none"
        >
          <img
            src="/src/assets/images/structalyze_logo_1779458415793.png"
            alt="Structalyze"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity active:scale-[0.98]"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/5 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/2'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('signin')}
            className={`text-[13px] font-medium cursor-pointer transition-colors ${
              currentRoute === 'signin' ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavClick('waitlist')}
            className="group relative inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1">
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => handleNavClick('waitlist')}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600/90 rounded-full hover:bg-blue-500 transition-colors"
          >
            Waitlist
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-neutral-400 hover:text-white focus:outline-none rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/5 bg-brand-dark/95 backdrop-blur-lg overflow-hidden absolute top-full left-0 right-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="px-6 pt-2 pb-6 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.route}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-[14px] font-medium transition-colors ${
                    currentRoute === item.route
                      ? 'bg-white/5 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="h-[1px] bg-white/5 my-3" />
              <div className="flex flex-col gap-3 px-4 mt-1">
                <button
                  onClick={() => handleNavClick('signin')}
                  className="w-full text-center py-2.5 rounded-xl text-[14px] font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('waitlist')}
                  className="w-full text-center py-3 rounded-full text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Join Private Access Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
