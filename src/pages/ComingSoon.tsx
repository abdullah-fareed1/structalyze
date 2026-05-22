import React, { useState } from 'react';
import { Page } from '../types';
import { Activity, ShieldAlert, Sparkles, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import WaitlistForm from '../components/WaitlistForm';

interface ComingSoonProps {
  viewMode: 'signup' | 'signin' | 'waitlist';
  onNavigate: (route: Page) => void;
}

export default function ComingSoon({ viewMode, onNavigate }: ComingSoonProps) {
  const isSignIn = viewMode === 'signin';

  return (
    <div id="coming-soon-container" className="pt-24 min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden pb-12">
      {/* Visual background rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#111113]/95 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative z-10 text-center space-y-6">
        {/* Back navigation */}
        <div className="flex justify-start">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO MISSION
          </button>
        </div>

        {/* Brand visual header */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/src/assets/images/structalyze_logo.png"
            alt="Structalyze"
            className="h-9 sm:h-10 w-auto object-contain select-none"
            referrerPolicy="no-referrer"
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 bg-neutral-900 border border-white/5 px-2 py-0.5 rounded">Control Deck</span>
        </div>

        {isSignIn ? (
          /* Sign In UI Module */
          <div id="signin-controls" className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono tracking-wider uppercase">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                Enterprise Access Only
              </span>
              <h2 className="font-display font-medium text-xl text-white">Sign In to Your Workspace</h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Structalyze console is currently in private preview for registered pilot partners. Client accounts are limited to active customer slots.
              </p>
            </div>

            {/* Simulated login fields (disabled/readonly) to create visual saas illusion honestly */}
             <div className="space-y-3.5 text-left bg-black/40 p-4 rounded-xl border border-white/5 opacity-60">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Registered Email</span>
                <input
                  type="email"
                  disabled
                  placeholder="e.g. pilot-partner@company.com"
                  className="w-full bg-[#09090b] border border-white/5 rounded-lg px-3 py-2 text-xs text-neutral-400 focus:outline-none placeholder-neutral-600"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">Secured Room Token Code</span>
                <input
                  type="password"
                  disabled
                  placeholder="••••••••••••••"
                  className="w-full bg-[#09090b] border border-white/5 rounded-lg px-3 py-2 text-xs text-neutral-400 focus:outline-none placeholder-neutral-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('waitlist')}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
              >
                Request Access Token Credentials
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Why is preview access limited? Learn more.
              </button>
            </div>
          </div>
        ) : (
          /* Sign Up / Waitlist UI Module */
          <div id="signup-controls" className="space-y-5">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono font-bold text-blue-400 uppercase rounded">
                <Sparkles className="w-3 h-3" />
                Reserved Early Cohort
              </span>
              <h2 className="font-display font-medium text-xl text-white">
                {viewMode === 'signup' ? 'Request Pilot Credentials' : 'Private Waitlist Registration'}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                No real auth is available yet on this vision deck. Sign up below to join our early testing sandbox batch and receive setup credentials.
              </p>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mt-2">
              <WaitlistForm sourceContext={viewMode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
