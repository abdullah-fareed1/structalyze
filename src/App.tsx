/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import Contact from './pages/Contact';
import Partner from './pages/Partner';
import Privacy from './pages/Privacy';
import TermsOfVision from './pages/TermsOfVision';

export default function App() {
  const [route, setRoute] = useState<Page>('home');

  // Handle Hash-based URL changes for full browser-history support in SPAs!
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const validPages: Page[] = ['home', 'product', 'about', 'waitlist', 'contact', 'partner', 'privacy', 'terms', 'signup', 'signin'];
      if (hash && validPages.includes(hash)) {
        setRoute(hash);
      } else if (!hash) {
        setRoute('home');
      }
    };

    // Run once on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (newRoute: Page) => {
    setRoute(newRoute);
    window.location.hash = newRoute;
  };

  const renderActivePage = () => {
    switch (route) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'product':
        return <Product onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'partner':
        return <Partner onNavigate={handleNavigate} />;
      case 'signin':
        return <ComingSoon viewMode="signin" onNavigate={handleNavigate} />;
      case 'signup':
        return <ComingSoon viewMode="signup" onNavigate={handleNavigate} />;
      case 'privacy':
        return <Privacy onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfVision onNavigate={handleNavigate} />;
      case 'waitlist':
        return <ComingSoon viewMode="waitlist" onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] flex flex-col relative overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      {/* Visual Ambient Decorative Circle Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Responsive Glassmorphic Navbar */}
      <Navbar currentRoute={route} onNavigate={handleNavigate} />

      {/* Main Routing Stage with Page Entrance Animations */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Common Pitch-Ready Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
