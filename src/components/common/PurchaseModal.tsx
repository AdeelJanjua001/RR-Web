import React, { useState } from 'react';
import { Subcategory } from '../../types';
import { useStore } from '../../context/StoreContext';
import { X, CheckCircle, AlertCircle, Wallet, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PurchaseModalProps {
  product: Subcategory | null;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ product, onClose }) => {
  const { user, purchaseCard, setCurrentPage, setDashboardTab } = useStore();
  const [purchaseResult, setPurchaseResult] = useState<{ success: boolean; trx?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!product) return null;

  const hasSufficientBalance = user ? user.balance >= product.price : false;
  const postBalance = user ? (user.balance - product.price).toFixed(2) : '0.00';

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = purchaseCard(product.id);
      setIsProcessing(false);
      if (res.success) {
        setPurchaseResult({ success: true, trx: res.trx });
      }
    }, 400);
  };

  const handleGoToPurchases = () => {
    onClose();
    setCurrentPage('dashboard');
    setDashboardTab('purchases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDeposit = () => {
    onClose();
    setCurrentPage('dashboard');
    setDashboardTab('deposit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#111111] border border-[#292929] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#292929] bg-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C1121F]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {purchaseResult ? 'Purchase Complete' : 'Confirm Purchase Order'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#858585] hover:text-white hover:bg-[#171717] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!purchaseResult ? (
            <div className="space-y-6">
              
              {/* Product Info Summary */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0A0A0A] border border-[#292929]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#292929] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono text-[#858585] uppercase tracking-wider">
                    {product.category_name}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
                  <div className="text-base font-bold font-display text-white mt-1">
                    ${product.price.toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* User Balance Breakdown */}
              {user ? (
                <div className="p-4 rounded-xl bg-[#171717] border border-[#292929] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#B5B5B5]">
                    <span>Current Wallet Balance</span>
                    <span className="font-mono text-white font-semibold tabular-nums">
                      ${user.balance.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#B5B5B5]">
                    <span>Product Cost</span>
                    <span className="font-mono text-[#E01B24] font-semibold tabular-nums">
                      -${product.price.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#292929] flex items-center justify-between text-xs">
                    <span className="text-white font-medium">Balance After Purchase</span>
                    <span className={`font-mono font-bold tabular-nums ${hasSufficientBalance ? 'text-emerald-400' : 'text-[#E01B24]'}`}>
                      ${postBalance} USD
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#1F0A0D] border border-[#700000] text-center space-y-2">
                  <AlertCircle className="w-6 h-6 text-[#E01B24] mx-auto" />
                  <p className="text-xs text-[#FFDADA]">
                    You must sign in to your REDROOM account to access digital inventory.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      setCurrentPage('login');
                    }}
                    className="mt-2 py-2 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] rounded-lg"
                  >
                    Go to Login
                  </button>
                </div>
              )}

              {/* Security & Instant Delivery Guarantee */}
              <div className="flex items-center gap-2.5 text-xs text-[#858585]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Legitimate digital card assigned uniquely to your ID. Instant vault access.</span>
              </div>

              {/* Footer Actions */}
              {user && (
                <div className="pt-2">
                  {hasSufficientBalance ? (
                    <button
                      onClick={handleConfirm}
                      disabled={isProcessing}
                      className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Assigning Digital Inventory...' : `Confirm & Deduct $${product.price.toFixed(2)} USD`}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-xs text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Insufficient funds. You require ${(product.price - user.balance).toFixed(2)} more.</span>
                      </div>
                      <button
                        onClick={handleGoToDeposit}
                        className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-4 h-4" />
                        Deposit Funds via BEP20 / BTC
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            /* Purchase Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-in zoom-in-75">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold font-display text-white">Card Successfully Issued!</h4>
                <p className="text-xs text-[#858585]">
                  Reference TRX: <span className="font-mono text-white">{purchaseResult.trx}</span>
                </p>
              </div>

              <p className="text-xs text-[#B5B5B5] leading-relaxed max-w-sm mx-auto">
                Your digital card credentials (full PAN, CVV, Expiry, and activation credentials) have been assigned to your private account vault.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 text-xs font-semibold text-[#B5B5B5] hover:text-white bg-[#0A0A0A] border border-[#292929] rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleGoToPurchases}
                  className="py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  View My Card <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
