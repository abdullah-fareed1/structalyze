import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brain, Sparkles, TrendingUp, Zap, CheckSquare, Shield, HelpCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Page, FAQItem } from '../types';
import InteractiveExtractor from '../components/InteractiveExtractor';
import WaitlistForm from '../components/WaitlistForm';

interface HomeProps {
  onNavigate: (route: Page) => void;
}

const FAQS: FAQItem[] = [
  {
    id: 'privacy',
    question: 'How does Structalyze protect our sensitive customer and sales conversations?',
    answer: 'We treat conversation memory as cryptographic. Before processing, data is fully sanitized to strip credit cards, API keys, and highly confidential codes. We operate purely on SOC2 Type II compliant storage pipelines and do not train foundational models on your raw client transcripts.'
  },
  {
    id: 'not-another-notetaker',
    question: 'Is this just another transcript bot that enters our calls?',
    answer: 'No. Traditional bots just drop a text file into your drive. Structalyze operates as an active contextual memory layer. We don’t just transcribe; we synthesize structural deal variables: stakeholder matrices, purchase limits, competitors discussed, and technical dependencies, syncing them directly to your CRM API fields.'
  },
  {
    id: 'integrations',
    question: 'Which CRMs and video systems do you plan to support?',
    answer: 'Our roadmap is prioritized for Zoom, Google Meet, and Microsoft Teams on the input layer, with direct api integrations for HubSpot, Salesforce, and Attio. Custom API webhooks are planned for early mid-market pilot customers.'
  },
  {
    id: 'preview-access',
    question: 'Can we pilot the software right now?',
    answer: 'We are currently in a private preview stage with selected early adopters. By joining the waiting list, you will be reviewed for access to our sandbox environment, early-adopter pricing, and a personal onboarding session during our current cohort.'
  }
];

