import React from 'react';
import { Page } from '../types';
import { ShieldAlert, Lock, Eye, Scroll, Sparkles } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (route: Page) => void;
}

export default function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div id="privacy-page" className="pt-24 pb-20 space-y-12">
      <section className="relative px-6 max-w-4xl mx-auto text-center space-y-4 pt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">Privacy Charter</span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight leading-tight">
          We protect the meeting memory behind every deal.
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mx-auto">
          Structalyze is built to keep your sales conversations private, secure, and focused on actionable context. We do not treat your call transcripts like free training data.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-5">
          <div className="inline-flex items-center gap-3 text-blue-400">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="font-semibold text-white text-xl">Our Privacy Commitment</h2>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            We collect only the information required to make your sales memory layer work: meeting metadata, structured deal attributes, and the relationship signals that improve follow-up accuracy. We do not store raw transcripts as a product asset or reuse them to train models outside of your secure preview environment.
          </p>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2">
              <Lock className="w-4 h-4 text-blue-400 shrink-0" />
              Minimal data collection designed for clear business outcomes.
            </li>
            <li className="flex gap-2">
              <Eye className="w-4 h-4 text-blue-400 shrink-0" />
              Transparent context extraction from meetings rather than hidden profiling.
            </li>
            <li className="flex gap-2">
              <Scroll className="w-4 h-4 text-blue-400 shrink-0" />
              Retention rules are based on pilot needs, with access controls for your team.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-5">
          <div className="inline-flex items-center gap-3 text-blue-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-semibold text-white text-xl">What we protect</h2>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Your prospect details, pipeline sensitivity, customer objections, budget signals, and deal timing are treated as confidential business memory. That means every extracted insight remains in your structured flow and is not exposed to external indexing or model training.
          </p>
          <div className="space-y-3 text-sm text-neutral-400">
            <p>
              Structalyze uses secure channels to process data. We encrypt data at rest and in motion, and we keep administrative access limited so only authorized pilot engineers can diagnose the system when needed.
            </p>
            <p>
              We believe privacy is not an afterthought. It is built into our architecture so that early access customers can trust the product from day one.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-4">
          <h2 className="font-display font-semibold text-white text-2xl">Data handling principles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">Purpose-driven use</p>
              We process data only to extract meeting context, summarize deal intelligence, and sync structured outputs to your CRM pipeline.
            </div>
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">No external training</p>
              Raw customer conversations are not used for general model training or benchmarking outside your committed pilot environment.
            </div>
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">User control</p>
              You can choose what memory is kept, what gets exported, and who can access critical deal context.
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center">
        <button
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          Contact us about privacy and pilot protections
        </button>
      </section>
    </div>
  );
}
