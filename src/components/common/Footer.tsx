import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import { ShieldCheck, Lock, Zap, ArrowUpRight, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryId, setDashboardTab } = useStore();

  const handleCategoryClick = (catId: number) => {
    setSelectedCategoryId(catId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-[#292929] pt-16 pb-12 text-[#B5B5B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#292929]">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0A0A0A] border border-[#292929]/70">
            <div className="p-2.5 rounded-lg bg-[#111111] text-[#C1121F] border border-[#292929]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Instant Automated Delivery</h4>
              <p className="text-xs text-[#858585] mt-1 leading-relaxed">
                Legitimate digital card credentials generated and delivered directly to your private customer vault immediately upon checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0A0A0A] border border-[#292929]/70">
            <div className="p-2.5 rounded-lg bg-[#111111] text-emerald-400 border border-[#292929]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Decentralized Crypto Settlement</h4>
              <p className="text-xs text-[#858585] mt-1 leading-relaxed">
                Direct on-chain wallet verification via Binance Smart Chain BEP20 and Bitcoin network. Full transaction proof auditing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0A0A0A] border border-[#292929]/70">
            <div className="p-2.5 rounded-lg bg-[#111111] text-[#C1121F] border border-[#292929]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Guaranteed Unallocated Inventory</h4>
              <p className="text-xs text-[#858585] mt-1 leading-relaxed">
                Each card record in our database is assigned exclusively to one authenticated buyer with zero duplicate allocation.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#292929]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" onClick={() => handleNav('home')} />
            <p className="text-xs text-[#858585] leading-relaxed max-w-sm mt-3">
              REDROOM is an international digital marketplace offering verified virtual cards, prepaid bank cards, and secure online payment solutions. Engineered for simplicity, speed, and discretion.
            </p>
          </div>

          {/* Marketplace Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Marketplace</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-white transition-colors">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick(4)} className="hover:text-white transition-colors">
                  Online Purchasing Cards
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick(5)} className="hover:text-white transition-colors">
                  PayPal Withdrawal Cards
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick(12)} className="hover:text-white transition-colors">
                  Crypto Platform Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Area */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Client Portal</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { handleNav('dashboard'); setDashboardTab('overview'); }} className="hover:text-white transition-colors">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('dashboard'); setDashboardTab('purchases'); }} className="hover:text-white transition-colors">
                  My Purchased Cards
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('dashboard'); setDashboardTab('deposit'); }} className="hover:text-white transition-colors">
                  Deposit Funds
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('dashboard'); setDashboardTab('tickets'); }} className="hover:text-white transition-colors">
                  Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('dashboard'); setDashboardTab('refunds'); }} className="hover:text-white transition-colors">
                  Refund Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Legal & Info</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About REDROOM
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policy')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policy')} className="hover:text-white transition-colors">
                  Refund Policy (20% Handling)
                </button>
              </li>
              <li className="pt-2">
                <button onClick={() => handleNav('admin')} className="text-[#858585] hover:text-[#C1121F] transition-colors flex items-center gap-1 font-mono text-[11px]">
                  <span>&bull; Administrator Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858585]">
          <div>
            © {new Date().getFullYear()} REDROOM. All rights reserved. Registered Digital Card Marketplace.
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Settlement Nodes Active
            </span>
            <span>BEP20 · BTC · USDT Supported</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
