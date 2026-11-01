import React, { useState } from 'react';
import { Subcategory } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CreditCard, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Subcategory;
  onViewDetails?: (id: number) => void;
  onDirectPurchase?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onDirectPurchase
}) => {
  const { setCurrentPage, setSelectedProductId, user } = useStore();
  const [imageError, setImageError] = useState(false);

  const handleDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    } else {
      setSelectedProductId(product.id);
      setCurrentPage('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLowStock = product.in_stock > 0 && product.in_stock <= 5;
  const isOutOfStock = product.in_stock <= 0;

  return (
    <div className="group relative flex flex-col bg-[#111111] border border-[#292929] hover:border-[#C1121F]/70 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C1121F]/5">
      
      {/* Product Image Stage */}
      <div
        onClick={handleDetails}
        className="relative w-full aspect-[4/3] bg-[#0A0A0A] overflow-hidden cursor-pointer flex items-center justify-center p-6 border-b border-[#292929]"
      >
        {/* Subtle radial glow on hover */}
        <div className="absolute inset-0 bg-radial from-[#C1121F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#858585]">
            <CreditCard className="w-12 h-12 text-[#C1121F] mb-2" />
            <span className="text-xs font-mono">Digital Asset Verified</span>
          </div>
        )}

        {/* Quiet stock tag top right - unboxed or minimal indicator */}
        <div className="absolute top-3 right-3 text-[11px] font-mono tracking-tight px-2 py-0.5 rounded bg-[#050505]/85 border border-[#292929] text-white">
          {isOutOfStock ? (
            <span className="text-[#E01B24]">Out of Stock</span>
          ) : isLowStock ? (
            <span className="text-amber-400">{product.in_stock} remaining</span>
          ) : (
            <span className="text-emerald-400">In Stock ({product.in_stock})</span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 flex flex-col p-5">
        
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-[#858585] mb-2">
          <span className="uppercase tracking-wider truncate font-medium text-slate-400">
            {product.category_name || 'Verified Card'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400 font-mono text-[11px]">{product.limit || 'Instant'}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={handleDetails}
          className="text-base font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
        >
          {product.name}
        </h3>

        {/* Price and Balance Math */}
        <div className="mt-auto pt-3 border-t border-[#292929]/70 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-[#858585] block">Price</span>
            <div className="text-xl font-bold font-display tracking-tight text-white tabular-nums">
              ${product.price.toFixed(2)} <span className="text-xs font-sans font-normal text-[#858585]">USD</span>
            </div>
          </div>

          {user && (
            <div className="text-right text-[11px]">
              <span className="text-[#858585]">Status: </span>
              {user.balance >= product.price ? (
                <span className="text-emerald-400 font-medium inline-flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Ready
                </span>
              ) : (
                <span className="text-amber-400 font-medium">Add funds</span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleDetails}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#B5B5B5] hover:text-white bg-[#0A0A0A] hover:bg-[#171717] border border-[#292929] rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Details
          </button>

          <button
            onClick={() => {
              if (onDirectPurchase) {
                onDirectPurchase(product.id);
              } else {
                handleDetails();
              }
            }}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-150 ${
              isOutOfStock
                ? 'bg-[#171717] text-[#858585] border border-[#292929] cursor-not-allowed'
                : 'bg-[#C1121F] hover:bg-[#E01B24] text-white shadow-sm hover:shadow-[#C1121F]/20'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Buy
          </button>
        </div>

      </div>
    </div>
  );
};
