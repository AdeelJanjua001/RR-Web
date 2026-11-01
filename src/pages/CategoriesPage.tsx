import React from 'react';
import { useStore } from '../context/StoreContext';
import { CategoryCard } from '../components/common/CategoryCard';
import { ArrowLeft, Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, subcategories, setCurrentPage, setSelectedCategoryId } = useStore();

  return (
    <div className="w-full min-h-screen bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 pb-6 border-b border-[#292929]">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-1.5 text-xs text-[#858585] hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#292929] text-[#C1121F]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
                Marketplace Categories
              </h1>
              <p className="text-xs text-[#858585] mt-1">
                Explore our full catalog of {categories.length} digital card collections and banking integrations
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = subcategories.filter((s) => s.category_id === category.id).length;
            return (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={count}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};
