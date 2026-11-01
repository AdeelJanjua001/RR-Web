import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminPage } from './pages/AdminPage';
import { Logo } from './components/common/Logo';
import { Wrench, Shield, Lock } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage, siteSettings, admin, impersonatingAdmin, user, exitImpersonation } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Sync hash routing e.g. #admin
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || window.location.pathname === '/admin') {
        setCurrentPage('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setCurrentPage]);

  // If in Admin Mode, show dedicated Admin application
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans antialiased selection:bg-[#C1121F] selection:text-white">
        <AdminPage />
        <ToastContainer />
      </div>
    );
  }

  // If Maintenance Mode is active and visitor is not an authenticated Admin
  if (siteSettings.maintenance_mode && !admin) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#700000]/20 via-[#050505] to-[#050505] -z-10" />
        <div className="max-w-md w-full bg-[#0A0A0A] border border-[#292929] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest font-mono">
            <Wrench className="w-3.5 h-3.5" />
            Maintenance in Progress
          </div>
          <h1 className="text-2xl font-bold font-['Oswald'] uppercase tracking-tight text-white">
            System Upgrades Underway
          </h1>
          <p className="text-xs text-[#858585] leading-relaxed">
            {siteSettings.maintenance_message || 'REDROOM is undergoing scheduled core infrastructure enhancements and ledger synchronization. Services will resume shortly.'}
          </p>

          <div className="pt-6 border-t border-[#292929] flex items-center justify-between text-xs text-[#858585]">
            <span>Status: Nodes Active</span>
            <button
              onClick={() => setCurrentPage('admin')}
              className="text-[#C1121F] hover:text-white flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-detail':
        return <ProductDetailsPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'policy':
        return <PolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans antialiased selection:bg-[#C1121F] selection:text-white">
      {/* Impersonation Session Banner */}
      {impersonatingAdmin && user && (
        <div className="sticky top-0 z-50 bg-amber-400 text-black px-4 py-2 text-xs font-bold shadow-lg flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 shrink-0" />
            <span>
              🎭 ACTING AS CUSTOMER <strong className="underline font-mono">@{user.username}</strong> (Admin Impersonation Mode) &bull; Session initiated by Admin @{impersonatingAdmin.username}
            </span>
          </div>
          <button
            onClick={exitImpersonation}
            className="px-3 py-1 bg-black text-amber-300 hover:text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Return to Admin Console
          </button>
        </div>
      )}

      {/* 3-Zone Sticky Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Real-time Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
