import React from 'react';
import { motion } from 'motion/react';
import { Brain, Database, CheckSquare, TrendingUp, ShieldCheck, Zap, ServerCrash, Share2, Compass, AlertCircle, Clock } from 'lucide-react';
import { Page, RoadmapItem } from '../types';

interface ProductProps {
  onNavigate: (route: Page) => void;
}

const ROADMAP: RoadmapItem[] = [
  {
    quarter: "Phase 1 / Q3 2026",
    title: "Primary Transcript Context Synthesizer",
    description: "Launch offline transcript drop processing of calendar feeds, supporting zoom-recording imports directly.",
    status: "in-progress"
  },
  {
    quarter: "Phase 1 / Q4 2026",
    title: "HubSpot Unified Fields Sync API",
    description: "B2B synchronization engine establishing custom variables (e.g. Budget caps, authority, competitors discussed) straight to HubSpot deals.",
    status: "planned"
  },
  {
    quarter: "Phase 2 / Q1 2027",
    title: "Proactive Deal Risk Monitor & Salesforce Integration",
    description: "Algorithmic alert systems indicating critical blockages: unexpected CFO involvement, timeline slippage, or competitive evaluations.",
    status: "planned"
  },
  {
    quarter: "Phase 2 / Q2 2027",
    title: "Custom Conversation Webhooks",
    description: "Exposing raw memory structures to internal company databases so developers can query customer pain points programmatically.",
    status: "planned"
  }
];

