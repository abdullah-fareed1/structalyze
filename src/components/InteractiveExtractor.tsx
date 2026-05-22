import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  FileText, 
  Send, 
  Sparkles, 
  Database, 
  Play, 
  Terminal, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  Flame,
  FlameKindling
} from 'lucide-react';

interface BulletInsight {
  category: string;
  text: string;
  type: 'pain' | 'risk' | 'milestone' | 'authority';
}

interface SimulatedCall {
  id: string;
  title: string;
  tag: string;
  transcript: string;
  bullets: BulletInsight[];
  sentiment: string;
  crmPayload: Record<string, any>;
  draftEmail: string;
}

const SIMULATED_CALLS: SimulatedCall[] = [
  {
    id: 'retail-intro',
    title: 'Mid-Market Retail Pilot Intro',
    tag: 'Discovery Call',
    transcript: `[00:15] Sales (Sarah): "Thanks for hopping on, Mike. I wanted to understand your current CRM workflow."
[00:32] Client (Mike): "Honestly, it's a mess. We have 12 field reps in retail. They have multiple calls a day, but key details are just lost. Nobody logs notes. HubSpot looks like a ghost town. Over half our renewal follow-ups get delayed because people forgot what competitors were mentioned."
[02:10] Sales (Sarah): "That makes sense. If we ran a 14-day trial next month starting say, June 10th, would you be the sole signer?"
[02:30] Client (Mike): "No, I'd need to clear any pricing over $25k with our CFO, Jessica. Also, we are evaluating Salesforce next week, so timing is tight. I need secure SOC2 compliance info sent to Jessica as well."`,
    bullets: [
      {
        category: "CRM Friction",
        type: "pain",
        text: "Client is experiencing severe documentation friction: 12 field reps are failing to log notes, leading to 'ghost town' CRM data."
      },
      {
        category: "Deal Risk",
        type: "risk",
        text: "Renewal follow-ups are delayed and Salesforce competitor is being formally evaluated next week."
      },
      {
        category: "Pilot Timeline",
        type: "milestone",
        text: "Established buying cycle: 14-day pilot planned and scheduled to begin on June 10th."
      },
      {
        category: "Buyer Authority",
        type: "authority",
        text: "Mike is champion; pricing over $25k enters a bottleneck requiring CFO Jessica approval."
      }
    ],
    sentiment: "High technical pain (frustrated with CRM compliance), friendly interest in automation features.",
    crmPayload: {
      "deal_stage": "Discovery Complete",
      "deal_value_estimate": 32000,
      "competitors_mentioned": ["Salesforce"],
      "decision_makers": [
        { "name": "Mike", "role": "Evaluation Champion" },
        { "name": "Jessica", "role": "CFO / Economic Buyer" }
      ],
      "compliance_required": ["SOC2"],
      "pilot_scheduled": "2026-06-10"
    },
    draftEmail: `Subject: SOC2 Documentation & Next Steps - Structalyze Pilot

Hi Mike,

Great speaking with you today about the retail team's workflow. I completely understood the frustration around manual CRM data entry—your reps should be selling, not filling out forms.

Per our chat, I've attached our SOC2 security compliance pack. Could you please forward this to Jessica (CFO) for her review? 

I am locking in our calendar for the 14-day automated pilot starting June 10th. I'll send over the setup link next week ahead of your Salesforce benchmark checklist.

Best regards,
Sarah`
  },
  {
    id: 'fintech-negotiate',
    title: 'Fintech Series-A Pricing Call',
    tag: 'Negotiation',
    transcript: `[01:05] Client (David): "We have 40 agents. We love the pilot data we saw. But our budget is tightly capped. HubSpot auto-sync must work with custom custom fields."
[01:45] Sales (Sarah): "We can support custom layouts in your CRM, David. What's the threshold?"
[02:10] Client (David): "We can't do more than $200 per agent per month on this memory layer. Plus, our developers need a webhook to query conversation memory direct to our internal database."
[02:40] Sales (Sarah): "That's feasible. Let me confirm with our tech lead regarding the conversation webhook. I'll get back to you with a draft contract by Thursday afternoon."`,
    bullets: [
      {
        category: "CRM Sync pain",
        type: "pain",
        text: "SDR trial evaluates highly, but client demands custom properties sync for multi-user HubSpot compliance."
      },
      {
        category: "Deal Risk",
        type: "risk",
        text: "Hard budget ceiling of $200/seat/month ($96,000 ARR potential for 40 agent seats)."
      },
      {
        category: "Tech Milestone",
        type: "milestone",
        text: "Engineering dependency: Developers demand webhook endpoints to query conversation memory."
      },
      {
        category: "Buyer Authority",
        type: "authority",
        text: "Draft contract and pricing model expected by Thursday afternoon for David's team review."
      }
    ],
    sentiment: "Highly enthusiastic. Motivated to finalize. Expressed strong pain relief around automatic CRM updating.",
    crmPayload: {
      "deal_stage": "Proposal/Negotiation",
      "seats_requested": 40,
      "offered_seat_price": 195,
      "estimated_arr": 93600,
      "custom_webhook_required": true,
      "contract_due_date": "2026-05-28"
    },
    draftEmail: `Subject: Custom HubSpot Configs + Pilot Workspace Agreement

Hi David,

Fantastic to hear how much the agents enjoyed the Structalyze trial. Automating that memory layer is going to save each of them ~5 hours a week.

To address your requirements:
1. Pricing: I've prepared our contract at $195/agent/month for your 40 seats, matching your budget cap.
2. Webhooks: Our tech lead confirmed we can expose our memory-query endpoints to pipe structured context directly to your internal Postgres DB.

I've attached the draft agreement for your team to review. Looking forward to getting this kicked off!

Best,
Sarah`
  }
];

