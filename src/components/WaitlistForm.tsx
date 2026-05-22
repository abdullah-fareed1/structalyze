import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle, ArrowRight, Loader2, AlertCircle, Shield } from 'lucide-react';
import { WaitlistEntry } from '../types';

interface WaitlistFormProps {
  compact?: boolean;
  onSuccess?: (entry: WaitlistEntry) => void;
  ctaText?: string;
  sourceContext?: string;
}

export default function WaitlistForm({ compact = false, onSuccess, ctaText = "Request Early Access", sourceContext }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'sales-leader' | 'ic-sales' | 'founder' | 'investor' | 'cofounder-candidate' | 'other'>('sales-leader');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [queueNumber, setQueueNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address format.');
      return;
    }

    setStatus('loading');

    // Live Server Submission with fallback integration
    fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        role,
        company: company || undefined,
        useCase: useCase || undefined,
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server rejected registration request.');
      }
      return data;
    })
    .then(() => {
      const entry: WaitlistEntry = {
        email,
        role,
        company: company || undefined,
        useCase: useCase || undefined,
        timestamp: new Date().toISOString(),
      };

      // Persist to local storage helper list for redundancy
      const existingEntries: WaitlistEntry[] = JSON.parse(localStorage.getItem('structalyze_waitlist') || '[]');
      
      const emailExists = existingEntries.some(e => e.email.toLowerCase() === email.toLowerCase());
      if (!emailExists) {
        existingEntries.push(entry);
        localStorage.setItem('structalyze_waitlist', JSON.stringify(existingEntries));
      }

      // Generate queue placement
      const currentQueue = Math.floor(Math.random() * 85) + 342 + existingEntries.length;
      setQueueNumber(currentQueue);
      
      setStatus('success');
      if (onSuccess) onSuccess(entry);
    })
    .catch((err: any) => {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
      console.error(err);
    });
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-10 rounded-2xl bg-neutral-900/60 border border-emerald-500/30 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        
        <h3 className="font-display font-bold text-2xl text-white mb-2">You are officially in queue!</h3>
        <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
          Thank you for joining the Structalyze private memory beta. Your early support helps shape the future of sales context intelligence.
        </p>

        <div className="inline-flex flex-col items-center gap-1.5 px-6 py-3.5 bg-neutral-900 border border-white/10 rounded-xl mb-4">
          <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Your Active Queue Position</span>
          <span className="text-3xl font-mono font-bold text-white tracking-tight">#{queueNumber}</span>
          <span className="text-[11px] text-blue-400 font-medium">Spot saved under {email}</span>
        </div>

        <p className="text-[11px] text-neutral-400">
          Our private pilot features are rolling out in batches. An invitation link will be sent to your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full h-full max-w-lg mx-auto">
      {/* Email input field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email-input" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Professional Email Address
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          disabled={status === 'loading'}
          placeholder="e.g. you@yourcompany.com"
          className="w-full bg-[#09090b] border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
          required
        />
      </div>

      {!compact && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1"
        >
          {/* Role selector to filter potential cofounders / investors / customers! */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="role-select" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Who are you?
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              disabled={status === 'loading'}
              className="w-full bg-[#09090b] border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="sales-leader">VP of Sales / BizDev Leader</option>
              <option value="ic-sales">Sales Representative / AE / SDR</option>
              <option value="founder">Startup Founder / Entrepreneur</option>
              <option value="investor">Angel Investor / Venture Capitalist</option>
              <option value="cofounder-candidate">Potential Co-founder (Tech / Eng)</option>
              <option value="other">Industry Enthusiast / Developer</option>
            </select>
          </div>

          {/* Company field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="company-input" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Company (Optional)
            </label>
            <input
              id="company-input"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={status === 'loading'}
              placeholder="e.g. Acme Corp"
              className="w-full bg-[#09090b] border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
            />
          </div>
        </motion.div>
      )}

      {!compact && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="use-case-textarea" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            What CRM pain points are you hoping we solve?
          </label>
          <textarea
            id="use-case-textarea"
            rows={2}
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            disabled={status === 'loading'}
            placeholder="e.g. sales reps forget to log notes, follow ups take 3 hours, context lost..."
            className="w-full bg-[#09090b] border border-white/10 hover:border-white/20 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
        </div>
      )}

      {/* Error state display */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submission CTA Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl cursor-pointer hover:bg-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] disabled:opacity-75 disabled:cursor-not-allowed transition-all overflow-hidden mt-2"
      >
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Securing Queue Spot...
            </>
          ) : (
            <>
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      <p className="text-[10px] text-neutral-500 text-center mt-1 flex items-center justify-center gap-1">
        <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span>Structalyze is serious about data protection. We will never sell your email or spam you. Early access is strictly regulated.</span>
      </p>
    </form>
  );
}
