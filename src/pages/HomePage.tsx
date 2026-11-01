import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { PurchaseModal } from '../components/common/PurchaseModal';
import { Subcategory } from '../types';
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Headphones,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { categories, subcategories, setCurrentPage, setSelectedCategoryId, siteSettings } = useStore();
  const [selectedProductForModal, setSelectedProductForModal] = useState<Subcategory | null>(null);

  // Data slices
  const featuredCategories = categories.filter((c) => c.featured).slice(0, 6);
  const featuredProducts = subcategories.slice(0, 4);
  const popularProducts = subcategories.slice(4, 8);
  const recentProducts = subcategories.slice(8, 12);

  const handleCategoryExplore = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col bg-[#050505]">
      
      {/* SECTION 1 — CINEMATIC DARK HERO WITH LARGE BACKGROUND IMAGE */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#292929] pt-16 pb-24">
        
        {/* Large Premium Hero Background Image (Configured via siteSettings for future admin management) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={siteSettings.hero_bg_image}
            alt="REDROOM Atmospheric Background"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 scale-105 transform motion-safe:transition-transform duration-1000"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Dual Overlay Scrim for Perfect Readability & Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/75 to-[#050505]" />
          <div className="absolute inset-0 bg-radial from-[#C1121F]/15 via-transparent to-[#050505]/90" />
        </div>

        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#C1121F]/20 via-[#700000]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Marketplace Status Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#292929] text-xs text-[#B5B5B5] mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-mono tracking-wider uppercase text-[11px]">Official Digital Card Marketplace</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display uppercase tracking-tight text-white max-w-4xl leading-[1.05] drop-shadow-md text-balance">
            ENTER THE <span className="text-[#C1121F]">REDROOM</span>
          </h1>

          {/* Supporting Description */}
          <p className="mt-6 text-base sm:text-lg text-[#D4D4D4] max-w-2xl leading-relaxed text-balance drop-shadow-sm font-normal">
            {siteSettings.hero_subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg shadow-[#C1121F]/20 transition-all duration-150 flex items-center justify-center gap-2 group"
            >
              EXPLORE PRODUCTS
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#B5B5B5] hover:text-white bg-[#0A0A0A] hover:bg-[#111111] border border-[#292929] rounded-xl transition-colors duration-150 flex items-center justify-center gap-2"
            >
              BROWSE CATEGORIES
            </button>
          </div>

          {/* Key Value Strip */}
          <div className="mt-14 pt-8 border-t border-[#292929]/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-left w-full max-w-4xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C1121F] shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Instant Issuance</div>
                <div className="text-[11px] text-[#858585]">Immediate credentials</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C1121F] shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Unallocated Stock</div>
                <div className="text-[11px] text-[#858585]">1 buyer per record</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C1121F] shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Crypto Settlement</div>
                <div className="text-[11px] text-[#858585]">BEP20 & BTC supported</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C1121F] shrink-0" />
              <div>
                <div className="text-xs font-bold text-white uppercase">24/7 Client Help</div>
                <div className="text-[11px] text-[#858585]">Ticket resolution desk</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — FEATURED CATEGORIES */}
      <section className="py-20 bg-[#0A0A0A] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
                Curated Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
                Featured Categories
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentPage('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] hover:text-white transition-colors"
            >
              View All 13 Categories <ChevronRight className="w-4 h-4 text-[#C1121F]" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((cat) => {
              const count = subcategories.filter((s) => s.category_id === cat.id).length;
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  productCount={count}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3 — FEATURED PRODUCTS */}
      <section className="py-20 bg-[#050505] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
                Verified Digital Cards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] hover:text-white transition-colors"
            >
              Browse Complete Catalog <ChevronRight className="w-4 h-4 text-[#C1121F]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
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
      </section>

      {/* SECTION 4 — POPULAR PRODUCTS */}
      <section className="py-20 bg-[#0A0A0A] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
                High Demand Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
                Popular Products
              </h2>
            </div>

            <div className="text-xs text-[#858585]">
              Real-time available stock ready for dispatch
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((prod) => (
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
      </section>

      {/* SECTION 5 — RECENTLY ADDED */}
      <section className="py-20 bg-[#050505] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
                Latest Stock Allocation
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
                Recently Added
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] hover:text-white transition-colors"
            >
              Shop All Cards <ChevronRight className="w-4 h-4 text-[#C1121F]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((prod) => (
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
      </section>

      {/* SECTION 6 — WHY REDROOM? TRUST ARCHITECTURE */}
      <section className="py-24 bg-[#0A0A0A] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C1121F]">
              Marketplace Integrity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white mt-1">
              Why REDROOM?
            </h2>
            <p className="mt-3 text-sm text-[#858585] leading-relaxed">
              Engineered to eliminate friction, prevent duplicate allocation, and uphold customer discretion with verifiable records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Simple Shopping Experience</h3>
              <p className="text-xs text-[#858585] leading-relaxed">
                Add funds directly to your wallet balance. One-click checkout with automated card credential issuance without delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Secure Account Access</h3>
              <p className="text-xs text-[#858585] leading-relaxed">
                Client credentials and purchased card parameters are sealed in your private dashboard vault with strict isolation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Clear Purchase History</h3>
              <p className="text-xs text-[#858585] leading-relaxed">
                Every transaction, card activation, and blockchain deposit is recorded with full auditability and individual TRX references.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Customer Support</h3>
              <p className="text-xs text-[#858585] leading-relaxed">
                Integrated ticket desk with staff replies, attachment uploads, and priority handling for account questions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7 — CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#C1121F]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white">
            READY TO ACCESS THE DIGITAL MARKETPLACE?
          </h2>
          <p className="text-sm text-[#B5B5B5] max-w-xl mx-auto leading-relaxed">
            Join verified customers across the globe utilizing REDROOM digital cards for online shopping, streaming, and seamless financial operations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-xl transition-all"
            >
              EXPLORE ALL PRODUCTS
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#B5B5B5] hover:text-white bg-[#111111] border border-[#292929] rounded-xl transition-colors"
            >
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </section>

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
