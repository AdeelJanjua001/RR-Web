import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, FileText, RotateCcw, Cookie, ArrowLeft } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'cookie'>('privacy');

  return (
    <div className="w-full min-h-screen bg-[#050505] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-1.5 text-xs text-[#858585] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#111111] border border-[#292929] rounded-xl">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#C1121F] text-white shadow-md'
                : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-[#C1121F] text-white shadow-md'
                : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
            }`}
          >
            <FileText className="w-4 h-4" /> Terms of Service
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'refund'
                ? 'bg-[#C1121F] text-white shadow-md'
                : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
            }`}
          >
            <RotateCcw className="w-4 h-4" /> Refund Policy
          </button>

          <button
            onClick={() => setActiveTab('cookie')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cookie'
                ? 'bg-[#C1121F] text-white shadow-md'
                : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
            }`}
          >
            <Cookie className="w-4 h-4" /> Cookie Policy
          </button>
        </div>

        {/* Content Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-[#292929] text-[#B5B5B5] text-xs sm:text-sm leading-relaxed space-y-6">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
                REDROOM Privacy Policy
              </h1>
              <p>
                This Privacy Policy describes how REDROOM collects, uses, and safeguards information in connection with your access to our digital card marketplace.
              </p>
              
              <h3 className="text-base font-semibold text-white pt-2">1. Information We Collect</h3>
              <p>
                We collect personal information you voluntarily provide during registration (such as username, contact information, and account settings) and non-personal diagnostic telemetry to ensure optimal platform routing and transaction validation.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">2. Single-Owner Vault Privacy</h3>
              <p>
                When you purchase a digital card product, the secret credentials, PAN, CVV, and billing details are encrypted and bound exclusively to your user ID. REDROOM maintains zero-knowledge data isolation, meaning customer purchase parameters are never accessible to other clients.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">3. Cryptocurrency Ledger Integrity</h3>
              <p>
                Deposits made through Binance Smart Chain (BEP20) or Bitcoin (BTC) networks are verified against transparent on-chain transaction hashes. We do not store private keys or custodial financial credentials.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">4. Data Retention & Discretion</h3>
              <p>
                We retain transaction and ticket records only for the duration necessary to satisfy account servicing, dispute auditing, and anti-abuse verification.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
                Terms of Service
              </h1>
              <p>
                By creating an account or transacting on REDROOM, you agree to comply with all terms set forth below.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">1. Eligibility & Legitimate Use</h3>
              <p>
                All digital cards, prepaid accounts, and virtual solutions sold on REDROOM must be used strictly for lawful commercial purposes, valid checkout billing, online subscriptions, and verified testing. Any fraudulent chargeback attempts or abusive activity will result in immediate termination of the offending account.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">2. Digital Product Fulfillment</h3>
              <p>
                All digital inventory orders are fulfilled instantaneously into your private client vault upon successful deduction from your account balance.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">3. Wallet Balances & Deposits</h3>
              <p>
                Deposit amounts are credited following confirmation by our automated blockchain prober nodes. Users are responsible for supplying exact amounts and correct network parameters (BEP20 / BTC).
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
                Refund & Exchange Policy
              </h1>
              <p>
                We stand behind the quality and legitimacy of our digital marketplace catalog. If an issued card experiences a technical decline on a verified compatible portal:
              </p>

              <h3 className="text-base font-semibold text-white pt-2">1. 20% Administrative Handling Fee</h3>
              <p>
                In accordance with official REDROOM marketplace terms, verified refunds are credited back to your account wallet balance minus a standard 20% administrative and network processing fee.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">2. Submission Window</h3>
              <p>
                Refund reviews must be initiated within 48 hours of purchase through the "Refund Requests" tab in your customer dashboard, accompanied by clear transaction proof or decline logs.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">3. Exclusions</h3>
              <p>
                Refunds cannot be issued for cards that have already successfully authorized checkout transactions or where incorrect merchant criteria outside the card specifications were targeted.
              </p>
            </div>
          )}

          {activeTab === 'cookie' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold font-display uppercase tracking-wide text-white">
                Cookie Policy
              </h1>
              <p>
                REDROOM uses essential session cookies and local storage tokens solely to maintain your authentication state, shopping cart session, and security preferences. We do not employ third-party advertising trackers.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
