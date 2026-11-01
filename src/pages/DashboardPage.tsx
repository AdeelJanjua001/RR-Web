import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { generateVerifiedQRCode } from '../utils/qr';
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  History,
  Headphones,
  RotateCcw,
  User as UserIcon,
  LogOut,
  ArrowUpRight,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  Send,
  Eye,
  EyeOff,
  ShieldCheck,
  CreditCard,
  Plus,
  ShieldAlert,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    user,
    logout,
    dashboardTab,
    setDashboardTab,
    userPurchasedCards,
    userDeposits,
    userTransactions,
    userTickets,
    userRefundRequests,
    allDeposits,
    approveDeposit,
    rejectDeposit,
    admin,
    adminLogin,
    adminLogout,
    setCurrentPage,
    addToast
  } = useStore();

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminUsername, setAdminUsername] = useState('Web');
  const [adminPassword, setAdminPassword] = useState('adminpassword');

  // If user is logged out, prompt login
  if (!user && !admin) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center bg-[#050505] px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111111] border border-[#292929] text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#1F0A0D] border border-[#700000] text-[#E01B24] flex items-center justify-center mx-auto">
            <UserIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Client Authentication Required
          </h2>
          <p className="text-xs text-[#858585] leading-relaxed">
            Please sign in to access your customer dashboard, view private digital inventory, or submit crypto deposits.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setCurrentPage('login')}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg shadow-sm transition-all"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] hover:text-white bg-[#0A0A0A] border border-[#292929] rounded-lg transition-colors"
            >
              Register New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active sub-view tabs
  const customerTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'purchases', label: 'My Purchases', icon: ShoppingBag, badge: userPurchasedCards.length },
    { id: 'deposit', label: 'Deposit Funds', icon: Wallet },
    { id: 'transactions', label: 'Transaction History', icon: History, badge: userTransactions.length },
    { id: 'tickets', label: 'Support Desk', icon: Headphones, badge: userTickets.length },
    { id: 'refunds', label: 'Refund Requests', icon: RotateCcw, badge: userRefundRequests.length },
    { id: 'profile', label: 'Account Profile', icon: UserIcon }
  ];

  const pendingDepositsCount = allDeposits.filter((d) => d.status === 2).length;

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(adminUsername, adminPassword);
    if (success) {
      setAdminModalOpen(false);
      setDashboardTab('admin-approvals');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top User Greeting Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#111111] via-[#0A0A0A] to-[#111111] border border-[#292929] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#050505] border border-[#292929] flex items-center justify-center text-white font-display font-bold text-xl uppercase">
              {user ? `${user.firstname[0]}${user.lastname[0]}` : 'AD'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {user ? `Welcome, ${user.firstname} ${user.lastname}` : 'Administrator Control Session'}
                </h1>
                {user ? (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Verified Customer
                  </span>
                ) : (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#C1121F]/20 border border-[#C1121F]/40 text-[#E01B24]">
                    Master Administrator
                  </span>
                )}
              </div>
              <p className="text-xs text-[#858585] mt-0.5">
                {user ? (
                  <>Username: <span className="font-mono text-white">@{user.username}</span> · Client ID: #{user.id}</>
                ) : (
                  <>Admin User: <span className="font-mono text-white">{admin?.username}</span> · Full Approval Privileges</>
                )}
              </p>
            </div>
          </div>

          {/* Quick Balance & Mode Controls */}
          <div className="flex items-center gap-6">
            {user && (
              <div className="text-right">
                <span className="text-[11px] text-[#858585] uppercase tracking-wider block">
                  Available Balance
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
                  ${user.balance.toFixed(2)}{' '}
                  <span className="text-xs font-sans font-normal text-[#858585]">USD</span>
                </div>
              </div>
            )}

            {user && (
              <button
                onClick={() => setDashboardTab('deposit')}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Wallet className="w-4 h-4" /> Deposit
              </button>
            )}

            {/* Admin Desk Access Switch */}
            {!admin ? (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3 py-2 text-xs font-semibold text-[#858585] hover:text-white bg-[#0A0A0A] hover:bg-[#171717] border border-[#292929] rounded-xl transition-colors flex items-center gap-1.5"
                title="Admin review of pending deposits"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Admin Desk
                {pendingDepositsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            ) : (
              <button
                onClick={adminLogout}
                className="px-3 py-2 text-xs font-semibold text-[#E01B24] bg-[#1F0A0D] border border-[#700000] rounded-xl hover:bg-[#2D0F13] transition-colors"
              >
                Exit Admin Mode
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Layout: Left Nav Sidebar + Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="p-2 rounded-2xl bg-[#111111] border border-[#292929] flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              
              {/* Customer navigation tabs */}
              {user && customerTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = dashboardTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#C1121F] text-white font-semibold shadow-md'
                        : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                    {typeof tab.badge !== 'undefined' && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-black/30 text-white'
                            : 'bg-[#0A0A0A] border border-[#292929] text-[#858585]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Admin Deposit Approvals Tab */}
              {admin && (
                <>
                  <div className="my-1 border-t border-[#292929] hidden lg:block" />
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-amber-400 hidden lg:block">
                    Admin Governance
                  </div>
                  <button
                    onClick={() => setDashboardTab('admin-approvals')}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                      dashboardTab === 'admin-approvals'
                        ? 'bg-amber-600 text-white font-semibold shadow-md'
                        : 'text-amber-300 hover:text-white hover:bg-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>Deposit Approvals</span>
                    </div>
                    {pendingDepositsCount > 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-black font-bold">
                        {pendingDepositsCount} Pending
                      </span>
                    )}
                  </button>
                </>
              )}

              {user && (
                <>
                  <div className="my-1 border-t border-[#292929] hidden lg:block" />
                  <button
                    onClick={logout}
                    className="hidden lg:flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium text-[#E01B24] hover:bg-[#1F0A0D] transition-colors"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Log Out</span>
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* MAIN TAB CONTENT AREA */}
          <main className="lg:col-span-9">
            {dashboardTab === 'overview' && <OverviewTab />}
            {dashboardTab === 'purchases' && <PurchasesTab />}
            {dashboardTab === 'deposit' && <DepositTab />}
            {dashboardTab === 'transactions' && <TransactionsTab />}
            {dashboardTab === 'tickets' && <TicketsTab />}
            {dashboardTab === 'refunds' && <RefundsTab />}
            {dashboardTab === 'profile' && <ProfileTab />}
            {dashboardTab === 'admin-approvals' && <AdminApprovalsTab />}
          </main>

        </div>

      </div>

      {/* Admin Login Dialog */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-[#111111] border border-[#292929] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#292929]">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Administrator Authentication
                </h3>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="text-[#858585] hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-[#858585] leading-relaxed">
              Log in to the official administrator account (<code className="text-white">Web</code> / <code className="text-white">supportteam@germanmarket</code>) to review customer deposit proof and approve balance credits.
            </p>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#858585]">Admin Username or Email</label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Web or supportteam@germanmarket"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#858585]">Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all"
              >
                Sign In as Admin
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 1: OVERVIEW (STRICT USER ISOLATION)
   ========================================================================= */
const OverviewTab: React.FC = () => {
  const { user, userPurchasedCards, userTransactions, setDashboardTab, setCurrentPage } = useStore();

  const recentPurchases = userPurchasedCards.slice(0, 3);
  const recentTransactions = userTransactions.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#292929] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#858585]">
            <span className="uppercase tracking-wider">Account Balance</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white tabular-nums">
            ${user?.balance.toFixed(2)} USD
          </div>
          <div className="text-[11px] text-[#858585]">Approved balance ready for use</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#292929] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#858585]">
            <span className="uppercase tracking-wider">My Cards In Vault</span>
            <ShoppingBag className="w-4 h-4 text-[#C1121F]" />
          </div>
          <div className="text-2xl font-bold font-display text-white tabular-nums">
            {userPurchasedCards.length}
          </div>
          <div className="text-[11px] text-[#858585]">Private unallocated credentials</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#292929] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#858585]">
            <span className="uppercase tracking-wider">My Transactions</span>
            <History className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white tabular-nums">
            {userTransactions.length}
          </div>
          <div className="text-[11px] text-[#858585]">Personal transaction records</div>
        </div>

      </div>

      {/* Quick Actions Row */}
      <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#292929] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-white">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#111111] border border-[#292929] text-white hover:border-[#C1121F] transition-colors"
          >
            Browse Marketplace Catalog
          </button>
          <button
            onClick={() => setDashboardTab('deposit')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#111111] border border-[#292929] text-emerald-400 hover:border-emerald-500 transition-colors"
          >
            Deposit Funds (Pending Admin Approval)
          </button>
          <button
            onClick={() => setDashboardTab('tickets')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#111111] border border-[#292929] text-[#B5B5B5] hover:text-white transition-colors"
          >
            Customer Support Desk
          </button>
        </div>
      </div>

      {/* Recent Purchases Strip */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Recent Card Purchases
          </h3>
          <button
            onClick={() => setDashboardTab('purchases')}
            className="text-xs text-[#C1121F] hover:underline inline-flex items-center gap-1"
          >
            View all ({userPurchasedCards.length}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentPurchases.length > 0 ? (
          <div className="space-y-3">
            {recentPurchases.map((card) => (
              <div
                key={card.id}
                className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-mono text-[#858585]">{card.trx}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{card.product_name}</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    Delivered on {card.purchased_at}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-bold font-display text-white">
                      ${card.price.toFixed(2)} USD
                    </span>
                  </div>
                  <button
                    onClick={() => setDashboardTab('purchases')}
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[#858585]">
            You have not purchased any cards yet. Your purchase history is clean.
          </div>
        )}
      </div>

      {/* Recent Transactions Strip */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Recent Transactions
          </h3>
          <button
            onClick={() => setDashboardTab('transactions')}
            className="text-xs text-[#C1121F] hover:underline inline-flex items-center gap-1"
          >
            Full history <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-[#292929]">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-[#858585] block">{tx.trx}</span>
                  <span className="font-medium text-white">{tx.details}</span>
                  <span className="text-[10px] text-[#858585] block mt-0.5">{tx.created_at}</span>
                </div>

                <div className="text-right">
                  <div
                    className={`font-mono font-bold tabular-nums text-sm ${
                      tx.trx_type === '+' ? 'text-emerald-400' : 'text-[#E01B24]'
                    }`}
                  >
                    {tx.trx_type === '+' ? '+' : '-'}${tx.amount.toFixed(2)} USD
                  </div>
                  <span className="text-[10px] text-[#858585]">
                    Post Balance: ${tx.post_balance.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-[#858585]">
            No transaction records found for your account.
          </div>
        )}
      </div>

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 2: MY PURCHASES (STRICT USER ISOLATION)
   ========================================================================= */
const PurchasesTab: React.FC = () => {
  const { userPurchasedCards, setDashboardTab, addToast } = useStore();
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Card details copied to clipboard.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#292929]">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            My Purchased Cards
          </h2>
          <p className="text-xs text-[#858585] mt-0.5">
            Strictly private inventory assigned to your client ID. Only you can view these credentials.
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Isolated Single-Buyer Vault
        </div>
      </div>

      {userPurchasedCards.length > 0 ? (
        <div className="space-y-4">
          {userPurchasedCards.map((card) => {
            const isRevealed = !!revealedIds[card.id];

            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-[#111111] border border-[#292929] hover:border-[#C1121F]/50 transition-all space-y-4"
              >
                {/* Header of Item */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#292929]/70">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#858585]">{card.trx}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                        Delivered
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{card.product_name}</h3>
                    <div className="text-xs text-[#858585] mt-0.5">Purchased: {card.purchased_at}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#858585] block">Order Amount</span>
                    <span className="text-lg font-bold font-display text-white tabular-nums">
                      ${card.price.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Secret Digital Card Credentials Box */}
                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#C1121F]" /> Digital Card Credentials
                    </span>

                    <button
                      onClick={() => toggleReveal(card.id)}
                      className="text-xs text-[#B5B5B5] hover:text-white inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-[#171717] border border-[#292929] transition-colors"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Mask
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-[#C1121F]" /> Reveal Credentials
                        </>
                      )}
                    </button>
                  </div>

                  {isRevealed ? (
                    <div className="p-3 rounded-lg bg-[#050505] border border-[#C1121F]/40 font-mono text-xs text-emerald-400 select-all break-all leading-relaxed flex items-start justify-between gap-3 animate-in fade-in">
                      <span>{card.details}</span>
                      <button
                        onClick={() => copyToClipboard(card.details)}
                        className="text-[#858585] hover:text-white p-1 shrink-0"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-[#050505] border border-[#292929] font-mono text-xs text-[#858585] tracking-widest">
                      •••• •••• •••• •••• | EXP: ••/•• | CVV: ••• | PIN: •••• [Click Reveal]
                    </div>
                  )}

                  <div className="text-[11px] text-[#858585] leading-relaxed">
                    Note: These digital parameters are private to your user ID. You can bind this card to supported portals, Apple Pay, PayPal, or merchant checkouts according to the product specifications.
                  </div>
                </div>

                {/* Footer Action: Request Refund Link */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[#858585]">Need assistance or refund review?</span>
                  <button
                    onClick={() => setDashboardTab('refunds')}
                    className="text-[#B5B5B5] hover:text-[#C1121F] hover:underline"
                  >
                    Request Refund on this Purchase →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#111111] border border-[#292929] space-y-3">
          <ShoppingBag className="w-12 h-12 text-[#858585] mx-auto" />
          <h3 className="text-base font-bold text-white">No Digital Cards Purchased</h3>
          <p className="text-xs text-[#858585] max-w-sm mx-auto">
            Your purchase history is empty. When you purchase an item, it will be delivered directly and exclusively to your private vault.
          </p>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 3: DEPOSIT FUNDS (MANDATORY ADMIN APPROVAL)
   ========================================================================= */
const DepositTab: React.FC = () => {
  const { gateways, gateway, userDeposits, submitDeposit, addToast } = useStore();

  const activeGateways = gateways && gateways.length > 0 ? gateways.filter((g) => g.is_active !== false) : [gateway];

  const [selectedGatewayCode, setSelectedGatewayCode] = useState<number>(
    activeGateways[0]?.code ?? gateway.code
  );
  const [depositAmount, setDepositAmount] = useState<number>(100);
  const [txHash, setTxHash] = useState<string>('');
  const [proofFile, setProofFile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active gateway reference
  const currentGateway =
    activeGateways.find((g) => g.code === selectedGatewayCode) ||
    activeGateways[0] ||
    gateway;

  const minAmt = currentGateway.min_amount ?? 10;
  const maxAmt = currentGateway.max_amount ?? 10000;
  const feePct = currentGateway.percent_charge ?? 0;

  const charge = Number(((depositAmount * feePct) / 100).toFixed(2));
  const totalPayable = Number((depositAmount + charge).toFixed(2));

  const targetAddress =
    currentGateway.wallet_address ||
    (currentGateway.currency === 'BTC' ? currentGateway.btc_address : currentGateway.bep20_address) ||
    '0x0000000000000000000000000000000000000000';

  const verifiedQR = generateVerifiedQRCode(
    currentGateway.network || currentGateway.currency,
    targetAddress,
    totalPayable
  );

  const handleCopy = (address: string, label = 'Address') => {
    navigator.clipboard.writeText(address);
    addToast(`${label} copied to clipboard.`, 'success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Screenshot file size exceeds 5MB limit.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProofFile(reader.result as string);
        addToast(`Payment proof "${file.name}" attached.`, 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount < minAmt) {
      addToast(`Minimum deposit amount is $${minAmt}.`, 'error');
      return;
    }
    if (depositAmount > maxAmt) {
      addToast(`Maximum deposit amount is $${maxAmt}.`, 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      submitDeposit(
        depositAmount,
        proofFile,
        txHash,
        currentGateway.code,
        currentGateway.network,
        targetAddress
      );
      setIsSubmitting(false);
      setTxHash('');
      setProofFile('');
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-[#292929] space-y-1">
        <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
          Deposit Crypto Funds
        </h2>
        <p className="text-xs text-[#858585]">
          Select your preferred payment gateway. All deposits require manual administrator review and verification before balance is credited.
        </p>
      </div>

      {/* Main 2-Col Grid: Deposit Form + Live Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Step Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitDeposit} className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-6">
            {/* Step 1: Select Payment Gateway */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-slate-300">
                  1. Select Payment Gateway & Network
                </label>
                <span className="font-mono text-[#858585] text-[11px]">
                  {activeGateways.length} active gateway{activeGateways.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeGateways.map((gw) => {
                  const isSelected = gw.code === currentGateway.code;
                  return (
                    <button
                      key={gw.code}
                      type="button"
                      onClick={() => setSelectedGatewayCode(gw.code)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-[#C1121F]/15 border-[#C1121F] text-white shadow-lg shadow-[#C1121F]/10'
                          : 'bg-[#0A0A0A] border-[#292929] text-[#B5B5B5] hover:text-white hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-white truncate">{gw.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold bg-[#171717] border border-[#292929] text-amber-400">
                          {gw.network || gw.currency}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#858585] flex items-center justify-between font-mono">
                        <span>Fee: {gw.percent_charge}%</span>
                        <span>${gw.min_amount}-${gw.max_amount}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Deposit Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-slate-300">
                  2. Deposit Amount (USD)
                </label>
                <span className="font-mono text-[#858585] text-[11px]">
                  Limits: ${minAmt} - ${maxAmt} USD
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-mono text-[#858585]">$</span>
                <input
                  type="number"
                  min={minAmt}
                  max={maxAmt}
                  step="1"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl pl-8 pr-4 py-3 text-base font-bold font-display text-white focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              {/* Quick preset buttons */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {[50, 100, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className={`py-1 px-3 rounded-lg border text-xs font-mono transition-colors ${
                      depositAmount === amt
                        ? 'bg-[#C1121F] text-white border-[#C1121F]'
                        : 'bg-[#0A0A0A] border-[#292929] text-[#B5B5B5] hover:text-white hover:border-[#C1121F]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-2 text-xs">
              <div className="flex justify-between text-[#858585]">
                <span>Base Deposit Amount</span>
                <span className="font-mono text-white tabular-nums">${depositAmount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-[#858585]">
                <span>Processing Fee ({feePct}%)</span>
                <span className="font-mono text-[#E01B24] tabular-nums">+${charge.toFixed(2)} USD</span>
              </div>
              <div className="pt-2 border-t border-[#292929] flex justify-between font-bold text-white">
                <span>Total Amount to Transfer</span>
                <span className="font-mono text-emerald-400 text-sm tabular-nums">
                  ${totalPayable.toFixed(2)} USD ({currentGateway.currency})
                </span>
              </div>
            </div>

            {/* Step 3: Transaction Hash & Proof */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  3. Blockchain Transaction Hash / Reference TXID
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 0x8a9f4c3... or Bitcoin TXID"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  4. Payment Proof Screenshot (Mandatory for fast clearance)
                </label>
                {proofFile ? (
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-emerald-500/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={proofFile} alt="Proof" className="w-12 h-12 object-cover rounded-lg border border-[#292929] shrink-0" />
                      <div className="text-xs min-w-0">
                        <span className="text-emerald-400 font-semibold block">Proof Attached ✓</span>
                        <span className="text-[10px] text-[#858585] truncate block">Ready for administrator review</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProofFile('')}
                      className="px-2.5 py-1 text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-500/30 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-[#292929] hover:border-[#C1121F]/60 rounded-xl p-4 text-center cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-[#858585] mx-auto mb-1.5" />
                    <span className="text-xs text-white block">
                      Click or drag payment screenshot (PNG, JPG, WEBP)
                    </span>
                    <span className="text-[10px] text-[#858585]">Max file size: 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-widest text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Registering Deposit Request...' : 'SUBMIT DEPOSIT FOR ADMIN APPROVAL'}
            </button>
          </form>
        </div>

        {/* Right: Configured Wallet, Verified QR Code & Instructions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Official Payment Details
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C1121F]/15 border border-[#C1121F]/40 text-[#E01B24] font-semibold">
                {currentGateway.network || currentGateway.currency}
              </span>
            </div>

            {/* Verified Dynamic QR Container */}
            <div className="p-4 bg-white rounded-2xl max-w-[210px] mx-auto flex flex-col items-center justify-center shadow-2xl space-y-2">
              <img
                src={verifiedQR.qrUrl}
                alt={`${currentGateway.name} QR Code`}
                className="w-40 h-40 object-contain rounded-lg"
              />
              <div className="text-center">
                <span className="text-[10px] font-mono font-bold text-black uppercase block tracking-wider">
                  {currentGateway.name}
                </span>
                <span className="text-[9px] font-mono text-emerald-700 font-semibold block">
                  ✓ Verified QR Payload
                </span>
              </div>
            </div>

            {/* Address Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#858585]">
                <span className="font-mono">
                  {currentGateway.network || currentGateway.currency} Deposit Wallet:
                </span>
                <span className="font-mono text-emerald-400">Single Address</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#292929] flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-white select-all break-all">
                  {targetAddress}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(targetAddress, 'Wallet address')}
                  className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#292929] text-[#B5B5B5] hover:text-white transition-colors shrink-0"
                  title="Copy wallet address"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QR Raw Payload with Copy */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#858585] block">
                Standard Payment URI (BIP/EVM):
              </span>
              <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#292929] flex items-center justify-between gap-2 text-[10px] font-mono text-[#858585]">
                <span className="truncate">{verifiedQR.payload}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(verifiedQR.payload, 'Payment URI')}
                  className="text-white hover:text-[#E01B24] shrink-0"
                  title="Copy URI"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Verification & Balance Policy */}
            <div className="text-xs text-[#858585] space-y-2 border-t border-[#292929] pt-4 leading-relaxed">
              <div className="text-white font-semibold">Strict Security & Verification Rules:</div>
              <p>• Submitting a deposit request registers the status as <strong>Pending</strong>.</p>
              <p>• Balances are <strong>only credited</strong> once an administrator inspects and verifies the blockchain transfer.</p>
              <p>• Uploading screenshots or hash does NOT instantly increment balance.</p>
              <p>• Once approved, funds are credited once and logged permanently in your transaction ledger.</p>
            </div>
          </div>
        </div>
      </div>

      {/* USER DEPOSIT HISTORY TABLE */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Your Deposit History Records
          </h3>
          <span className="text-xs font-mono text-[#858585]">
            {userDeposits.length} record{userDeposits.length === 1 ? '' : 's'}
          </span>
        </div>

        {userDeposits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0A] text-[#858585] uppercase font-mono text-[11px] border-b border-[#292929]">
                <tr>
                  <th className="py-3 px-4">Transaction (TRX)</th>
                  <th className="py-3 px-4">Gateway / Network</th>
                  <th className="py-3 px-4">Submitted Amount</th>
                  <th className="py-3 px-4">Approved Credit</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Administrator Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {userDeposits.map((dep) => {
                  const isApproved = dep.status === 1;
                  const isPending = dep.status === 2;
                  const submittedAmt = dep.submitted_amount ?? dep.amount;
                  const approvedAmt = dep.approved_amount ?? dep.amount;

                  return (
                    <tr key={dep.id} className="hover:bg-[#171717]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-white font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[120px]">{dep.trx}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(dep.trx, 'Transaction TRX')}
                            className="text-[#858585] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#B5B5B5]">
                        <div>{dep.method_name}</div>
                        <span className="text-[10px] font-mono text-amber-400">
                          {dep.network || dep.currency || 'BEP20'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white tabular-nums">
                        ${submittedAmt.toFixed(2)} USD
                      </td>
                      <td className="py-3.5 px-4 font-mono tabular-nums">
                        {isApproved ? (
                          <span className="text-emerald-400 font-bold">
                            ${approvedAmt.toFixed(2)} USD
                            {dep.approved_amount && dep.approved_amount !== dep.submitted_amount && (
                              <span className="text-[10px] text-amber-400 block font-normal">(Adjusted)</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-[#858585]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#858585] tabular-nums">
                        ${dep.charge.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-[#858585]">
                        {dep.created_at}
                      </td>
                      <td className="py-3.5 px-4">
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                            <Clock className="w-3.5 h-3.5" /> Pending Review
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#E01B24] font-medium">
                            <AlertTriangle className="w-3.5 h-3.5" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#858585] max-w-[200px]">
                        <span className="block truncate" title={dep.admin_feedback || 'Under review'}>
                          {dep.admin_feedback || 'Under review'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[#858585]">
            You have not submitted any deposits yet.
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB: ADMIN DEPOSIT APPROVAL QUEUE (MANDATORY ADMIN APPROVAL)
   ========================================================================= */
const AdminApprovalsTab: React.FC = () => {
  const { allDeposits, approveDeposit, rejectDeposit, users } = useStore();
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Unconfirmed blockchain transaction hash or mismatched deposit address.');

  const handleApprove = (depositId: number) => {
    approveDeposit(depositId);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalId) return;
    rejectDeposit(rejectModalId, rejectReason);
    setRejectModalId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#292929] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
              Administrator Deposit Queue
            </h2>
          </div>
          <p className="text-xs text-[#858585] mt-0.5">
            Review customer blockchain payment proofs. Approving deposits credits the customer balance exactly once.
          </p>
        </div>
        <div className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
          Total Queue: {allDeposits.length} Records
        </div>
      </div>

      {allDeposits.length > 0 ? (
        <div className="space-y-4">
          {allDeposits.map((dep) => {
            const customer = users.find((u) => u.id === dep.user_id);
            const isApproved = dep.status === 1;
            const isPending = dep.status === 2;
            const isRejected = dep.status === 3;

            return (
              <div
                key={dep.id}
                className={`p-6 rounded-2xl border transition-all space-y-4 ${
                  isPending
                    ? 'bg-[#111111] border-amber-500/40'
                    : isApproved
                    ? 'bg-[#0E1B13]/40 border-emerald-500/30'
                    : 'bg-[#1F0A0D]/40 border-[#700000]'
                }`}
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#292929]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-white font-bold">{dep.trx}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          isApproved
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                            : isPending
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                            : 'bg-red-950/80 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {isApproved ? 'Approved' : isPending ? 'Pending Review' : 'Rejected'}
                      </span>
                    </div>
                    <div className="text-xs text-[#858585] mt-1">
                      Customer:{' '}
                      <strong className="text-white">
                        {customer ? `${customer.firstname} ${customer.lastname} (@${customer.username})` : `User #${dep.user_id}`}
                      </strong>{' '}
                      · Current Balance: <span className="text-emerald-400 font-mono">${customer ? customer.balance.toFixed(2) : '0.00'}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#858585] block uppercase font-mono">Deposit Amount</span>
                    <span className="text-xl font-bold font-display text-white tabular-nums">
                      ${dep.amount.toFixed(2)} USD
                    </span>
                    <span className="text-[10px] text-[#858585] block font-mono">Fee: ${dep.charge.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Proof & Details Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 bg-[#0A0A0A] p-3 rounded-xl border border-[#292929]">
                    <span className="text-[10px] uppercase font-mono text-[#858585]">Network & Wallet Details</span>
                    <div className="text-white font-medium">{dep.method_name}</div>
                    <div className="text-[11px] font-mono text-[#858585] break-all">
                      Wallet: {dep.btc_wallet || 'BEP20 Node'}
                    </div>
                    <div className="text-[11px] text-[#858585]">Submitted at: {dep.created_at}</div>
                  </div>

                  <div className="space-y-1 bg-[#0A0A0A] p-3 rounded-xl border border-[#292929]">
                    <span className="text-[10px] uppercase font-mono text-[#858585]">Proof Attachment</span>
                    {dep.proof_image ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={dep.proof_image}
                          alt="Proof Screenshot"
                          className="w-14 h-14 rounded-lg object-cover border border-[#292929]"
                        />
                        <div>
                          <span className="text-white font-medium block">Screenshot Verified</span>
                          <a
                            href={dep.proof_image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#C1121F] hover:underline text-[11px] inline-flex items-center gap-1"
                          >
                            View Full Proof
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[#858585] italic">No image file uploaded (Hash verification only)</div>
                    )}
                  </div>
                </div>

                {/* Audit Feedback */}
                {dep.admin_feedback && (
                  <div className="text-xs text-[#858585] bg-[#0A0A0A] p-3 rounded-xl border border-[#292929]">
                    <strong className="text-white">Audit Status:</strong> {dep.admin_feedback}
                  </div>
                )}

                {/* Admin Actions */}
                {isPending && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setRejectModalId(dep.id)}
                      className="px-4 py-2 text-xs font-semibold text-[#E01B24] hover:bg-[#1F0A0D] border border-[#700000] rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject Deposit
                    </button>
                    <button
                      onClick={() => handleApprove(dep.id)}
                      className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve & Credit ${dep.amount.toFixed(2)} USD
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#111111] border border-[#292929] space-y-2">
          <ShieldCheck className="w-12 h-12 text-[#858585] mx-auto" />
          <h3 className="text-base font-bold text-white">No Deposit Requests in Queue</h3>
          <p className="text-xs text-[#858585]">
            When customers submit deposit requests, they will appear here with Pending status for admin approval.
          </p>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#111111] border border-[#292929] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase text-white">Reject Deposit Request</h3>
            <p className="text-xs text-[#858585]">
              Rejecting this deposit will ensure NO balance is credited to the customer.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#858585]">Rejection Reason</label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalId(null)}
                  className="px-3 py-1.5 text-xs text-[#858585] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#E01B24] hover:bg-red-700 rounded-lg"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 4: TRANSACTION HISTORY (STRICT USER ISOLATION)
   ========================================================================= */
const TransactionsTab: React.FC = () => {
  const { userTransactions } = useStore();
  const [filterType, setFilterType] = useState<'all' | '+' | '-'>('all');
  const [searchTrx, setSearchTrx] = useState<string>('');

  const filtered = userTransactions.filter((t) => {
    if (filterType !== 'all' && t.trx_type !== filterType) return false;
    if (searchTrx.trim()) {
      const q = searchTrx.toLowerCase();
      return t.trx.toLowerCase().includes(q) || t.details.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292929]">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Transaction History
          </h2>
          <p className="text-xs text-[#858585] mt-0.5">
            Personal ledger of credits, debit purchases, fees, and post-balance timestamps.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-[#C1121F] text-white font-semibold'
                : 'bg-[#111111] border border-[#292929] text-[#858585] hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('+')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === '+'
                ? 'bg-[#C1121F] text-white font-semibold'
                : 'bg-[#111111] border border-[#292929] text-[#858585] hover:text-white'
            }`}
          >
            Credits (+)
          </button>
          <button
            onClick={() => setFilterType('-')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === '-'
                ? 'bg-[#C1121F] text-white font-semibold'
                : 'bg-[#111111] border border-[#292929] text-[#858585] hover:text-white'
            }`}
          >
            Purchases (-)
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-xl bg-[#111111] border border-[#292929]">
        <input
          type="text"
          value={searchTrx}
          onChange={(e) => setSearchTrx(e.target.value)}
          placeholder="Search by personal transaction reference TRX..."
          className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3.5 py-2 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
        />
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929]">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0A] text-[#858585] uppercase font-mono text-[11px] border-b border-[#292929]">
                <tr>
                  <th className="py-3 px-4">Transaction (TRX)</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Post Balance</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-[#171717]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-white">
                      {t.trx}
                    </td>
                    <td className="py-3.5 px-4 text-[#B5B5B5]">
                      {t.details}
                    </td>
                    <td
                      className={`py-3.5 px-4 font-mono font-bold tabular-nums ${
                        t.trx_type === '+' ? 'text-emerald-400' : 'text-[#E01B24]'
                      }`}
                    >
                      {t.trx_type === '+' ? '+' : '-'}${t.amount.toFixed(2)} USD
                    </td>
                    <td className="py-3.5 px-4 font-mono text-white tabular-nums">
                      ${t.post_balance.toFixed(2)} USD
                    </td>
                    <td className="py-3.5 px-4 text-[#858585]">
                      {t.created_at}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {t.trx_type === '+' ? 'CREDIT' : 'DEBIT'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-[#858585]">
            No matching transactions found for your account.
          </div>
        )}
      </div>

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 5: SUPPORT TICKETS (STRICT USER ISOLATION)
   ========================================================================= */
const TicketsTab: React.FC = () => {
  const { userTickets, ticketMessages, createTicket, replyTicket } = useStore();
  const [activeTicketId, setActiveTicketId] = useState<number | null>(userTickets[0]?.id || null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<1 | 2 | 3>(2);
  const [newMessage, setNewMessage] = useState('');
  const [replyText, setReplyText] = useState('');

  const activeTicket = userTickets.find((t) => t.id === activeTicketId);
  const messages = activeTicketId ? ticketMessages[activeTicketId] || [] : [];

  const handleOpenTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;

    const res = createTicket(newSubject, newPriority, newMessage);
    if (res.success && res.ticketId) {
      setActiveTicketId(res.ticketId);
      setShowNewModal(false);
      setNewSubject('');
      setNewMessage('');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicketId || !replyText.trim()) return;

    replyTicket(activeTicketId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292929]">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Customer Support Desk
          </h2>
          <p className="text-xs text-[#858585] mt-0.5">
            Submit inquiries, request activation assistance, and review staff replies.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-xl flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Open New Ticket
        </button>
      </div>

      {/* Grid: Tickets List + Conversation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Ticket List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#858585] px-1">
            Your Support Inquiries ({userTickets.length})
          </div>

          {userTickets.length > 0 ? (
            <div className="space-y-2">
              {userTickets.map((t) => {
                const isSelected = t.id === activeTicketId;
                const isAnswered = t.status === 1;

                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#171717] border-[#C1121F]'
                        : 'bg-[#111111] border-[#292929] hover:bg-[#171717]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-[#858585]">{t.ticket}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          isAnswered
                            ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                            : 'bg-amber-950/80 border border-amber-500/40 text-amber-400'
                        }`}
                      >
                        {isAnswered ? 'Answered' : 'Open / Pending'}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {t.subject}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-[#858585] mt-2">
                      <span>Priority: {t.priority === 3 ? 'High' : t.priority === 2 ? 'Medium' : 'Low'}</span>
                      <span>Last: {t.last_reply}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#858585] bg-[#111111] border border-[#292929] rounded-xl p-4">
              No support tickets found for your account. Click "Open New Ticket" to contact us.
            </div>
          )}
        </div>

        {/* Right: Conversation Thread */}
        <div className="lg:col-span-7 flex flex-col h-[550px] bg-[#111111] border border-[#292929] rounded-2xl overflow-hidden">
          {activeTicket ? (
            <>
              {/* Thread Header */}
              <div className="p-4 bg-[#0A0A0A] border-b border-[#292929] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#858585]">{activeTicket.ticket}</span>
                  <h3 className="text-sm font-bold text-white truncate max-w-sm">
                    {activeTicket.subject}
                  </h3>
                </div>
                <div className="text-right text-[11px] font-mono text-[#858585]">
                  Status: {activeTicket.status === 1 ? 'Answered' : 'Active'}
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m) => {
                  const isStaff = m.admin_id !== 0;

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isStaff ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-[#858585]">
                        <span className={isStaff ? 'text-[#C1121F] font-semibold' : 'text-slate-300'}>
                          {isStaff ? 'REDROOM Support Desk' : 'You'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{m.created_at}</span>
                      </div>

                      <div
                        className={`max-w-[85%] p-3.5 rounded-xl text-xs leading-relaxed ${
                          isStaff
                            ? 'bg-[#171717] border border-[#292929] text-white'
                            : 'bg-[#C1121F] text-white'
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form Footer */}
              <form onSubmit={handleSendReply} className="p-3 bg-[#0A0A0A] border-t border-[#292929] flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your message reply..."
                  className="flex-1 bg-[#111111] border border-[#292929] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2.5 rounded-xl bg-[#C1121F] hover:bg-[#E01B24] text-white disabled:opacity-40 transition-colors"
                  aria-label="Send reply"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#858585] p-6 text-center">
              Select an inquiry on the left or open a new ticket to chat with support.
            </div>
          )}
        </div>

      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111111] border border-[#292929] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="text-base font-bold font-display uppercase tracking-wide text-white">
              Open Support Ticket
            </h3>

            <form onSubmit={handleOpenTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-[#858585] uppercase font-mono">Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Card verification inquiry / Balance clarification"
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#858585] uppercase font-mono">Priority Level</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
                >
                  <option value={1}>Low Priority</option>
                  <option value={2}>Medium Priority</option>
                  <option value={3}>High Priority (Urgent)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#858585] uppercase font-mono">Message Details</label>
                <textarea
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Please describe your query in detail..."
                  className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C1121F]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#858585] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 6: REFUND REQUESTS (STRICT USER ISOLATION)
   ========================================================================= */
const RefundsTab: React.FC = () => {
  const { userPurchasedCards, userRefundRequests, createRefundRequest } = useStore();
  const [selectedTrx, setSelectedTrx] = useState<string>(userPurchasedCards[0]?.trx || '');
  const [reason, setReason] = useState<string>('');

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrx || !reason.trim()) return;

    createRefundRequest(selectedTrx, reason);
    setReason('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#292929] space-y-1">
        <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
          Refund Request Portal
        </h2>
        <p className="text-xs text-[#858585]">
          Submit refund reviews for eligible digital card purchases according to our 20% platform policy.
        </p>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-[#171717] border border-[#292929] text-xs text-[#B5B5B5] space-y-1">
        <div className="font-semibold text-white">Marketplace Refund Policy Notice:</div>
        <p className="text-[#858585] leading-relaxed">
          Refund requests are recorded in your client portal and manually audited by the support desk. Approved refunds incur a standard 20% administrative handling charge, with the remaining 80% credited directly back to your account wallet.
        </p>
      </div>

      {/* Refund Submission Form */}
      <form onSubmit={handleSubmitRefund} className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
          Initiate New Refund Request
        </h3>

        {userPurchasedCards.length > 0 ? (
          <>
            <div className="space-y-1">
              <label className="text-xs text-[#858585] uppercase font-mono">
                Select Eligible Purchase
              </label>
              <select
                value={selectedTrx}
                onChange={(e) => setSelectedTrx(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
                required
              >
                {userPurchasedCards.map((c) => (
                  <option key={c.id} value={c.trx}>
                    {c.product_name} — ${c.price.toFixed(2)} USD ({c.trx})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#858585] uppercase font-mono">
                Reason for Refund Request
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain the specific issue encountered (e.g. checkout site unsupported, BIN mismatch)..."
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg p-3 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#C1121F]"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg shadow-sm transition-all"
            >
              Submit Refund Request
            </button>
          </>
        ) : (
          <div className="text-xs text-[#858585] py-2">
            You must have at least one completed card purchase in your account to file a refund request.
          </div>
        )}
      </form>

      {/* Submitted Refund Requests List */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
          Your Refund Inquiries ({userRefundRequests.length})
        </h3>

        {userRefundRequests.length > 0 ? (
          <div className="space-y-3">
            {userRefundRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white font-medium">{req.purchase_trx}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-400 uppercase">
                    Status: {req.status}
                  </span>
                </div>

                <div className="font-semibold text-white">{req.product_name} (${req.amount.toFixed(2)} USD)</div>
                <div className="text-[#858585]">Reason: {req.reason}</div>
                {req.admin_note && (
                  <div className="pt-2 text-[11px] text-[#858585] border-t border-[#292929]">
                    Review note: {req.admin_note}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-[#858585]">
            No refund requests found in your account.
          </div>
        )}
      </div>

    </div>
  );
};

/* =========================================================================
   SUB-VIEW TAB 7: PROFILE & PASSWORD UPDATE
   ========================================================================= */
const ProfileTab: React.FC = () => {
  const { user, updateProfile, addToast } = useStore();

  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [address, setAddress] = useState(user?.address || '');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstname, lastname, email, mobile, address });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      addToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast('Account password changed successfully.', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#292929]">
        <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
          Client Account Profile
        </h2>
        <p className="text-xs text-[#858585] mt-0.5">
          Manage your verified account parameters, contact details, and password credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Details Form */}
        <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            General Information
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-[#858585] uppercase font-mono">First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#858585] uppercase font-mono">Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">Phone Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">Billing Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C1121F]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#E01B24] rounded-lg shadow-sm transition-all"
          >
            Save Profile Changes
          </button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="p-6 rounded-2xl bg-[#111111] border border-[#292929] space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            Security & Password
          </h3>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#858585] uppercase font-mono">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A0A0A] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C1121F]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#292929] border border-[#292929] rounded-lg transition-colors"
          >
            Update Account Password
          </button>
        </form>

      </div>

    </div>
  );
};
