import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { PurchaseModal } from '../components/common/PurchaseModal';
import { Subcategory } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Lock,
  Wallet,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    selectedProductId,
    subcategories,
    categories,
    user,
    setCurrentPage,
    setSelectedCategoryId
  } = useStore();

  const [selectedProductForModal, setSelectedProductForModal] = useState<Subcategory | null>(null);
  const [imgError, setImgError] = useState(false);

  // Find target product or fallback
  const product = subcategories.find((p) => p.id === selectedProductId) || subcategories[0];
  const category = categories.find((c) => c.id === product.category_id);
  const relatedProducts = subcategories
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const hasSufficientBalance = user ? user.balance >= product.price : false;

  return (
    <div className="w-full min-h-screen bg-[#050505] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-[#858585] font-mono">
          <button
            onClick={() => setCurrentPage('shop')}
            className="hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
          </button>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <button
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setCurrentPage('shop');
                }}
                className="hover:text-white transition-colors"
              >
                {category.name}
              </button>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </div>

        {/* CONTIGUOUS PURCHASE MODULE (PDP) — Sticky Gallery Left, Sticky Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#292929]">
          
          {/* Left Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl bg-[#0A0A0A] border border-[#292929] overflow-hidden flex items-center justify-center p-8 shadow-2xl">
              <div className="absolute inset-0 bg-radial from-[#C1121F]/15 via-transparent to-transparent pointer-events-none" />
              
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-[#292929]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#858585]">
                  <CreditCard className="w-20 h-20 text-[#C1121F] mb-3" />
                  <span className="text-xs font-mono">REDROOM Certified Card</span>
                </div>
              )}

              {/* Verified Digital Seal */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#050505]/90 border border-[#292929] text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Stock</span>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#292929] flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#C1121F] shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-white">Instant Fulfillment</div>
                  <div className="text-[11px] text-[#858585]">Available in seconds</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#292929] flex items-center gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-white">Isolated Vault</div>
                  <div className="text-[11px] text-[#858585]">Single-buyer allocation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category / Subcategory Tag (Zero-pill text) */}
              <div className="flex items-center gap-2 text-xs text-[#858585] font-mono">
                <span className="text-[#C1121F] uppercase font-semibold">
                  {category?.name || 'Verified Digital Card'}
                </span>
                <span aria-hidden="true">·</span>
                <span>ID: #{product.id}</span>
                <span aria-hidden="true">·</span>
                <span>Stock: {product.in_stock} Units</span>
              </div>

              {/* Product Headline */}
              <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-[#111111] border border-[#292929] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#858585] uppercase tracking-wider block">
                    Fixed Digital Price
                  </span>
                  <div className="text-3xl font-bold font-display tracking-tight text-white tabular-nums">
                    ${product.price.toFixed(2)}{' '}
                    <span className="text-xs font-sans font-normal text-[#858585]">USD</span>
                  </div>
                </div>

                {product.limit && (
                  <div className="text-right">
                    <span className="text-xs text-[#858585] uppercase tracking-wider block">
                      Spending Tier
                    </span>
                    <span className="text-xs font-mono font-semibold text-white">
                      {product.limit}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Product Overview
                </h3>
                <p className="text-sm text-[#B5B5B5] leading-relaxed">
                  {product.description ||
                    'High quality digital payment solution pre-configured with complete CVV, expiration date, and billing address matching for instant authorization on merchant checkouts.'}
                </p>
              </div>

              {/* Features Checklist */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Included Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#B5B5B5]">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C1121F] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Action Box */}
            <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#292929] space-y-4">
              
              {/* User Balance State */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#292929]">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#C1121F]" />
                  <span className="text-[#858585]">Your Wallet Balance:</span>
                </div>
                {user ? (
                  <span className="font-mono font-bold text-white tabular-nums">
                    ${user.balance.toFixed(2)} USD
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">Not logged in</span>
                )}
              </div>

              {/* Purchase Button */}
              {product.in_stock > 0 ? (
                <button
                  onClick={() => setSelectedProductForModal(product)}
                  className="w-full py-4 px-6 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg shadow-[#C1121F]/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  PURCHASE DIGITAL CARD (${product.price.toFixed(2)} USD)
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-6 text-xs font-bold uppercase tracking-widest text-[#858585] bg-[#171717] border border-[#292929] rounded-xl cursor-not-allowed"
                >
                  CURRENTLY OUT OF STOCK
                </button>
              )}

              <div className="flex items-center justify-between text-[11px] text-[#858585] font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C1121F]" /> Instant digital delivery
                </span>
                <span>Protected by REDROOM Protocol</span>
              </div>
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
                  Alternative Selections
                </span>
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mt-1">
                  Related Products
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onDirectPurchase={(id) => {
                    const p = subcategories.find((item) => item.id === id);
                    if (p) setSelectedProductForModal(p);
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Purchase Modal */}
      {selectedProductForModal && (
        <PurchaseModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}
    </div>
  );
};