export default function Home({ onNavigate }: HomeProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <div id="home-page-container" className="pt-24 space-y-24 md:space-y-36">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Visual Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-semibold text-blue-300 font-mono tracking-wider uppercase">Private Preview Phase</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight max-w-4xl leading-[1.08] mb-6"
        >
          Meetings disappear. <br />
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Your CRM should remember everything.
          </span>
        </motion.h1>

        {/* Value Proposition Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          Structalyze is an intelligent <strong className="text-white font-medium">AI Meeting and CRM Memory Layer</strong>. It processes sales conversations, extracts key relationship variables, and auto-populates CRM systems. No manual data entry. No lost deal context.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-16"
        >
          <button
            onClick={() => onNavigate('waitlist')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Request Private Pilot Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => onNavigate('product')}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            Explore Product Intelligence
          </button>
        </motion.div>

        {/* Decorative divider gradient */}
        <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0"></div>
      </section>

      {/* Structured Problem Section */}
      <section className="max-w-4xl mx-auto px-6 py-4 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#60a5fa] font-mono font-bold flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          The Sales Friction Problem
        </span>
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          CRMs only work when reps enter data. <br />
          <span className="text-neutral-500 text-2xl sm:text-3xl block mt-1">Usually, they don’t have time.</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Sales development reps and account executives spend up to 40% of their work week writing call recaps, drafting follow-up emails, and manually modifying fields in sales software.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left text-xs font-mono max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 p-5 bg-zinc-900/40 border border-white/5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] uppercase font-bold tracking-wider">Context Leak</span>
            </div>
            <p className="text-neutral-450 leading-relaxed">Critical buyer variables (spending thresholds, CFO signoffs, trial dates, competitors) remain floating inside old notebooks or slack threads.</p>
          </div>
          <div className="flex flex-col gap-3 p-5 bg-zinc-900/40 border border-white/5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider">Stale Deals</span>
            </div>
            <p className="text-neutral-450 leading-relaxed">Inefficient pipeline health: CRM data goes dry, managers lose forecasting accuracy, and early customer sentiments go unrecorded.</p>
          </div>
        </div>
      </section>

      {/* Dedicated Try An Active Extract Section with actual space */}
      <section className="max-w-5xl mx-auto px-6 py-8 space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold">Prove the Vision</span>
          <h2 className="font-display font-medium text-3xl text-white tracking-tight">Try an Active Extract</h2>
          <p className="text-neutral-450 text-xs">
            See exactly how Structalyze parses raw conversation transcripts into accurate, structured CRM data points in real-time.
          </p>
        </div>
        
        <div className="relative z-10 w-full bg-zinc-950/45 border border-white/5 rounded-3xl p-1 sm:p-2 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <InteractiveExtractor />
        </div>
      </section>

      {/* How it Works & Memory flow */}
      <section className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold">Workflow Mechanics</span>
          <h2 className="font-display font-medium text-3xl text-white tracking-tight">
            How Structalyze builds automatic intelligence
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            A background translation pipeline that intercepts, parses, and commits relationship signals seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-left relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
              <span className="text-sm font-mono font-bold text-blue-400">01</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Intercept Conversation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our automated system ingests video or audio files from calls. It instantly segments speakers, structures text scripts, and prepares variables for memory compilation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-left relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
              <span className="text-sm font-mono font-bold text-blue-400">02</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Extract Core Variables</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We extract high-fidelity sales parameters: project budget figures, authority structures, trial timeline limits, sentiment friction, competitor reviews, and direct commitments.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-left relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
              <span className="text-sm font-mono font-bold text-blue-400">03</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Synchronize CRM Fields</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No human friction. The parsed variables compile cleanly and stream straight to CRM properties via secure APIs. Deals progress accurately with absolute visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid Highlighting MVP Features */}
      <section className="bg-brand-dark/50 py-16 border-t border-b border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-950/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#60a5fa] font-mono font-bold">Deep System capabilities</span>
            <h2 className="font-display font-medium text-3xl text-white tracking-tight">Structured capabilities for complex sales</h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto">
              Everything required to transform messy conversations into highly structured pipeline memory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Brain className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">AI Call Summaries</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Honest, bulleted reviews outlining conversational milestones, budget pain points, and product objections.</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckSquare className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">Automatic Action Items</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Translating vague meeting commitments into transparent, assigned tasks with estimated due dates.</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">Sentiment Alignment</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Grasping emotional undercurrents, buyer hesitation during commercial discussions, and technical agreement.</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">Draft Email Follow-ups</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Tailoring customized summary follow-ups instantly within seconds post-call, ready to be polished and sent.</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">Deal Risk Identification</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Proactive recognition of compliance barriers, budgeting gaps, competitor mentions, and stakeholder changes.</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-sm text-white">CRM Synchronization</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Ensuring contact metrics flow to dedicated CRM properties instantly, minimizing field clutter and friction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Early Waitlist Conversion Panel */}
      <section className="max-w-4xl mx-auto px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 text-center space-y-8 relative z-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest">Early Stage Cohort</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Help pave the path for Structalyze</h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We are accepting select pilot partners to shape our initial CRM integration layer. Secure your position on our private memory beta queue today.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Transparent FAQ Area */}
      <section className="max-w-3xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-7 h-7 text-neutral-500 mx-auto" />
          <h2 className="font-display font-medium text-2xl text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-neutral-400 text-xs font-mono">CRITICAL QUESTIONS DEMANDING SINCERE ANSWERS</p>
        </div>

        <div className="border-t border-white/5 divide-y divide-white/5">
          {FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="py-4.5">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-white/90 hover:text-white transition-colors py-1 cursor-pointer"
                >
                  <span className="font-display">{faq.question}</span>
                  <span className="text-blue-400 shrink-0 font-mono text-base ml-2">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden mt-2.5 text-xs text-neutral-400 leading-relaxed p-3.5 rounded-xl bg-white/2 border border-white/5"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick visual link card to cofounders/investors page */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-semibold text-sm text-white">Co-founders & Venture Capitalists</h4>
            <p className="text-xs text-neutral-400 mt-1">Interested in building or backing Structalyze? View our dedicated vision deck page.</p>
          </div>
          <button
            onClick={() => onNavigate('partner')}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Review Investment Philosophy
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
