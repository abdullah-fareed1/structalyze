import React from 'react';
import { Page } from '../types';
import { Compass, Eye, ShieldAlert, HeartHandshake, ArrowRight, UserCheck, HelpCircle } from 'lucide-react';

interface AboutProps {
  onNavigate: (route: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div id="about-page-container" className="pt-24 space-y-24 pb-20">
      {/* Header Statement */}
      <section className="relative px-6 max-w-7xl mx-auto text-center space-y-4 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none"></div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">Our Founding Mission</span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight max-w-3xl mx-auto leading-tight">
          We build structured memory <br />
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">for sales teams that value context.</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed font-mono">
          &ldquo;Meetings end. Context shouldn&apos;t.&rdquo;
        </p>
      </section>

      {/* The Broken State of CRM */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-xs uppercase tracking-widest text-red-400 font-mono font-bold flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            The Structural Dysfunction
          </span>
          <h2 className="font-display font-semibold text-2xl text-white tracking-tight">
            The broken state of standard CRMs
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed">
            CRMs were built over 25 years ago as relational databases for record keepers. They were designed for auditing, not for aiding. 
          </p>
          <p className="text-neutral-400 text-xs leading-relaxed">
            As a result, modern CRM systems feel like a chore for sales representatives. They are forced to take messy notes during strategic discussions and re-organize them into rigid software boxes. When they running to the next call, key buyer details—like budget authority or competitive trial dates—constantly leak.
          </p>
          <p className="text-neutral-400 text-xs leading-relaxed font-semibold text-neutral-300">
            We believe information collection should be automated so relationships can remain authentic.
          </p>
        </div>

        {/* Visual comparison box */}
        <div className="border border-white/5 bg-[#111113] rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-semibold text-xs text-neutral-300 uppercase tracking-wider text-left">The Paradigm Evolution</h3>
          
          <div className="grid grid-cols-1 gap-3.5 text-left">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase">Legacy CRM Approach</span>
              <h4 className="font-semibold text-xs text-white mt-1">Manual Relational Database</h4>
              <p className="text-[11px] text-neutral-400 mt-1">Reps manually transcribe variables, fill custom properties, update ticket statuses, and compile follow-up emails from scratch. Massive cognitive friction.</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">Structalyze Memory Approach</span>
              <h4 className="font-semibold text-xs text-white mt-1">Passive AI Intelligence Layer</h4>
              <p className="text-[11px] text-neutral-400 mt-1">Background agents analyze natural meeting acoustics, extract core transactional parameters, automatically log updates, and draft follow-up templates ready to review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy of the Startup */}
      <section className="bg-brand-dark/40 py-16 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold">Our Core Philosophy</span>
            <h2 className="font-display font-medium text-2xl text-white tracking-tight">The Principles Guiding our Engineering</h2>
            <p className="text-neutral-400 text-xs max-w-lg mx-auto">
              We reject high-hyped, generic AI marketing wrappers. We are laser-focused on building practical toolkits with absolute transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-xl text-left space-y-3">
              <Compass className="w-6 h-6 text-blue-400" />
              <h4 className="font-semibold text-sm text-white">Context over Summary</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Generic transcribers tell you what was said. We identify what matters: deal stakeholders, pricing thresholds, CFO objections, and next actions.
              </p>
            </div>

            <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-xl text-left space-y-3">
              <Eye className="w-6 h-6 text-emerald-400" />
              <h4 className="font-semibold text-sm text-white">Radical Transparency</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We are honest with investors, cofounders, and early pilot customers. We are currently in our active private preview stage, prioritizing deliberate system reliability over rapid public feature bloat.
              </p>
            </div>

            <div className="p-5 bg-zinc-900/40 border border-white/5 rounded-xl text-left space-y-3">
              <HeartHandshake className="w-6 h-6 text-indigo-400" />
              <h4 className="font-semibold text-sm text-white">Zero Enterprise Bloat</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No complex dashboards to configure. Structalyze behaves as a lightweight background memory daemon that enhances—not replaces—your existing tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotionally Intelligent Letter Card */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-zinc-900/70 to-zinc-950/80 border border-white/5 text-left space-y-5 relative">
          {/* Accent border left */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500 rounded-l-2xl"></div>

          <h3 className="font-display font-bold text-lg text-white">A Short Note to Dreamers, Co-founders, and Future Partners</h3>
          
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <p>
              Structalyze was conceived out of direct frustration. Having built and managed complex sales organizations, I watched key executive commitments leak between pipeline transitions over and over. When sales representatives are moving at 100mph, manual CRM updating becomes the first system to deteriorate.
            </p>
            <p>
              Rather than attempting to construct &quot;yet another enterprise CRM&quot; to compete with massive giants, we want to solve the problem where it actually occurs: <strong>the context memory transition layer.</strong>
            </p>
            <p>
              We are currently in our private preview phase, rolling out core sandbox configurations to check secure pipeline behaviors. This is the absolute best time for key individuals to get involved:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400 font-mono text-[11px]">
              <li><strong>Interested Investors:</strong> Help back our core engineering research.</li>
              <li><strong>Potential Co-founders:</strong> We are actively talking to technical engineers specializing in secure, scalable NLP streams.</li>
              <li><strong>Early Pilot Teams:</strong> Help us pilot early builds to test specific HubSpot/Salesforce configurations.</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 mt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Structalyze Project team</p>
                <p className="text-[10px] text-neutral-500 font-mono">Founders & Builders</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('partner')}
              className="group text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Learn how to get involved
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="text-center max-w-xl mx-auto px-6">
        <h3 className="font-display font-bold text-xl text-white mb-2">Want to follow our vision development?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          We post periodic roadmap details and architectural insights to our list. Register below to stay completely informed.
        </p>
        <button
          onClick={() => onNavigate('waitlist')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white transition-all shadow-[0_4px_20px_rgba(59,130,246,0.3)] cursor-pointer"
        >
          Request Early Queue Slot
        </button>
      </section>
    </div>
  );
}