export default function Product({ onNavigate }: ProductProps) {
  return (
    <div id="product-page-container" className="pt-24 space-y-24 pb-20">
      {/* Page Header */}
      <section className="relative px-6 max-w-7xl mx-auto text-center space-y-4 pt-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">Memory Architecture Specs</span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight max-w-3xl mx-auto">
          Deeply organized client insights. <br />
          <span className="text-neutral-500">Zero pipeline friction.</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
          Exploring the structural intelligence that powers Structalyze. A custom sales context stack engineered for relationship memory accuracy instead of database enterprise bloat.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('waitlist')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
          >
            Join Early Pilot Batch
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white rounded-full border border-white/10 transition-colors cursor-pointer"
          >
            Request Pilot Specs
          </button>
        </div>
      </section>

      {/* Primary Technical Modules Sections */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Memory Layer 1: Speech to Semantic Fields */}
        <div className="space-y-6 text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="font-display font-semibold text-2xl text-white leading-tight">
            Meeting Intelligence & <br />Variable Extraction
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Standard transcribers output flat blocks of raw texts that sales representatives never read. Structalyze uses custom translation parsers to break transcripts open.
          </p>
          <ul className="space-y-3 font-mono text-[11px] text-neutral-300">
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-bold shrink-0">&raquo;</span>
              <span><strong>Speaker Disambiguation:</strong> Isolates buyer requirements from seller pitches instantly.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-bold shrink-0">&raquo;</span>
              <span><strong>Variable Structuring:</strong> Maps words matching budgeting, competitors, or timelines into strict key-value pairs.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-bold shrink-0">&raquo;</span>
              <span><strong>Signal Filtering:</strong> Dumps filler words to focus exclusively on action-oriented data.</span>
            </li>
          </ul>
        </div>

        {/* Visual Mock 1: Extracted Stakeholder Map */}
        <div className="bg-[#111113] p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              SIMULATED RELATIONSHIP MAP
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono">STAKEHOLDER MATRIX</span>
          </div>

          <div className="space-y-3.5 text-left flex-1 justify-center flex flex-col">
            <div className="p-3 bg-white/2 border border-blue-500/20 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-white">David Miller (VP Operations)</h4>
                <p className="text-[9px] text-neutral-400 font-mono">Evaluation Sponsor | Status: Supportive</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/5 text-blue-400 border border-blue-500/10 text-[9px] font-mono">Primary Champion</span>
            </div>

            <div className="p-3 bg-white/1 border border-red-500/20 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-white">Jessica Vance (Chief Financial Officer)</h4>
                <p className="text-[9px] text-neutral-400 font-mono">Signing Authority | Needs SOC2 confirmation</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-500/5 text-red-400 border border-red-500/10 text-[9px] font-mono">Sign-off Gatekeeper</span>
            </div>

            <div className="p-3 bg-white/1 border border-neutral-700 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-neutral-500 line-through">Thomas Cole (SDR Manager)</h4>
                <p className="text-[9px] text-neutral-500 font-mono">No veto power | Excluded from current scope</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-neutral-500">Observer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CRM memory block */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t border-b border-white/5 py-16">
        {/* Visual Mock 2: API updating logs */}
        <div className="bg-[#09090b] p-5 rounded-xl border border-white/5 font-mono text-[10px] text-left space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              crm-sync-daemon.log
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">PORT 3000 Active</span>
          </div>
          <div className="space-y-1.5 text-neutral-400 leading-relaxed overflow-y-auto max-h-48">
            <p className="text-neutral-500">[2026-05-21T14:12] Initializing API broker connection...</p>
            <p className="text-blue-400">[2026-05-21T14:12] CRM schema match successful: 8 key properties found.</p>
            <p className="text-emerald-400">[2026-05-21T14:13] HubSpot Deal #49339 updated. Properties assigned: </p>
            <span className="block pl-4 text-[9px] text-neutral-500">&raquo; cfo_approval_required: true</span>
            <span className="block pl-4 text-[9px] text-neutral-500">&raquo; competitors_mentioned: ["Salesforce", "Attio"]</span>
            <span className="block pl-4 text-[9px] text-neutral-500">&raquo; price_threshold: 28000</span>
            <p className="text-emerald-400">[2026-05-21T14:13] Broadcast success. Pipeline refreshed.</p>
          </div>
        </div>

        {/* Memory Layer 2: CRM Synchronization */}
        <div className="space-y-6 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="font-display font-semibold text-2xl text-white leading-tight">
            CRM Memory Layer & <br />Context Archival
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Sales teams shouldn&apos;t need to write manual logs. Structalyze automatically injects extracted relationship parameters straightforwardly to the appropriate card inside Salesforce or HubSpot.
          </p>
          <ul className="space-y-3 font-mono text-[11px] text-neutral-300">
            <li className="flex gap-2 items-start">
              <span className="text-emerald-400 font-bold shrink-0">&raquo;</span>
              <span><strong>Absolute Sync Integrity:</strong> Safeguarding old notes while appending real-time, time-stamped call updates.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-emerald-400 font-bold shrink-0">&raquo;</span>
              <span><strong>Properties Matching Architect:</strong> Adapts and writes custom values without bloating standard fields.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-emerald-400 font-bold shrink-0">&raquo;</span>
              <span><strong>No Log Clutter:</strong> Preserving tidy visual CRM dashboards with crisp bulleted memory.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Other capabilities sections */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Action Items */}
        <div className="p-6 rounded-2xl bg-white/2 border border-white/5 text-left space-y-4">
          <CheckSquare className="w-7 h-7 text-blue-400" />
          <h4 className="font-display font-semibold text-base text-white">Action Items and Deadlines</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            We process conversation agreements to track tasks clearly, assigning dates automatically based on verbal commitments (e.g., &quot;back to you by Thursday afternoon&quot;).
          </p>
        </div>

        {/* Card 2: Deal Risk */}
        <div className="p-6 rounded-2xl bg-white/2 border border-white/5 text-left space-y-4">
          <AlertCircle className="w-7 h-7 text-red-400" />
          <h4 className="font-display font-semibold text-base text-white">Advanced Deal Risk Spot</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Instant recognition of purchase barriers: budget cap friction, competitor evaluations, key stakeholder attrition, or missing compliance certifications.
          </p>
        </div>

        {/* Card 3: Mail Drafts */}
        <div className="p-6 rounded-2xl bg-white/2 border border-white/5 text-left space-y-4">
          <Zap className="w-7 h-7 text-indigo-400" />
          <h4 className="font-display font-semibold text-base text-white">Automated Mail Polishing</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Rather than editing draft follow-ups for hours, our system structures complete, beautifully organized client emails echoing agreement points.
          </p>
        </div>
      </section>

      {/* Integration Vision & Future Roadmaps */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <Share2 className="w-8 h-8 text-neutral-500 mx-auto" />
          <h2 className="font-display font-medium text-3xl text-white tracking-tight">Structured Growth Roadmap</h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Our strategic development path to transition from a highly focused private rollout into the industry&apos;s leading lightweight SaaS CRM memory layer.
          </p>
        </div>

        {/* Vertical Roadmap Timeline */}
        <div className="relative border-l border-white/10 md:pl-8 space-y-8 text-left max-w-2xl mx-auto pl-4">
          {ROADMAP.map((item, i) => (
            <div key={i} className="relative">
              {/* Dot indicator */}
              <div className={`absolute -left-[21px] md:-left-[37px] top-1.5 w-3 h-3 rounded-full border ${
                item.status === 'in-progress'
                  ? 'bg-blue-500 border-blue-400 animate-pulse'
                  : 'bg-neutral-900 border-white/20'
              }`}></div>

              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider uppercase">{item.quarter}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-medium uppercase ${
                    item.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {item.status === 'in-progress' ? 'Active Prototyping' : 'Planned Specification'}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lower CTA */}
      <section className="bg-gradient-to-b from-transparent to-[#050505] text-center max-w-xl mx-auto px-6 pt-12">
        <div className="p-8 rounded-full bg-blue-500/5 blur-3xl absolute pointer-events-none"></div>
        <h3 className="font-display font-bold text-xl text-white mb-3">Want to shape this technical design?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          Whether you represent an interested venture fund, or are an engineer hoping to solve sales CRM friction as a potential co-founder, let&apos;s start a tech dialogue.
        </p>
        <button
          onClick={() => onNavigate('partner')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
        >
          View Partnership Criteria
        </button>
      </section>
    </div>
  );
}