export default function InteractiveExtractor() {
  const [activeCall, setActiveCall] = useState<SimulatedCall>(SIMULATED_CALLS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'crm' | 'email'>('summary');

  const handleProcessCall = (call: SimulatedCall) => {
    setActiveCall(call);
    setIsProcessing(true);
    setProgress(0);
    setShowResult(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setShowResult(true);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 60);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pain':
        return <Flame className="w-4 h-4 text-red-400 shrink-0" />;
      case 'risk':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'milestone':
        return <Clock className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'authority':
        return <UserCheck className="w-4 h-4 text-teal-400 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'pain':
        return 'bg-red-500/10 text-red-400 border border-red-500/15';
      case 'risk':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/15';
      case 'milestone':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/15';
      case 'authority':
        return 'bg-teal-500/10 text-teal-400 border border-teal-500/15';
      default:
        return 'bg-neutral-500/10 text-neutral-450 border border-neutral-500/15';
    }
  };

  return (
    <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden space-y-8">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Part 1: Unstructured Transcript Input (Spacious Top Panel) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-widest font-bold">Unstructured Sales Conversation</span>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 select-none shrink-0 self-stretch sm:self-auto justify-center">
            {SIMULATED_CALLS.map((call) => (
              <button
                key={call.id}
                onClick={() => handleProcessCall(call)}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeCall.id === call.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {call.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#050507] p-5 sm:p-6 rounded-2xl border border-white/5 font-mono text-xs text-neutral-400 min-h-[180px] md:min-h-[200px] leading-relaxed relative flex flex-col justify-between shadow-inner">
          <pre className="whitespace-pre-wrap select-text pr-2 break-normal scrollbar-thin scrollbar-thumb-zinc-850 text-[11px] sm:text-xs">
            {activeCall.transcript}
          </pre>
          <div className="flex justify-end mt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-white/10 rounded-full select-none">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="text-[10px] text-neutral-450 uppercase tracking-widest font-mono font-bold">{activeCall.tag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Centered Prominent Action Divider */}
      <div className="flex flex-col items-center justify-center py-2 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <button
          onClick={() => handleProcessCall(activeCall)}
          disabled={isProcessing}
          className="relative z-10 flex items-center justify-center gap-2.5 py-4 px-8 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-500/30 transition-all cursor-pointer disabled:opacity-50 select-none active:scale-[0.98] shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
        >
          {isProcessing ? (
            <>
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              Scanning Context Memory ({progress}%)
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white fill-white/10" />
              Trigger Deep Intelligence Analysis
            </>
          )}
        </button>
      </div>

      {/* Part 3: Deep Sync Output (Expansive Bottom Panel) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <div className="w-6 h-6 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
            <Brain className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-widest font-bold">Structalyze AI Sync Layer</span>
        </div>

        <div className="relative bg-[#050507] rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[320px] shadow-inner">
          {/* Loading/Analysing Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#050507]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20"
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border border-neutral-800"></div>
                  <div className="absolute inset-0 rounded-full border border-blue-500 border-t-transparent animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
                <h4 className="font-display font-medium text-sm text-white mb-1.5">Parsing Conversation Context</h4>
                <p className="text-[10px] text-neutral-400 text-center max-w-xs leading-relaxed font-mono">
                  Extracting key triggers, compliance needs, and commercial variables...
                </p>
                <div className="w-40 bg-white/5 h-1 rounded-full mt-4 overflow-hidden border border-white/5">
                  <motion.div
                    className="bg-blue-500 h-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Output */}
          {showResult && (
            <div className="flex-1 flex flex-col h-full">
              {/* Result Tabs Selector */}
              <div className="flex bg-[#0a0a0c] border-b border-white/5 select-none">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'summary'
                      ? 'border-blue-500 text-white bg-white/[0.02]'
                      : 'border-transparent text-neutral-450 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  Deal Analysis
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'crm'
                      ? 'border-blue-500 text-white bg-white/[0.02]'
                      : 'border-transparent text-neutral-450 hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  CRM Sync Payload
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'email'
                      ? 'border-blue-500 text-white bg-white/[0.02]'
                      : 'border-transparent text-neutral-450 hover:text-white'
                  }`}
                >
                  <Send className="w-4 h-4 text-indigo-400" />
                  Draft Follow-up
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 p-6 overflow-y-auto leading-relaxed">
                {activeTab === 'summary' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                      Key Conversation Highlights
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCall.bullets.map((bullet, i) => (
                        <div 
                          key={i} 
                          className="flex gap-4 bg-[#0d0d10] hover:bg-[#111115] border border-white/5 rounded-2xl p-4 items-start transition-all duration-200"
                        >
                          <div className="mt-1 flex-shrink-0">{getInsightIcon(bullet.type)}</div>
                          <div className="space-y-1.5 text-left">
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide ${getBadgeStyles(bullet.type)}`}>
                              {bullet.category}
                            </span>
                            <p className="text-neutral-300 text-xs sm:text-[13px] font-sans leading-relaxed">
                              {bullet.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'crm' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs"
                  >
                    <div className="lg:col-span-2 bg-[#020203] p-4 text-emerald-400 hover:text-emerald-300 transition-colors rounded-2xl border border-emerald-500/10 select-text max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-850">
                      <pre className="whitespace-pre text-xs break-all leading-relaxed">
                        {JSON.stringify(activeCall.crmPayload, null, 2)}
                      </pre>
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-5 bg-[#0d0d10] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <Terminal className="w-4 h-4 shrink-0" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">System Sentiment Analysis</span>
                      </div>
                      <p className="text-neutral-300 text-xs leading-relaxed font-sans">
                        {activeCall.sentiment}
                      </p>
                      <div className="mt-2 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
                        <span>PIPELINE IMPACT</span>
                        <span className="text-emerald-400 font-bold font-mono">HIGH POTENTIAL</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'email' && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="bg-[#020203] p-5 sm:p-6 rounded-2xl border border-white/5 font-sans text-neutral-300 text-xs sm:text-sm select-text whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-850">
                      {activeCall.draftEmail}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
