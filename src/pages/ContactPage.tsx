import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, MessageSquare, Headphones, Shield, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { user, createTicket, setDashboardTab, setCurrentPage, addToast } = useStore();

  const [name, setName] = useState(user ? `${user.firstname} ${user.lastname}` : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    if (user) {
      // If user is logged in, link directly to ticket system
      createTicket(subject, 2, message);
    }

    setSubmitted(true);
    addToast('Your inquiry has been submitted to the REDROOM support team.', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#292929] text-xs text-[#B5B5B5]">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">24/7 Digital Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white">
            Contact REDROOM Desk
          </h1>
          <p className="text-xs text-[#858585] leading-relaxed">
            Have questions about digital card activation, cryptocurrency deposits, or custom orders? Reach our technical support team directly.
          </p>
        </div>

        {/* 3 Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] w-fit">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Client Ticket Desk</h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              Authenticated users can open encrypted support tickets with file attachments and live chat threads.
            </p>
            {user ? (
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setDashboardTab('tickets');
                }}
                className="text-xs text-[#C1121F] hover:underline font-semibold"
              >
                Go to Ticket Desk →
              </button>
            ) : (
              <span className="text-[11px] text-[#858585]">Available upon sign in</span>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#292929] text-emerald-400 w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Direct Email</h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              Official email dispatch for merchant inquiries and administrative communications.
            </p>
            <div className="font-mono text-xs text-white">
              support@redroom-marketplace.cc
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] w-fit">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Refund Inquiries</h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              Purchased an incompatible card? File a refund request via your customer dashboard.
            </p>
            <div className="text-[11px] text-[#858585]">
              Standard 20% platform administrative fee applies.
            </div>
          </div>
        </div>

        {/* Working Message Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-[#292929] max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
              Send an Official Inquiry
            </h2>
            <p className="text-xs text-[#858585]">
              Responses are typically delivered to your registered email or dashboard ticket within 1 hour.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase font-mono text-slate-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full bg-[#111111] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase font-mono text-slate-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full bg-[#111111] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase font-mono text-slate-300">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question about Binance CC Card limits"
                  className="w-full bg-[#111111] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase font-mono text-slate-300">
                  Detailed Message *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide all relevant details regarding your question..."
                  className="w-full bg-[#111111] border border-[#292929] rounded-xl p-3.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                SUBMIT INQUIRY <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold font-display text-white">Inquiry Received</h3>
              <p className="text-xs text-[#858585] max-w-md mx-auto leading-relaxed">
                Thank you for contacting REDROOM. Our engineering and support desk has logged your request and will communicate back shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="py-2 px-4 text-xs font-semibold text-white bg-[#171717] hover:bg-[#292929] border border-[#292929] rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
