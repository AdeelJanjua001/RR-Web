import React, { useState } from 'react';
import { Category } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Folder } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount }) => {
  const { setCurrentPage, setSelectedCategoryId } = useStore();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    setSelectedCategoryId(category.id);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between p-6 rounded-xl bg-[#111111] border border-[#292929] hover:border-[#C1121F]/80 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C1121F]/5"
    >
      {/* Background Ambience / Subtle Image scrim */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none">
        {!imgError ? (
          <img
            src={category.image}
            alt={category.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#171717] to-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
      </div>

      {/* Top Bar: Icon and Product Count */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F] group-hover:border-[#C1121F]/40 transition-colors">
          <Folder className="w-5 h-5" />
        </div>
        <span className="text-xs font-mono text-[#858585] group-hover:text-white transition-colors">
          {productCount} {productCount === 1 ? 'Product' : 'Products'}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2 my-2">
        <h3 className="text-lg font-bold font-display tracking-wide text-white group-hover:text-red-400 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-[#858585] line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Action footer */}
      <div className="relative z-10 pt-4 mt-2 border-t border-[#292929]/50 flex items-center justify-between text-xs text-[#B5B5B5] group-hover:text-white">
        <span className="font-medium">Explore Collection</span>
        <ArrowRight className="w-4 h-4 text-[#C1121F] transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
