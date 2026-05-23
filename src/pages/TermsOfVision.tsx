import React from 'react';
import { Page } from '../types';
import { Compass, Eye, Sparkles, ShieldAlert } from 'lucide-react';

interface TermsOfVisionProps {
  onNavigate: (route: Page) => void;
}

export default function TermsOfVision({ onNavigate }: TermsOfVisionProps) {
  return (
    <div id="terms-vision-page" className="pt-24 pb-20 space-y-12">
      <section className="relative px-6 max-w-4xl mx-auto text-center space-y-4 pt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">Terms of Vision</span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight leading-tight">
          The values that guide Structalyze and how we earn trust.
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mx-auto">
          These terms describe our commitment to clarity, reliability, and responsible product design for teams who depend on fast-moving sales context.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-5">
          <div className="inline-flex items-center gap-3 text-indigo-400">
            <Compass className="w-5 h-5" />
            <h2 className="font-semibold text-white text-xl">Purpose of Structalyze</h2>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            We are not building another generic note app. Structalyze exists to turn meeting signals into structured memory so sales teams can act with confidence instead of guesswork.
          </p>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li>- Keep deal context alive across meetings.</li>
            <li>- Reduce manual CRM friction and avoid data leakage.</li>
            <li>- Give teams a shared memory layer that supports informed decisions.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-5">
          <div className="inline-flex items-center gap-3 text-indigo-400">
            <Eye className="w-5 h-5" />
            <h2 className="font-semibold text-white text-xl">What we promise</h2>
          </div>
          <div className="space-y-3 text-sm text-neutral-400">
            <p>We promise to build a memory layer that is:</p>
            <p>- Transparent in how it captures and stores context.</p>
            <p>- Practical in making CRM data useful without extra effort.</p>
            <p>- Responsible about not overpromising AI results or replacing human judgment.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-8 space-y-4">
          <h2 className="font-display font-semibold text-white text-2xl">Guiding principles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">Context first</p>
              Every feature is measured by whether it preserves deal context and reduces information loss.
            </div>
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">Privacy by design</p>
              We design each experience with data minimization, encryption, and customer control at the center.
            </div>
            <div className="rounded-2xl bg-zinc-950/80 border border-white/5 p-5 text-sm text-neutral-400">
              <p className="font-semibold text-white mb-2">Pilot-level trust</p>
              During private preview, we move deliberately, listen closely, and refine the product with real partner feedback.
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="rounded-3xl border border-white/10 bg-[#111113]/90 p-6 text-sm text-neutral-400">
          <p>
            These terms are not a promise of finished product scope. They are our present-day commitments: to keep the memory layer lightweight, to protect your data, and to ensure that Structalyze amplifies your sales intelligence rather than replacing your team’s judgement.
          </p>
        </div>
        <button
          onClick={() => onNavigate('partner')}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          Join our early partner cohort
        </button>
      </section>
    </div>
  );
}
