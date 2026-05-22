import React, { useState } from 'react';
import { Page } from '../types';
import { Mail, CheckCircle, Loader2, ArrowRight, Activity, Globe, Send } from 'lucide-react';

interface ContactProps {
  onNavigate: (route: Page) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrMessage('');
    
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Server rejected contact delivery request.');
        }
        return data;
      })
      .then(() => {
        const submission = {
          name,
          email,
          subject,
          message,
          timestamp: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('structalyze_contact') || '[]');
        existing.push(submission);
        localStorage.setItem('structalyze_contact', JSON.stringify(existing));

        setName('');
        setEmail('');
        setMessage('');
        setStatus('success');
      })
      .catch((err: any) => {
        console.error('[Contact Submit Error]', err);
        setStatus('error');
        setErrMessage(err.message || 'Transmission failed. Verify server is online.');
      });
  };

  return (
    <div id="contact-page-container" className="pt-24 min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden pb-16">
      {/* Background glow shadow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-900/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 relative z-10 items-start pt-12">
        
        {/* Left Column: Context Info */}
        <div className="md:col-span-5 text-left space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#60a5fa] font-mono font-bold">Inquiry Desk</span>
            <h1 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Let&apos;s start a <br/>
              <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">technical dialogue.</span>
            </h1>
            <p className="text-neutral-400 text-xs leading-relaxed">
              We separate general interest from investment or engineering inquiries. Select a topic to connect with the project core directly.
            </p>
          </div>

          <div className="space-y-4 font-mono text-[11px] text-neutral-400">
            <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl">
              <span className="text-blue-400 font-bold block mb-1">VENTURE CAPITAL & JOINT INITIATIVES</span>
              <p>For research funds, seed inquiries, or co-founders looking to align engineering resources. Use topic selection inside the desk.</p>
            </div>
            
            <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl">
              <span className="text-emerald-400 font-bold block mb-1">PRODUCT PILOTS & SANDBOX RUNS</span>
              <p>If you want to review custom schema designs or check beta integration specifications under HubSpot API environments.</p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-xs text-neutral-500">
            <p className="font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-neutral-500" />
              direct-ops@structalyze.com
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7 bg-[#111113]/95 border border-white/10 rounded-2xl p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Inquiry Lodged Correctly</h3>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Thank you for your submission. Your technical inquiry has been archived in our local communication logs. We will reach back shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Lin"
                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Professional Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@corp.com"
                    className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Primary Topic</label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                >
                  <option value="general">General Vision Inquiry</option>
                  <option value="investor">Venture Capital / Investment Desk</option>
                  <option value="tech-engineering">Co-founder / Tech Engineering Candidate</option>
                  <option value="early-pilot">Custom Beta Integration Pilot</option>
                  <option value="other">Other Business Development</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Inquiry details</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about yourself and why you are interested in backing, joining, or piloting Structalyze..."
                  className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              {status === 'error' && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                  <span>⚠️ {errMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group py-3 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    Transmit Secure Inquiry
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        
      </div>
    </div>
  );
}
