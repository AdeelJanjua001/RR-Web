import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { PurchaseModal } from '../components/common/PurchaseModal';
import { Subcategory } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  PackageX
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    categories,
    subcategories,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Subcategory | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 8;

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return subcategories
      .filter((product) => {
        // Category filter
        if (selectedCategoryId !== null && product.category_id !== selectedCategoryId) {
          return false;
        }
        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
        // Keyword search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = (product.category_name || '').toLowerCase().includes(q);
          const matchDesc = (product.description || '').toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return b.in_stock - a.in_stock;
        // Default newest
        return b.id - a.id;
      });
  }, [subcategories, selectedCategoryId, minPrice, maxPrice, searchQuery, sortBy]);

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPageNum - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPageNum]);

  const handleResetFilters = () => {
    setSelectedCategoryId(null);
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(200);
    setSortBy('newest');
    setCurrentPageNum(1);
  };

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="w-full min-h-screen bg-[#050505] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shop Header & Breadcrumbs */}
        <div className="mb-8 pb-6 border-b border-[#292929]">
          <div className="flex items-center gap-2 text-xs text-[#858585] mb-2 font-mono">
            <span>Marketplace</span>
            <span aria-hidden="true">/</span>
            <span className="text-white">Shop Catalog</span>
            {selectedCategoryObj && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#C1121F]">{selectedCategoryObj.name}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
                {selectedCategoryObj ? selectedCategoryObj.name : 'All Digital Products'}
              </h1>
              <p className="text-xs text-[#858585] mt-1">
                Displaying {filteredProducts.length} verified products with direct digital card allocation
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="md:hidden flex items-center justify-center gap-2 py-2 px-4 bg-[#111111] border border-[#292929] rounded-lg text-xs font-semibold text-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C1121F]" />
              {showMobileFilter ? 'Hide Filters' : 'Filter & Search'}
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters (3 cols) + Products Grid (9 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTER PANEL */}
          <aside className={`md:block space-y-6 ${showMobileFilter ? 'block' : 'hidden'}`}>
            
            {/* Search Input Box */}
            <div className="p-4 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center justify-between">
                <span>Keyword Search</span>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-[10px] text-[#C1121F] hover:underline">
                    Clear
                  </button>
                )}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#858585] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPageNum(1);
                  }}
                  placeholder="Card brand, limit, bank..."
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="p-4 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-white">
                  Categories
                </label>
                {selectedCategoryId !== null && (
                  <button
                    onClick={() => {
                      setSelectedCategoryId(null);
                      setCurrentPageNum(1);
                    }}
                    className="text-[10px] text-[#C1121F] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                <button
                  onClick={() => {
                    setSelectedCategoryId(null);
                    setCurrentPageNum(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategoryId === null
                      ? 'bg-[#C1121F]/15 border border-[#C1121F]/40 text-white font-medium'
                      : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[11px] text-[#858585]">{subcategories.length}</span>
                </button>

                {categories.map((cat) => {
                  const count = subcategories.filter((s) => s.category_id === cat.id).length;
                  const isSelected = selectedCategoryId === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        setCurrentPageNum(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#C1121F]/15 border border-[#C1121F]/40 text-white font-medium'
                          : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="font-mono text-[11px] text-[#858585] shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="p-4 rounded-xl bg-[#111111] border border-[#292929] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-white">Price Range (USD)</span>
                <span className="font-mono text-[#C1121F] font-bold tabular-nums">
                  ${minPrice} - ${maxPrice}
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPageNum(1);
                  }}
                  className="w-full accent-[#C1121F] bg-[#292929] h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#858585]">
                  <span>$0 USD</span>
                  <span>$75 USD</span>
                  <span>$150 USD</span>
                </div>
              </div>
            </div>

            {/* Reset All Filters Button */}
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 px-3 flex items-center justify-center gap-2 rounded-lg bg-[#0A0A0A] hover:bg-[#171717] border border-[#292929] text-xs font-semibold text-[#858585] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>

          </aside>

          {/* MAIN PRODUCT GRID & CONTROLS */}
          <main className="md:col-span-3 space-y-6">
            
            {/* Top Toolbar: Sorting & Count */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-[#292929]">
              <div className="text-xs text-[#858585]">
                Showing <span className="font-bold text-white font-mono">{paginatedProducts.length}</span> of{' '}
                <span className="font-bold text-white font-mono">{filteredProducts.length}</span> products
              </div>

              {/* Sorting Select */}
              <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
                <span className="text-[#858585] whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#0A0A0A] border border-[#292929] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C1121F] cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Stock / Popularity</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid or Empty State */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((prod) => (
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
            ) : (
              /* High-fidelity Empty State */
              <div className="py-20 px-4 text-center rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#171717] border border-[#292929] flex items-center justify-center mx-auto text-[#C1121F]">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-display text-white">No Matching Products Found</h3>
                <p className="text-xs text-[#858585] max-w-sm mx-auto leading-relaxed">
                  We couldn't find any digital cards matching your criteria. Try adjusting your search query, price range, or category filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 py-2 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg shadow-sm transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-between border-t border-[#292929]">
                <button
                  onClick={() => {
                    setCurrentPageNum((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPageNum === 1}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#111111] border border-[#292929] text-[#B5B5B5] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPageNum(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 text-xs font-mono font-semibold rounded-lg transition-colors ${
                        currentPageNum === pageNum
                          ? 'bg-[#C1121F] text-white shadow-sm'
                          : 'bg-[#111111] border border-[#292929] text-[#858585] hover:text-white hover:bg-[#171717]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPageNum((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPageNum === totalPages}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#111111] border border-[#292929] text-[#B5B5B5] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>

        </div>

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
