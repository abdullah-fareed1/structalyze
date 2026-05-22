import React from 'react';
import { Page } from '../types';
import { Briefcase, Handshake, ShieldAlert, LineChart, Cpu, KeyRound, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

interface PartnerProps {
  onNavigate: (route: Page) => void;
}

export default function Partner({ onNavigate }: PartnerProps) {
  return (
    <div id="partner-page" className="pt-24 space-y-24 pb-20">
      {/* Header Statement */}
      <section className="relative px-6 max-w-7xl mx-auto text-center space-y-4 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none"></div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">Co-founder & Venture Board</span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight max-w-3xl mx-auto leading-tight">
          We make the first <br />
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Sovereign CRM Context Layer.</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
          We are seeking high-reach sales influencers, content creators, and selective angel partners to promote the product and accelerate Structalyze during its early private rollout.
        </p>
      </section>

      {/* Structured Pitch Cards */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Creator/Influencer Profile Section */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-6 text-left relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold tracking-wider">Growth & Promotion</span>
              <h3 className="font-display font-bold text-lg text-white">Creator & Influencer Partners</h3>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            We are looking for influential creators, sales thought leaders, and B2B tech promoters who want to introduce Structalyze to their networks. Rather than seeking technical cofounders, we want to align incentives with voices who can drive virility, lead generation, and elite waitlist signups.
          </p>

          <div className="space-y-3.5 pt-2">
            <h4 className="text-xs font-semibold text-neutral-300">Creator Incentives:</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 p-2 bg-white/2 rounded-lg border border-white/5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                SaaS Commissions
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white/2 rounded-lg border border-white/5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Co-marketing Campaigns
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white/2 rounded-lg border border-white/5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Direct CRM Audiences
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white/2 rounded-lg border border-white/5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Early Cohort Access
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
            >
              Request Partnership Brief
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Investor Profile Section */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-6 text-left relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <LineChart className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold tracking-wider">Angels / Strategic Believers</span>
              <h3 className="font-display font-bold text-lg text-white">Angel & Strategic Investors</h3>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            We are not expecting massive pre-seed VC rounds right now. We are seeking tactical angel investors, industry advisors, and early believers who want to contribute capital of any tier or strategic integrations support to accelerate our pipeline.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-neutral-300">Angel Alignment Targets:</h4>
            <ul className="space-y-2 text-[11px] text-neutral-450 font-mono">
              <li className="flex gap-2 items-start">
                <span className="text-indigo-400">&raquo;</span>
                <span><strong>Flexible Ticket Sizes:</strong> Welcoming individual checks & advisory support.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-indigo-400">&raquo;</span>
                <span><strong>Utility Focus:</strong> Sits passively in enterprise meeting environments, rendering high customer retention.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-indigo-400">&raquo;</span>
                <span><strong>Direct Partner Sync:</strong> Direct communication line with the foundational project creators.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
            >
              Connect with Project Core
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Rollout Advisory Banner */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-6 md:p-8 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-left space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
            <h3 className="font-display font-bold text-sm text-blue-400 uppercase tracking-wide">Strategic Rollout Advisory</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            The Structalyze platform is currently in a controlled preview release to select enterprise partners. Core data fields and custom memory synchronization behaviors are configured for active client environments. Simulated sandbox runs maintain high performance with zero leakage.
          </p>
          <p className="text-xs text-neutral-450 leading-relaxed">
            By being completely structured in our rollout, we build deep transactional trust with strategic channels and early-stage partners who prioritize pristine relationship integrity.
          </p>
        </div>
      </section>

      {/* Partner Board CTA */}
      <section className="text-center max-w-xl mx-auto px-6 pt-8">
        <h3 className="font-display font-medium text-lg text-white mb-2">Want to shape this journey directly?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          Connect directly to our founding inbox to review our pre-seed parameters and equity metrics.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
          >
            Open Relationship Desk
          </button>
          <button
            onClick={() => onNavigate('waitlist')}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Register on Waitlist
          </button>
        </div>
      </section>
    </div>
  );
}
