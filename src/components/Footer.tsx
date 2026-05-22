import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (route: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (route: Page) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/5 pt-16 pb-12 relative z-10 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 border-b border-white/5 pb-12">
        {/* Brand identity column */}
        <div className="md:col-span-1.5 flex flex-col gap-4">
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center justify-start cursor-pointer focus:outline-none select-none text-left"
          >
            <img
              src="/src/assets/images/structalyze_logo.png"
              alt="Structalyze"
              className="h-8 md:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </button>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
            The lightweight, intelligent AI meeting memory and context layer. Automatically capturing sales deal intelligence, updating CRMs, and ensuring context is never lost.
          </p>
          <div className="flex items-center gap-3 mt-2 text-neutral-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Links Column 1: Product */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-semibold text-[11px] uppercase tracking-widest text-neutral-400">
            Product Vision
          </span>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('product')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Meeting Intelligence
            </button>
            <button
              onClick={() => handleLinkClick('product')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              CRM Memory Layer
            </button>
            <button
              onClick={() => handleLinkClick('product')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Workflow Integrations
            </button>
            <button
              onClick={() => handleLinkClick('product')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Future Roadmap
            </button>
          </nav>
        </div>

        {/* Links Column 2: Mission */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-semibold text-[11px] uppercase tracking-widest text-neutral-400">
            About & Capital
          </span>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('about')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Our Philosophy
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Broken CRM CRM State
            </button>
            <button
              onClick={() => handleLinkClick('partner')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Co-founder Recruitment
            </button>
            <button
              onClick={() => handleLinkClick('partner')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer flex items-center gap-1"
            >
              Investor Relations
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </button>
          </nav>
        </div>

        {/* Links Column 3: Contact */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-semibold text-[11px] uppercase tracking-widest text-neutral-400">
            Inquiries
          </span>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              General Contact
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer"
            >
              Early Pilot Requests
            </button>
            <button
              onClick={() => handleLinkClick('waitlist')}
              className="text-xs text-neutral-400 hover:text-white text-left transition-colors cursor-pointer font-medium text-blue-400 hover:text-blue-300"
            >
              Join Early Access Waitlist
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
        <div className="text-center md:text-left">
          &copy; {currentYear} Structalyze. All rights reserved.
        </div>
        <div className="flex gap-6 justify-center">
          <span className="hover:text-neutral-300 transition-colors">Privacy Charter</span>
          <span className="hover:text-neutral-300 transition-colors">Terms of Vision</span>
          <span className="hover:text-neutral-300 transition-colors bg-white/5 px-2 py-0.5 rounded text-white font-mono uppercase text-[9px]">
            Beta v0.1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
