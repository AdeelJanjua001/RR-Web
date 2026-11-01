import React from 'react';
import { useStore } from '../context/StoreContext';
import { CMS_ABOUT } from '../data/database';
import { ShieldCheck, Zap, Lock, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="w-full min-h-screen bg-[#050505] py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#292929] text-xs text-[#B5B5B5]">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">Established Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white">
            {CMS_ABOUT.heading}
          </h1>
          <p className="text-sm text-[#858585] leading-relaxed">
            Architected for security, privacy, and continuous unallocated stock availability across 13 international categories.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CMS_ABOUT.stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#111111] border border-[#292929] text-center space-y-1">
              <div className="text-3xl font-bold font-display text-white tabular-nums">{stat.value}</div>
              <div className="text-xs text-[#858585] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-[#292929] space-y-6 leading-relaxed">
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
            The REDROOM Standard
          </h2>
          <p className="text-sm text-[#B5B5B5] leading-loose">
            {CMS_ABOUT.description}
          </p>
          <p className="text-sm text-[#B5B5B5] leading-loose">
            Every transaction is recorded immutably with dedicated transaction hashes. Our non-custodial crypto deposit nodes accept Binance Smart Chain (BEP20) and Bitcoin (BTC), offering customers low-latency funding with no third-party payment intermediary lockouts.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#292929]">
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-[#111111] border border-[#292929] text-[#C1121F] w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">Zero Latency</h4>
              <p className="text-xs text-[#858585]">
                Immediate inventory assignment directly into the buyer's private vault without delays.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-[#111111] border border-[#292929] text-emerald-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">Single-Owner Isolation</h4>
              <p className="text-xs text-[#858585]">
                Strict database constraint guarantees no digital card is ever assigned to multiple clients.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-[#111111] border border-[#292929] text-[#C1121F] w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">24/7 Support</h4>
              <p className="text-xs text-[#858585]">
                In-app customer ticketing desk with fast resolution times for activation queries.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#171717] to-[#111111] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-white">
              Ready to explore our products?
            </h3>
            <p className="text-xs text-[#858585] mt-1">
              Browse our verified virtual card and prepaid bank card selection today.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl flex items-center gap-2 shrink-0 transition-all"
          >
            Go to Shop <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
