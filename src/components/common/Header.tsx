import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import { Search, User as UserIcon, Wallet, Menu, X, ArrowUpRight, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    user,
    logout,
    admin,
    adminLogout,
    searchQuery,
    setSearchQuery,
    setDashboardTab
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  const handleDashboardNav = (tab: string) => {
    setCurrentPage('dashboard');
    setDashboardTab(tab);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand / Logo */}
          <div className="shrink-0 flex items-center">
            <Logo
              size="md"
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Zone 2: Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C1121F]'
                      : 'text-[#B5B5B5] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Balance / Account, CTA) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2.5 rounded-lg text-[#B5B5B5] hover:text-white bg-[#0A0A0A] hover:bg-[#111111] border border-[#292929] transition-colors"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Authenticated User state, Admin state, or Guest controls */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 py-1.5 px-3 bg-[#0A0A0A] hover:bg-[#111111] border border-[#292929] hover:border-[#C1121F]/60 rounded-lg transition-all"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="flex items-center gap-1.5 text-xs text-[#B5B5B5]">
                    <Wallet className="w-3.5 h-3.5 text-[#C1121F]" />
                    <span className="font-mono font-semibold text-white tabular-nums">
                      ${user.balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="hidden sm:block h-3.5 w-px bg-[#292929]" />
                  <span className="hidden sm:inline text-xs font-medium text-white max-w-[100px] truncate">
                    {user.username}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#111111] border border-[#292929] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#292929]">
                      <div className="text-xs text-[#858585]">Logged in as</div>
                      <div className="text-sm font-semibold text-white truncate">{user.email}</div>
                      <div className="mt-1 flex items-center justify-between text-xs pt-1">
                        <span className="text-[#858585]">Available:</span>
                        <span className="font-mono text-emerald-400 font-bold tabular-nums">
                          ${user.balance.toFixed(2)} USD
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDashboardNav('overview')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#B5B5B5] hover:text-white hover:bg-[#171717] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#C1121F]" />
                      Dashboard Overview
                    </button>
                    <button
                      onClick={() => handleDashboardNav('purchases')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#B5B5B5] hover:text-white hover:bg-[#171717] transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#C1121F]" />
                      My Purchases
                    </button>
                    <button
                      onClick={() => handleDashboardNav('deposit')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#B5B5B5] hover:text-white hover:bg-[#171717] transition-colors"
                    >
                      <Wallet className="w-4 h-4 text-emerald-400" />
                      Deposit Funds
                    </button>

                    <div className="my-1 border-t border-[#292929]" />

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#E01B24] hover:bg-[#1F0A0D] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : admin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={adminLogout}
                  className="px-2.5 py-1.5 rounded-lg border border-[#292929] text-[#858585] hover:text-white text-xs font-medium transition-colors"
                >
                  Exit Admin
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-white hover:text-red-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg shadow-sm transition-all duration-150"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#B5B5B5] hover:text-white bg-[#0A0A0A] border border-[#292929]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-b border-[#292929] px-4 pt-3 pb-6 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                    currentPage === link.id
                      ? 'bg-[#171717] text-white font-semibold'
                      : 'text-[#B5B5B5] hover:text-white hover:bg-[#111111]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {user ? (
                <div className="mt-4 pt-4 border-t border-[#292929] flex flex-col gap-2">
                  <div className="px-3 py-2 bg-[#111111] rounded-md flex items-center justify-between text-xs">
                    <span className="text-[#858585]">Balance</span>
                    <span className="font-mono text-emerald-400 font-bold tabular-nums">
                      ${user.balance.toFixed(2)} USD
                    </span>
                  </div>
                  <button
                    onClick={() => handleDashboardNav('overview')}
                    className="w-full text-left px-3 py-2 text-sm text-[#B5B5B5] hover:text-white"
                  >
                    Customer Dashboard
                  </button>
                  <button
                    onClick={() => handleDashboardNav('purchases')}
                    className="w-full text-left px-3 py-2 text-sm text-[#B5B5B5] hover:text-white"
                  >
                    My Purchased Cards
                  </button>
                  <button
                    onClick={() => handleDashboardNav('deposit')}
                    className="w-full text-left px-3 py-2 text-sm text-emerald-400 font-medium"
                  >
                    Deposit Funds
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-[#E01B24]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-[#292929] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#111111] border border-[#292929] rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] rounded-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#111111] border border-[#292929] rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-[#292929]">
              <Search className="w-5 h-5 text-[#858585] mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by bank, keyword, minimum balance (e.g. Visa, Paypal, Stanbic)..."
                className="w-full bg-transparent text-white placeholder-[#858585] text-sm focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSearchModal(false);
                    setCurrentPage('shop');
                  }
                }}
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-[#858585] hover:text-white p-1"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#0A0A0A] flex items-center justify-between text-xs text-[#858585]">
              <span>Press <strong className="text-white">Enter</strong> to open catalog with filter</span>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setCurrentPage('shop');
                }}
                className="text-[#C1121F] hover:underline font-medium inline-flex items-center gap-1"
              >
                View full shop <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
