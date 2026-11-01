import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/common/Logo';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { generateVerifiedQRCode } from '../utils/qr';
import {
  LayoutDashboard,
  CreditCard,
  Layers,
  Package,
  KeyRound,
  Users,
  Wallet,
  ShoppingBag,
  LifeBuoy,
  RotateCcw,
  Sliders,
  Palette,
  Settings,
  Globe,
  ShieldAlert,
  Lock,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  ArrowUpRight,
  DollarSign,
  UserCheck,
  UserX,
  FileText,
  Send,
  Check,
  ChevronRight,
  Shield,
  Smartphone,
  Info,
  QrCode,
  Save,
  CheckCircle,
  LogIn
} from 'lucide-react';
import { Category, Subcategory, PaymentGateway, User, Deposit, InventoryCard } from '../types';

export const AdminPage: React.FC = () => {
  const {
    admin,
    impersonatingAdmin,
    adminLogin,
    adminLogout,
    adminChangePassword,
    loginAsUser,
    exitImpersonation,
    saveAllSettings,
    adminTab,
    setAdminTab,
    setCurrentPage,
    siteSettings,
    updateSiteSettings,
    homepageSettings,
    updateHomepageSettings,
    designSettings,
    updateDesignSettings,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    subcategories,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    inventoryCards,
    addInventoryCard,
    bulkAddInventoryCards,
    deleteInventoryCard,
    gateways,
    addGateway,
    updateGateway,
    deleteGateway,
    toggleGateway,
    users,
    updateUserStatus,
    adjustUserBalance,
    allDeposits,
    approveDeposit,
    rejectDeposit,
    allPurchasedCards,
    allTransactions,
    allTickets,
    ticketMessages,
    replyTicketAsAdmin,
    updateTicketStatus,
    allRefundRequests,
    approveRefund,
    rejectRefund,
    auditLogs,
    addToast
  } = useStore();

  // Admin Login Form State — completely empty by default
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Rate Limiting Countdown Timer
  useEffect(() => {
    let interval: any;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  // Password Change State
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Modals & Drawers state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '', description: '', featured: false, status: 1 });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Subcategory | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: 1,
    price: 50,
    limit: '$500 Balance',
    description: '',
    image: '',
    features: ['Instant Delivery', 'Zero KYC Required', 'Non-Reloadable', 'Online Checkouts Supported'],
    status: 1
  });

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showBulkCardModal, setShowBulkCardModal] = useState(false);
  const [selectedSubcategoryForCard, setSelectedSubcategoryForCard] = useState<number>(subcategories[0]?.id || 1);
  const [singleCardDetails, setSingleCardDetails] = useState('');
  const [bulkCardLines, setBulkCardLines] = useState('');

  const [inspectCard, setInspectCard] = useState<InventoryCard | null>(null);
  const [viewScreenshotUrl, setViewScreenshotUrl] = useState<string | null>(null);

  // Deposit Approval Modal with CUSTOM APPROVAL AMOUNT
  const [customApproveDepositModal, setCustomApproveDepositModal] = useState<Deposit | null>(null);
  const [customApproveAmount, setCustomApproveAmount] = useState<string>('');

  const [rejectDepositModal, setRejectDepositModal] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const [balanceModalUser, setBalanceModalUser] = useState<User | null>(null);
  const [balanceAction, setBalanceAction] = useState<'add' | 'deduct'>('add');
  const [balanceAmount, setBalanceAmount] = useState<string>('50');
  const [balanceReason, setBalanceReason] = useState('');

  // Comprehensive User Profile View State
  const [activeProfileUser, setActiveProfileUser] = useState<User | null>(null);
  const [profileHistoryTab, setProfileHistoryTab] = useState<'deposits' | 'purchases' | 'transactions'>('deposits');

  // Payment Gateway Modal State
  const [showAddGatewayModal, setShowAddGatewayModal] = useState(false);
  const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);
  const [gatewayForm, setGatewayForm] = useState<PaymentGateway>({
    code: 999,
    name: '',
    alias: '',
    currency: 'USDT',
    network: 'BEP20',
    wallet_address: '',
    min_amount: 10,
    max_amount: 50000,
    percent_charge: 0,
    fixed_charge: 0,
    bep20_address: '',
    btc_address: '',
    bank_name: '',
    instructions: 'Send exact amount to the specified wallet address.',
    is_active: true
  });

  const [activeTicketId, setActiveTicketId] = useState<number | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Filtering states
  const [depositFilter, setDepositFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [purchaseSearch, setPurchaseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [cardSubcategoryFilter, setCardSubcategoryFilter] = useState<number | 'all'>('all');
  const [cardStatusFilter, setCardStatusFilter] = useState<'all' | 'available' | 'sold' | 'disabled'>('all');

  // Handle Admin Login with Rate Limiting
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (lockoutTimer > 0) {
      setLoginError(`Security rate limit active. Try again in ${lockoutTimer} seconds.`);
      return;
    }

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Both username and password are required.');
      return;
    }

    const success = adminLogin(loginUsername, loginPassword);
    if (!success) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTimer(60);
        setLoginError('Rate limit exceeded: 5 failed attempts. Account temporarily locked for 60 seconds.');
      } else {
        setLoginError(`Invalid administrator credentials. (${5 - newAttempts} attempts remaining before temporary lockout)`);
      }
    } else {
      setFailedAttempts(0);
      setLockoutTimer(0);
      setLoginUsername('');
      setLoginPassword('');
      addToast('Administrator authenticated securely.', 'success');
    }
  };

  // Handle Password Change
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    const res = adminChangePassword(oldPassword, newPassword);
    if (!res.success) {
      setPasswordError(res.message);
    } else {
      addToast(res.message, 'success');
      setShowPasswordChangeModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Quick statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 1).length;
    const bannedUsers = users.filter((u) => u.status === 0).length;

    const totalCategories = categories.length;
    const totalProducts = subcategories.length;

    const availableCards = inventoryCards.filter((c) => c.status === 'available').length;
    const soldCards = inventoryCards.filter((c) => c.status === 'sold').length;

    const totalSalesVolume = allPurchasedCards.reduce((acc, curr) => acc + curr.price, 0);

    const pendingDeposits = allDeposits.filter((d) => d.status === 2);
    const approvedDeposits = allDeposits.filter((d) => d.status === 1);
    const rejectedDeposits = allDeposits.filter((d) => d.status === 3);
    const totalDepositedVolume = approvedDeposits.reduce((acc, curr) => acc + (curr.approved_amount ?? curr.amount), 0);

    const pendingTickets = allTickets.filter((t) => t.status === 0 || t.status === 2).length;
    const pendingRefunds = allRefundRequests.filter((r) => r.status === 'pending').length;

    return {
      totalUsers,
      activeUsers,
      bannedUsers,
      totalCategories,
      totalProducts,
      availableCards,
      soldCards,
      totalSalesVolume,
      pendingDepositsCount: pendingDeposits.length,
      approvedDepositsCount: approvedDeposits.length,
      rejectedDepositsCount: rejectedDeposits.length,
      totalDepositedVolume,
      pendingTickets,
      pendingRefunds
    };
  }, [users, categories, subcategories, inventoryCards, allPurchasedCards, allDeposits, allTickets, allRefundRequests]);

  // Export Purchases to CSV
  const exportPurchasesToCSV = () => {
    if (allPurchasedCards.length === 0) {
      addToast('No purchases to export.', 'info');
      return;
    }
    const headers = ['Order TRX', 'Product Name', 'Price ($)', 'User ID', 'Delivered Card Details', 'Purchase Date'];
    const rows = allPurchasedCards.map((p) => [
      p.trx,
      `"${p.product_name.replace(/"/g, '""')}"`,
      p.price.toFixed(2),
      p.user_id,
      `"${p.details.replace(/"/g, '""')}"`,
      p.purchased_at
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `REDROOM_Purchases_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Purchases exported to CSV.', 'success');
  };

  // If NOT logged in as admin, render the Master Admin Login Screen
  if (!admin) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-[#292929] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#700000] via-[#C1121F] to-[#E01B24]" />

          <div className="text-center mb-8">
            <div className="inline-flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <div className="inline-block px-3 py-1 bg-[#171717] border border-[#C1121F]/40 text-[#C1121F] font-mono text-xs uppercase tracking-widest rounded mb-2">
              Centralized Administration
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
              REDROOM Master Portal
            </h1>
            <p className="text-xs text-[#858585] mt-1">
              Authorized personnel only. All access attempts are recorded in system audit logs.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-lg bg-[#C1121F]/15 border border-[#C1121F]/50 text-red-300 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C1121F] shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {lockoutTimer > 0 && (
            <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between font-mono">
              <span>Security lockout active:</span>
              <span className="font-bold">{lockoutTimer}s remaining</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1.5">
                Admin Username or Email
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                disabled={lockoutTimer > 0}
                className="w-full bg-[#111111] border border-[#292929] focus:border-[#C1121F] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#858585] outline-none transition-colors disabled:opacity-50"
                placeholder=""
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                disabled={lockoutTimer > 0}
                className="w-full bg-[#111111] border border-[#292929] focus:border-[#C1121F] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#858585] outline-none transition-colors disabled:opacity-50"
                placeholder=""
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={lockoutTimer > 0}
              className="w-full mt-2 py-3 px-4 bg-[#C1121F] hover:bg-[#E01B24] disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-[#C1121F]/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Authenticate Administrator
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#292929] text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-[#858585] hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr; Return to Customer Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number | null;
    badgeColor?: string;
  }

  interface NavGroup {
    group: string;
    items: NavItem[];
  }

  // Navigation Items
  const navGroups: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      group: 'Financial & Orders',
      items: [
        { id: 'deposits', label: 'Deposit Requests', icon: Wallet, badge: stats.pendingDepositsCount > 0 ? stats.pendingDepositsCount : null, badgeColor: 'bg-amber-500 text-black' },
        { id: 'purchases', label: 'Purchases Ledger', icon: ShoppingBag, badge: null },
        { id: 'refunds', label: 'Refund Claims', icon: RotateCcw, badge: stats.pendingRefunds > 0 ? stats.pendingRefunds : null, badgeColor: 'bg-[#C1121F] text-white' }
      ]
    },
    {
      group: 'Marketplace Inventory',
      items: [
        { id: 'categories', label: 'Categories', icon: Layers, badge: categories.length },
        { id: 'products', label: 'Products & Cards', icon: Package, badge: subcategories.length },
        { id: 'inventory', label: 'Digital Cards Vault', icon: KeyRound, badge: `${stats.availableCards} live` }
      ]
    },
    {
      group: 'Users & Helpdesk',
      items: [
        { id: 'customers', label: 'Customer Accounts', icon: Users, badge: users.length },
        { id: 'tickets', label: 'Support Desk', icon: LifeBuoy, badge: stats.pendingTickets > 0 ? stats.pendingTickets : null, badgeColor: 'bg-blue-500 text-white' }
      ]
    },
    {
      group: 'System & Branding',
      items: [
        { id: 'gateways', label: 'Payment Gateways', icon: CreditCard, badge: gateways.length },
        { id: 'homepage', label: 'Homepage Customizer', icon: Sliders, badge: null },
        { id: 'theme', label: 'Design & Colors', icon: Palette, badge: null },
        { id: 'settings', label: 'General & Maintenance', icon: Settings, badge: siteSettings.maintenance_mode ? 'MAINT' : null, badgeColor: 'bg-amber-500 text-black' },
        { id: 'seo', label: 'SEO & Policy Pages', icon: Globe, badge: null },
        { id: 'audit', label: 'Audit Trail', icon: FileText, badge: null },
        { id: 'security', label: 'Security & Access', icon: Shield, badge: admin.mustChangePassword ? 'ACTION' : null, badgeColor: 'bg-red-500 text-white animate-pulse' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Top Warning Banner if Maintenance Mode is active */}
      {siteSettings.maintenance_mode && (
        <div className="bg-amber-500 text-black px-4 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>MAINTENANCE MODE IS ENABLED: The public customer storefront is currently displaying the maintenance splash screen. Only administrators can navigate.</span>
          </div>
          <button
            onClick={() => updateSiteSettings({ maintenance_mode: false })}
            className="px-2.5 py-1 bg-black text-amber-400 rounded text-[11px] font-bold hover:bg-zinc-900 transition-colors uppercase tracking-wider"
          >
            Disable Maintenance
          </button>
        </div>
      )}

      {/* Mandatory Password Change Alert Banner */}
      {admin.mustChangePassword && (
        <div className="bg-[#C1121F] text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>SECURITY NOTICE: You are currently using the default administrator password. Please change it immediately to secure your marketplace.</span>
          </div>
          <button
            onClick={() => setShowPasswordChangeModal(true)}
            className="px-3 py-1 bg-white text-[#C1121F] rounded text-xs font-bold hover:bg-zinc-100 transition-colors uppercase tracking-wider"
          >
            Change Password Now
          </button>
        </div>
      )}

      {/* Main Admin Header */}
      <header className="h-16 bg-[#0A0A0A] border-b border-[#292929] px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Logo size="sm" onClick={() => setAdminTab('dashboard')} />
          <div className="h-5 w-px bg-[#292929]" />
          <div className="flex items-center gap-2">
            <span className="font-['Oswald'] text-sm tracking-wider uppercase font-semibold text-white">
              REDROOM Command Center
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171717] border border-[#292929] text-emerald-400 font-bold">
              v11.5 Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Save Button in Header */}
          <button
            onClick={saveAllSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            title="Save all pending changes and settings to database"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>

          {/* View Public Storefront Button */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#171717] border border-[#292929] text-xs font-medium text-[#B5B5B5] hover:text-white transition-colors"
          >
            <span>Customer Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C1121F]" />
          </button>

          {/* Admin User Chip */}
          <div className="flex items-center gap-3 pl-2 border-l border-[#292929]">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{admin.name}</div>
              <div className="text-[10px] text-[#858585] font-mono">@{admin.username} &bull; Master Admin</div>
            </div>
            <button
              onClick={() => {
                adminLogout();
                addToast('Logged out of admin panel.', 'info');
              }}
              className="p-2 rounded-lg bg-[#111111] hover:bg-[#C1121F]/20 text-[#858585] hover:text-[#C1121F] border border-[#292929] hover:border-[#C1121F]/50 transition-colors"
              title="Sign Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-[#0A0A0A] border-r border-[#292929] flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 space-y-6">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#858585] mb-2 font-mono">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = adminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#C1121F] text-white shadow-md font-semibold'
                          : 'text-[#B5B5B5] hover:text-white hover:bg-[#111111]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#858585]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            item.badgeColor || (isActive ? 'bg-black/30 text-white' : 'bg-[#171717] text-[#B5B5B5]')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#050505] overflow-y-auto p-6 lg:p-8">
          
          {/* ======================================================== */}
          {/* TAB: DASHBOARD OVERVIEW */}
          {/* ======================================================== */}
          {adminTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                  Executive Dashboard
                </h2>
                <p className="text-xs text-[#858585] mt-1">
                  Real-time marketplace metrics, pending verification queues, and system transactions.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#292929] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span className="font-semibold uppercase tracking-wider">Registered Customers</span>
                    <Users className="w-4 h-4 text-[#C1121F]" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-2 font-mono">
                    {stats.totalUsers}
                  </div>
                  <div className="mt-2 text-[11px] text-[#858585] flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold">{stats.activeUsers} Active</span>
                    <span>&bull;</span>
                    <span className="text-red-400 font-semibold">{stats.bannedUsers} Banned</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#292929] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span className="font-semibold uppercase tracking-wider">Available Stock</span>
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-2 font-mono">
                    {stats.availableCards} <span className="text-xs text-[#858585] font-normal">cards</span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#858585] flex items-center gap-2">
                    <span className="text-white font-semibold">{stats.soldCards} Delivered</span>
                    <span>&bull;</span>
                    <span>Across {stats.totalProducts} products</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#292929] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span className="font-semibold uppercase tracking-wider">Card Purchases Volume</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">
                    ${stats.totalSalesVolume.toFixed(2)}
                  </div>
                  <div className="mt-2 text-[11px] text-[#858585]">
                    {allPurchasedCards.length} verified orders processed
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#292929] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span className="font-semibold uppercase tracking-wider">Pending Deposits</span>
                    <Wallet className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mt-2 font-mono">
                    {stats.pendingDepositsCount}
                  </div>
                  <div className="mt-2 text-[11px] text-[#858585]">
                    ${stats.totalDepositedVolume.toFixed(2)} total credited on-chain
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#858585] mr-2">
                  Quick Actions:
                </span>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      category_id: categories[0]?.id || 1,
                      price: 50,
                      limit: '$500 Balance',
                      description: '',
                      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
                      features: ['Instant Delivery', 'Zero KYC Required', 'Online Checkouts Supported'],
                      status: 1
                    });
                    setShowAddProductModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Product
                </button>

                <button
                  onClick={() => {
                    setSelectedSubcategoryForCard(subcategories[0]?.id || 1);
                    setBulkCardLines('');
                    setShowBulkCardModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#171717] border border-[#292929] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  Bulk Import Cards
                </button>

                <button
                  onClick={() => setAdminTab('deposits')}
                  className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#171717] border border-[#292929] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Wallet className="w-3.5 h-3.5 text-amber-400" />
                  Review Deposits ({stats.pendingDepositsCount})
                </button>

                <button
                  onClick={exportPurchasesToCSV}
                  className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#171717] border border-[#292929] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  Export Purchases CSV
                </button>
              </div>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Deposits Box */}
                <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-400" />
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Pending Deposit Queue
                      </h3>
                    </div>
                    <button
                      onClick={() => setAdminTab('deposits')}
                      className="text-xs text-[#C1121F] hover:underline"
                    >
                      View All ({stats.pendingDepositsCount}) &rarr;
                    </button>
                  </div>

                  {allDeposits.filter((d) => d.status === 2).length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#858585]">
                      No pending deposits awaiting verification.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allDeposits.filter((d) => d.status === 2).slice(0, 4).map((dep) => {
                        const depUser = users.find((u) => u.id === dep.user_id);
                        return (
                          <div
                            key={dep.id}
                            className="p-3.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-400 text-sm">
                                  ${(dep.submitted_amount ?? dep.amount).toFixed(2)}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                                  {dep.network || dep.method_name}
                                </span>
                              </div>
                              <div className="text-xs text-[#858585] mt-1 truncate">
                                User: <span className="text-white font-medium">{depUser?.username || `ID #${dep.user_id}`}</span> &bull; {dep.trx}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {dep.proof_image && (
                                <button
                                  onClick={() => setViewScreenshotUrl(dep.proof_image || null)}
                                  className="p-1.5 rounded bg-[#171717] hover:bg-[#202020] text-zinc-300 text-xs"
                                  title="Inspect Proof Screenshot"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setCustomApproveDepositModal(dep);
                                  setCustomApproveAmount(String(dep.submitted_amount ?? dep.amount));
                                }}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                              >
                                Review & Credit
                              </button>
                              <button
                                onClick={() => setRejectDepositModal(dep.id)}
                                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-red-950 text-red-400 text-xs font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Recent Purchases Box */}
                <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#C1121F]" />
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Recent Purchases
                      </h3>
                    </div>
                    <button
                      onClick={() => setAdminTab('purchases')}
                      className="text-xs text-[#C1121F] hover:underline"
                    >
                      View All ({allPurchasedCards.length}) &rarr;
                    </button>
                  </div>

                  {allPurchasedCards.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#858585]">
                      No purchases registered yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allPurchasedCards.slice(0, 4).map((purchase) => {
                        const pUser = users.find((u) => u.id === purchase.user_id);
                        return (
                          <div
                            key={purchase.id}
                            className="p-3.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                {purchase.product_name}
                              </div>
                              <div className="text-[11px] text-[#858585] mt-1 font-mono">
                                Buyer: <span className="text-zinc-200">{pUser?.username || `User #${purchase.user_id}`}</span> &bull; {purchase.trx}
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold text-white font-mono">
                                ${purchase.price.toFixed(2)}
                              </div>
                              <div className="text-[10px] text-emerald-400">
                                Delivered
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Audit Logs Timeline */}
              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                      Recent System Audit Events
                    </h3>
                  </div>
                  <button
                    onClick={() => setAdminTab('audit')}
                    className="text-xs text-[#C1121F] hover:underline"
                  >
                    Complete Log History &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#292929]">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="py-2.5 flex items-start justify-between text-xs">
                      <div>
                        <span className="font-mono text-[#C1121F] font-semibold mr-2">[{log.action}]</span>
                        <span className="text-zinc-300">{log.details}</span>
                      </div>
                      <span className="text-[10px] text-[#858585] font-mono shrink-0 ml-4">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: DEPOSITS APPROVAL WITH CUSTOM CREDIT AMOUNT */}
          {/* ======================================================== */}
          {adminTab === 'deposits' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Customer Deposit Approvals
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Strict balance verification: Inspect proof screenshots and enter the exact credit amount before approving.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 bg-[#0A0A0A] p-1 rounded-lg border border-[#292929]">
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDepositFilter(filter)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold capitalize transition-colors ${
                        depositFilter === filter
                          ? 'bg-[#C1121F] text-white'
                          : 'text-[#858585] hover:text-white'
                      }`}
                    >
                      {filter}
                      {filter === 'pending' && stats.pendingDepositsCount > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-bold">
                          {stats.pendingDepositsCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deposits Table */}
              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Deposit TRX</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Network & Gateway</th>
                        <th className="py-3 px-4">Submitted Amount</th>
                        <th className="py-3 px-4">Approved Credit</th>
                        <th className="py-3 px-4">Proof Receipt</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {allDeposits
                        .filter((d) => {
                          if (depositFilter === 'pending') return d.status === 2;
                          if (depositFilter === 'approved') return d.status === 1;
                          if (depositFilter === 'rejected') return d.status === 3;
                          return true;
                        })
                        .map((dep) => {
                          const depUser = users.find((u) => u.id === dep.user_id);
                          return (
                            <tr key={dep.id} className="hover:bg-[#111111]/50 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-medium text-white">
                                <div className="flex items-center gap-1.5">
                                  <span>{dep.trx}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(dep.trx);
                                      addToast('TRX copied.', 'info');
                                    }}
                                    className="text-[#858585] hover:text-white"
                                    title="Copy TRX"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                {depUser ? (
                                  <div>
                                    <button
                                      onClick={() => setActiveProfileUser(depUser)}
                                      className="font-semibold text-white hover:text-[#C1121F] transition-colors underline"
                                    >
                                      {depUser.username}
                                    </button>
                                    <div className="text-[10px] text-[#858585]">ID #{dep.user_id} &bull; {depUser.email}</div>
                                  </div>
                                ) : (
                                  <span className="text-[#858585]">User #{dep.user_id}</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded bg-[#171717] border border-[#292929] text-zinc-300 font-mono">
                                  {dep.network || dep.method_name}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-mono font-bold text-white text-sm">
                                  ${(dep.submitted_amount ?? dep.amount).toFixed(2)} USD
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                {dep.status === 1 ? (
                                  <div className="font-mono font-bold text-emerald-400 text-sm">
                                    ${(dep.approved_amount ?? dep.amount).toFixed(2)} USD
                                  </div>
                                ) : (
                                  <span className="text-[#858585] italic font-mono">—</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                {dep.proof_image ? (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setViewScreenshotUrl(dep.proof_image || null)}
                                      className="w-10 h-10 rounded bg-[#171717] border border-[#292929] overflow-hidden shrink-0 hover:border-[#C1121F] transition-colors"
                                      title="Click to view full screenshot"
                                    >
                                      <img
                                        src={dep.proof_image}
                                        alt="Proof Thumbnail"
                                        className="w-full h-full object-cover"
                                      />
                                    </button>
                                    <button
                                      onClick={() => setViewScreenshotUrl(dep.proof_image || null)}
                                      className="text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-[#C1121F]" />
                                      <span>Inspect</span>
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[#858585] italic">No image</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                {dep.status === 2 && (
                                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Pending Review
                                  </span>
                                )}
                                {dep.status === 1 && (
                                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold inline-flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Approved
                                  </span>
                                )}
                                {dep.status === 3 && (
                                  <span className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-semibold inline-flex items-center gap-1">
                                    <XCircle className="w-3 h-3" />
                                    Rejected
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-[#858585] font-mono text-[11px]">
                                {new Date(dep.created_at).toLocaleDateString()} {new Date(dep.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                {dep.status === 2 ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => {
                                        setCustomApproveDepositModal(dep);
                                        setCustomApproveAmount(String(dep.submitted_amount ?? dep.amount));
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-1"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      Review & Credit
                                    </button>
                                    <button
                                      onClick={() => setRejectDepositModal(dep.id)}
                                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-red-400 border border-zinc-700 hover:border-red-800 font-semibold transition-colors flex items-center gap-1"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-[#858585] text-[11px] truncate max-w-[140px]" title={dep.admin_feedback}>
                                    {dep.admin_feedback || 'Processed'}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {allDeposits.length === 0 && (
                  <div className="py-12 text-center text-[#858585]">
                    No deposits recorded in the system.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: PURCHASES LEDGER */}
          {/* ======================================================== */}
          {adminTab === 'purchases' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Purchases & Delivery Ledger
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Audited record of all digital cards sold, credentials delivered, and checkout transactions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#858585] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={purchaseSearch}
                      onChange={(e) => setPurchaseSearch(e.target.value)}
                      placeholder="Search TRX or Product..."
                      className="bg-[#0A0A0A] border border-[#292929] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-[#858585] outline-none focus:border-[#C1121F]"
                    />
                  </div>
                  <button
                    onClick={exportPurchasesToCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Order TRX</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Delivered Credentials</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {allPurchasedCards
                        .filter((p) => {
                          if (!purchaseSearch) return true;
                          const q = purchaseSearch.toLowerCase();
                          return p.trx.toLowerCase().includes(q) || p.product_name.toLowerCase().includes(q);
                        })
                        .map((p) => {
                          const pUser = users.find((u) => u.id === p.user_id);
                          return (
                            <tr key={p.id} className="hover:bg-[#111111]/50 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-semibold text-white">
                                {p.trx}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-white">
                                {p.product_name}
                              </td>
                              <td className="py-3.5 px-4">
                                {pUser ? (
                                  <div>
                                    <button
                                      onClick={() => setActiveProfileUser(pUser)}
                                      className="font-semibold text-white hover:text-[#C1121F] transition-colors underline"
                                    >
                                      {pUser.username}
                                    </button>
                                    <div className="text-[10px] text-[#858585]">{pUser.email}</div>
                                  </div>
                                ) : (
                                  <span className="text-[#858585]">User #{p.user_id}</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                                ${p.price.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="max-w-xs truncate font-mono text-[11px] text-zinc-300 bg-[#171717] px-2 py-1 rounded border border-[#292929] flex items-center justify-between">
                                  <span className="truncate mr-2">{p.details}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(p.details);
                                      addToast('Credentials copied to clipboard.', 'info');
                                    }}
                                    className="text-[#858585] hover:text-white shrink-0"
                                    title="Copy credentials"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[#858585] text-[11px]">
                                {new Date(p.purchased_at).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {allPurchasedCards.length === 0 && (
                  <div className="py-12 text-center text-[#858585]">
                    No card purchases recorded in the ledger yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: REFUND CLAIMS */}
          {/* ======================================================== */}
          {adminTab === 'refunds' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                  Customer Refund Claims
                </h2>
                <p className="text-xs text-[#858585] mt-1">
                  Standard policy: Approved refunds automatically deduct a 20% platform handling fee and credit the balance.
                </p>
              </div>

              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Claim ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Purchase TRX</th>
                        <th className="py-3 px-4">Product & Amount</th>
                        <th className="py-3 px-4">Customer Reason</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {allRefundRequests.map((req) => {
                        const rUser = users.find((u) => u.id === req.user_id);
                        const refundCredit = req.amount * 0.8;
                        return (
                          <tr key={req.id} className="hover:bg-[#111111]/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-zinc-400">
                              #{req.id}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-white">{rUser?.username || `User #${req.user_id}`}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-white">
                              {req.purchase_trx}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">{req.product_name}</div>
                              <div className="text-[11px] font-mono text-[#858585]">
                                Purchase: ${req.amount.toFixed(2)} &bull; Credit (80%): <span className="text-emerald-400 font-bold">${refundCredit.toFixed(2)}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs text-zinc-300">
                              {req.reason}
                            </td>
                            <td className="py-3.5 px-4">
                              {req.status === 'pending' && (
                                <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                                  Pending
                                </span>
                              )}
                              {req.status === 'approved' && (
                                <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                                  Approved
                                </span>
                              )}
                              {req.status === 'declined' && (
                                <span className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-semibold">
                                  Declined
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {req.status === 'pending' ? (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      const res = approveRefund(req.id);
                                      addToast(res.message, res.success ? 'success' : 'error');
                                    }}
                                    className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                                  >
                                    Approve (80%)
                                  </button>
                                  <button
                                    onClick={() => {
                                      const res = rejectRefund(req.id, 'Investigation revealed card was successfully redeemed.');
                                      addToast(res.message, 'info');
                                    }}
                                    className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-red-950 text-red-400 font-semibold transition-colors"
                                  >
                                    Decline
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[#858585] text-[11px]">
                                  Closed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {allRefundRequests.length === 0 && (
                  <div className="py-12 text-center text-[#858585]">
                    No customer refund requests submitted.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: CATEGORIES */}
          {/* ======================================================== */}
          {adminTab === 'categories' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Catalog Categories
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Manage top-level card categories, visual banners, and featured homepage showcases.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryForm({ name: '', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80', description: '', featured: true, status: 1 });
                    setShowAddCategoryModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => {
                  const productCount = subcategories.filter((s) => s.category_id === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="rounded-xl bg-[#0A0A0A] border border-[#292929] overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative h-32 w-full bg-[#111111] overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          {cat.featured && (
                            <span className="px-2 py-0.5 rounded bg-[#C1121F] text-white text-[10px] font-bold uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            cat.status === 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {cat.status === 1 ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1">
                        <h4 className="text-base font-bold text-white font-['Oswald'] uppercase">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-[#858585] mt-1 line-clamp-2">
                          {cat.description || 'Prepaid virtual solution cards.'}
                        </p>
                        <div className="mt-3 text-xs text-[#B5B5B5] flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#C1121F]" />
                          <span>{productCount} subcategories attached</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#111111] border-t border-[#292929] flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryForm({
                              name: cat.name,
                              image: cat.image,
                              description: cat.description || '',
                              featured: cat.featured,
                              status: cat.status
                            });
                            setShowAddCategoryModal(true);
                          }}
                          className="p-1.5 rounded bg-[#171717] hover:bg-[#222222] text-[#B5B5B5] hover:text-white text-xs flex items-center gap-1 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                              const res = deleteCategory(cat.id);
                              addToast(res.message, res.success ? 'success' : 'error');
                            }
                          }}
                          className="p-1.5 rounded bg-[#171717] hover:bg-red-950 text-red-400 text-xs flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: PRODUCTS (SUBCATEGORIES) */}
          {/* ======================================================== */}
          {adminTab === 'products' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Products & Cards Catalog
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Manage products, balance denominations, pricing, and live inventory bindings.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      category_id: categories[0]?.id || 1,
                      price: 50,
                      limit: '$500 Balance',
                      description: '',
                      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
                      features: ['Instant Delivery', 'Zero KYC Required', 'Online Checkouts Supported'],
                      status: 1
                    });
                    setShowAddProductModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Card Limit</th>
                        <th className="py-3 px-4">Live Available Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {subcategories.map((prod) => {
                        const cat = categories.find((c) => c.id === prod.category_id);
                        const liveStock = inventoryCards.filter((c) => c.subcategory_id === prod.id && c.status === 'available').length;
                        return (
                          <tr key={prod.id} className="hover:bg-[#111111]/50 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-10 h-7 object-cover rounded bg-[#171717] border border-[#292929]"
                                />
                                <div>
                                  <div className="font-semibold text-white">{prod.name}</div>
                                  <div className="text-[10px] text-[#858585] truncate max-w-xs">{prod.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-[#171717] text-zinc-300 font-medium">
                                {cat?.name || 'Unassigned'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                              ${prod.price.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#B5B5B5]">
                              {prod.limit || 'Standard'}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                                liveStock > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                              }`}>
                                {liveStock} available
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                prod.status === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                              }`}>
                                {prod.status === 1 ? 'Active' : 'Disabled'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    duplicateProduct(prod.id);
                                    addToast(`Duplicated product "${prod.name}"`, 'success');
                                  }}
                                  className="p-1.5 rounded bg-[#171717] hover:bg-[#252525] text-[#858585] hover:text-white"
                                  title="Duplicate Product"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingProduct(prod);
                                    setProductForm({
                                      name: prod.name,
                                      category_id: prod.category_id,
                                      price: prod.price,
                                      limit: prod.limit || '',
                                      description: prod.description || '',
                                      image: prod.image,
                                      features: prod.features || ['Instant Delivery', 'Zero KYC Required'],
                                      status: prod.status
                                    });
                                    setShowAddProductModal(true);
                                  }}
                                  className="p-1.5 rounded bg-[#171717] hover:bg-[#252525] text-[#B5B5B5] hover:text-white"
                                  title="Edit Product"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete product "${prod.name}"?`)) {
                                      const res = deleteProduct(prod.id);
                                      addToast(res.message, res.success ? 'success' : 'error');
                                    }
                                  }}
                                  className="p-1.5 rounded bg-[#171717] hover:bg-red-950 text-red-400"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: DIGITAL CARDS VAULT (INVENTORY) */}
          {/* ======================================================== */}
          {adminTab === 'inventory' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Digital Cards Vault & Stock
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Direct management of the cards inventory table. Add cards one-by-one or paste bulk lists.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSubcategoryForCard(subcategories[0]?.id || 1);
                      setSingleCardDetails('');
                      setShowAddCardModal(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111111] hover:bg-[#171717] border border-[#292929] text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Single Card
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSubcategoryForCard(subcategories[0]?.id || 1);
                      setBulkCardLines('');
                      setShowBulkCardModal(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Bulk Import (Multi-Line)
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#292929] flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <label className="text-[#858585] mr-2">Product:</label>
                  <select
                    value={cardSubcategoryFilter}
                    onChange={(e) => setCardSubcategoryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="bg-[#111111] border border-[#292929] rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#C1121F]"
                  >
                    <option value="all">All Products ({inventoryCards.length})</option>
                    {subcategories.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#858585] mr-2">Status:</label>
                  <select
                    value={cardStatusFilter}
                    onChange={(e) => setCardStatusFilter(e.target.value as any)}
                    className="bg-[#111111] border border-[#292929] rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#C1121F]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="available">Available ({inventoryCards.filter((c) => c.status === 'available').length})</option>
                    <option value="sold">Sold & Delivered ({inventoryCards.filter((c) => c.status === 'sold').length})</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Card ID</th>
                        <th className="py-3 px-4">Attached Product</th>
                        <th className="py-3 px-4">Card Credentials (Secret)</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Assigned User</th>
                        <th className="py-3 px-4">Added Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {inventoryCards
                        .filter((c) => {
                          if (cardSubcategoryFilter !== 'all' && c.subcategory_id !== cardSubcategoryFilter) return false;
                          if (cardStatusFilter !== 'all' && c.status !== cardStatusFilter) return false;
                          return true;
                        })
                        .map((card) => {
                          const prod = subcategories.find((s) => s.id === card.subcategory_id);
                          const assignedUser = users.find((u) => u.id === card.user_id);
                          return (
                            <tr key={card.id} className="hover:bg-[#111111]/50 transition-colors">
                              <td className="py-3.5 px-4 font-mono text-zinc-400">
                                #{card.id}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-white">
                                {prod?.name || `Subcategory #${card.subcategory_id}`}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="max-w-xs truncate font-mono text-zinc-300 bg-[#171717] px-2 py-1 rounded border border-[#292929] flex items-center justify-between">
                                  <span className="truncate mr-2">{card.details}</span>
                                  <button
                                    onClick={() => setInspectCard(card)}
                                    className="text-[#858585] hover:text-white shrink-0 ml-1"
                                    title="View credentials"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                {card.status === 'available' && (
                                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold font-mono">
                                    AVAILABLE
                                  </span>
                                )}
                                {card.status === 'sold' && (
                                  <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold font-mono">
                                    SOLD
                                  </span>
                                )}
                                {card.status === 'disabled' && (
                                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 font-semibold font-mono">
                                    DISABLED
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                {card.user_id > 0 ? (
                                  <span className="font-mono text-xs text-zinc-300">
                                    {assignedUser?.username || `User #${card.user_id}`}
                                  </span>
                                ) : (
                                  <span className="text-[#858585] italic">Unassigned</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[#858585] text-[11px]">
                                {new Date(card.created_at).toLocaleDateString()}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                {card.status === 'available' ? (
                                  <button
                                    onClick={() => {
                                      if (confirm('Delete this unsold card from inventory?')) {
                                        deleteInventoryCard(card.id);
                                        addToast('Card removed from stock.', 'info');
                                      }
                                    }}
                                    className="p-1.5 rounded bg-[#171717] hover:bg-red-950 text-red-400 transition-colors"
                                    title="Delete Card"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-[#858585] italic">Protected</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {inventoryCards.length === 0 && (
                  <div className="py-12 text-center text-[#858585]">
                    No digital cards stored in the vault. Click "Bulk Import" to populate inventory.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: CUSTOMER ACCOUNTS (CLICKABLE USERNAME & PROFILE) */}
          {/* ======================================================== */}
          {adminTab === 'customers' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Customer Accounts Management
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Click any customer username to view their complete profile, deposit & purchase history, adjust balance, or login as user.
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-[#858585] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by username or email..."
                    className="bg-[#0A0A0A] border border-[#292929] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-[#858585] outline-none focus:border-[#C1121F]"
                  />
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Country / Mobile</th>
                        <th className="py-3 px-4">Account Balance</th>
                        <th className="py-3 px-4">Verification</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Registered</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {users
                        .filter((u) => {
                          if (!userSearch) return true;
                          const q = userSearch.toLowerCase();
                          return u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                        })
                        .map((u) => (
                          <tr key={u.id} className="hover:bg-[#111111]/50 transition-colors">
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => setActiveProfileUser(u)}
                                className="font-semibold text-white hover:text-[#C1121F] transition-colors text-left group flex items-center gap-1.5"
                                title="Open full user profile"
                              >
                                <span className="underline group-hover:text-[#C1121F] font-bold">@{u.username}</span>
                                <ExternalLink className="w-3 h-3 text-[#858585] group-hover:text-[#C1121F]" />
                              </button>
                              <div className="text-[10px] text-[#858585] font-mono">{u.firstname} {u.lastname} &bull; ID #{u.id}</div>
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300">
                              {u.email}
                            </td>
                            <td className="py-3.5 px-4 text-[#858585]">
                              {u.country_name || 'US'} &bull; {u.dial_code}{u.mobile}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                              ${u.balance.toFixed(2)} USD
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 inline-block font-mono">
                                  {u.b2b_verified ? '✓ B2B Verified' : 'Standard Buyer'}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 inline-block font-mono">
                                  {u.email_verified !== false ? '✓ Email Confirmed' : 'Pending Verification'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              {u.status === 1 ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase">
                                  Active
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold uppercase">
                                  Banned
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#858585] text-[11px]">
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => loginAsUser(u.id)}
                                  className="px-2 py-1 rounded bg-[#171717] hover:bg-[#252525] text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                                  title="Login as User (Impersonate)"
                                >
                                  <LogIn className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Impersonate</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setBalanceModalUser(u);
                                    setBalanceAction('add');
                                    setBalanceAmount('50');
                                    setBalanceReason('Manual ledger balance adjustment');
                                  }}
                                  className="px-2 py-1 rounded bg-[#171717] hover:bg-[#252525] text-emerald-400 border border-[#292929] text-xs font-medium flex items-center gap-1 transition-colors"
                                  title="Adjust customer balance"
                                >
                                  <DollarSign className="w-3.5 h-3.5" />
                                  <span>Adjust</span>
                                </button>

                                <button
                                  onClick={() => setActiveProfileUser(u)}
                                  className="px-2 py-1 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 border border-[#292929] text-xs font-medium flex items-center gap-1 transition-colors"
                                  title="View full user profile"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Profile</span>
                                </button>

                                {u.status === 1 ? (
                                  <button
                                    onClick={() => {
                                      if (confirm(`Ban customer @${u.username}? They will no longer be able to sign in or buy.`)) {
                                        updateUserStatus(u.id, 0);
                                        addToast(`User @${u.username} has been banned.`, 'info');
                                      }
                                    }}
                                    className="p-1 rounded bg-[#171717] hover:bg-red-950 text-red-400"
                                    title="Ban user"
                                  >
                                    <UserX className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      updateUserStatus(u.id, 1);
                                      addToast(`User @${u.username} unbanned.`, 'success');
                                    }}
                                    className="p-1 rounded bg-[#171717] hover:bg-emerald-950 text-emerald-400"
                                    title="Unban user"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {users.length === 0 && (
                  <div className="py-12 text-center text-[#858585]">
                    No customer accounts registered in the database.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: SUPPORT DESK */}
          {/* ======================================================== */}
          {adminTab === 'tickets' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                  Support Desk & Tickets
                </h2>
                <p className="text-xs text-[#858585] mt-1">
                  Respond to customer inquiries, provide account guidance, and close resolved issues.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden p-4 space-y-3">
                  <div className="text-xs font-semibold text-[#858585] uppercase tracking-wider mb-2">
                    Tickets Queue ({allTickets.length})
                  </div>

                  {allTickets.map((t) => {
                    const tUser = users.find((u) => u.id === t.user_id);
                    const isSelected = activeTicketId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTicketId(t.id)}
                        className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#171717] border-[#C1121F]'
                            : 'bg-[#111111] border-[#292929] hover:border-[#383838]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-zinc-400">#{t.ticket}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.status === 0 ? 'bg-amber-500/20 text-amber-400' :
                            t.status === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-zinc-800 text-zinc-400'
                          }`}>
                            {t.status === 0 ? 'Open' : t.status === 1 ? 'Answered' : 'Closed'}
                          </span>
                        </div>
                        <div className="font-semibold text-white text-xs mt-1.5 truncate">
                          {t.subject}
                        </div>
                        <div className="text-[11px] text-[#858585] mt-1">
                          From: <span className="text-zinc-300">{tUser?.username || `User #${t.user_id}`}</span> &bull; {new Date(t.created_at).toLocaleDateString()}
                        </div>
                      </button>
                    );
                  })}

                  {allTickets.length === 0 && (
                    <div className="py-12 text-center text-xs text-[#858585]">
                      No support tickets opened.
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#292929] rounded-xl flex flex-col h-[580px]">
                  {activeTicketId ? (
                    (() => {
                      const curTicket = allTickets.find((t) => t.id === activeTicketId);
                      const curMessages = ticketMessages[activeTicketId] || [];
                      const curUser = users.find((u) => u.id === curTicket?.user_id);

                      return (
                        <>
                          <div className="p-4 border-b border-[#292929] flex items-center justify-between bg-[#111111]">
                            <div>
                              <div className="text-xs font-mono text-[#858585]">Ticket #{curTicket?.ticket}</div>
                              <h3 className="text-sm font-bold text-white mt-0.5">{curTicket?.subject}</h3>
                              <div className="text-[11px] text-[#858585]">
                                Customer: <span className="text-white font-medium">{curUser?.username}</span> ({curUser?.email})
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {curTicket?.status !== 3 ? (
                                <button
                                  onClick={() => updateTicketStatus(activeTicketId, 3)}
                                  className="px-2.5 py-1 rounded bg-[#171717] hover:bg-zinc-800 text-zinc-300 text-xs border border-[#292929]"
                                >
                                  Close Ticket
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateTicketStatus(activeTicketId, 0)}
                                  className="px-2.5 py-1 rounded bg-[#171717] hover:bg-zinc-800 text-emerald-400 text-xs border border-[#292929]"
                                >
                                  Re-open Ticket
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {curMessages.map((m) => (
                              <div
                                key={m.id}
                                className={`flex flex-col ${m.admin_id === 1 ? 'items-end' : 'items-start'}`}
                              >
                                <div className="text-[10px] text-[#858585] mb-1">
                                  {m.admin_id === 1 ? 'REDROOM Support Administrator' : curUser?.username} &bull; {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div
                                  className={`p-3.5 rounded-xl max-w-lg text-xs leading-relaxed ${
                                    m.admin_id === 1
                                      ? 'bg-[#C1121F] text-white rounded-tr-none'
                                      : 'bg-[#171717] text-zinc-200 border border-[#292929] rounded-tl-none'
                                  }`}
                                >
                                  {m.message}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 border-t border-[#292929] bg-[#0A0A0A] flex gap-3">
                            <textarea
                              value={adminReplyText}
                              onChange={(e) => setAdminReplyText(e.target.value)}
                              placeholder="Type response as REDROOM Administrator..."
                              rows={2}
                              className="flex-1 bg-[#111111] border border-[#292929] rounded-lg p-2.5 text-xs text-white placeholder-[#858585] outline-none focus:border-[#C1121F] resize-none"
                            />
                            <button
                              onClick={() => {
                                if (!adminReplyText.trim()) return;
                                replyTicketAsAdmin(activeTicketId, adminReplyText);
                                setAdminReplyText('');
                                addToast('Reply transmitted to customer.', 'success');
                              }}
                              className="px-4 bg-[#C1121F] hover:bg-[#E01B24] text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      );
                    })()
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-xs text-[#858585]">
                      Select a support ticket from the left queue to view messages.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: PAYMENT GATEWAYS & VERIFIED QR CODE GENERATOR */}
          {/* ======================================================== */}
          {adminTab === 'gateways' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Payment Gateways & Verified Wallet Addresses
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Configure official blockchain deposit destinations. The customer frontend reads these exact values and renders verified QR codes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingGateway(null);
                    setGatewayForm({
                      code: Date.now() % 10000,
                      name: '',
                      alias: '',
                      currency: 'USDT',
                      network: 'BEP20',
                      wallet_address: '',
                      min_amount: 10,
                      max_amount: 50000,
                      percent_charge: 0,
                      fixed_charge: 0,
                      bep20_address: '',
                      btc_address: '',
                      bank_name: '',
                      instructions: 'Send exact amount to address.',
                      is_active: true
                    });
                    setShowAddGatewayModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Payment Gateway
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gateways.map((gw) => {
                  const targetAddr = gw.wallet_address || gw.bep20_address || gw.btc_address;
                  const verifiedQR = generateVerifiedQRCode(gw.network || 'BEP20', targetAddr);

                  return (
                    <div
                      key={gw.code}
                      className="p-5 rounded-xl bg-[#0A0A0A] border border-[#292929] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#C1121F]" />
                            <h3 className="text-base font-bold text-white font-['Oswald'] uppercase">
                              {gw.name}
                            </h3>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            gw.is_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {gw.is_active ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>

                        {/* Verified QR Code Card */}
                        <div className="p-3 bg-[#111111] rounded-lg border border-[#292929] flex items-center gap-3">
                          <div className="w-20 h-20 bg-white p-1 rounded-md shrink-0 flex items-center justify-center">
                            {verifiedQR.qrUrl ? (
                              <img src={verifiedQR.qrUrl} alt="QR Code" className="w-full h-full object-contain" />
                            ) : (
                              <QrCode className="w-8 h-8 text-black" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 text-xs">
                            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified {verifiedQR.networkLabel}</span>
                            </div>
                            <div className="text-[10px] text-[#858585] mt-1">Payload:</div>
                            <div className="text-[10px] font-mono text-zinc-300 truncate" title={verifiedQR.uri}>
                              {verifiedQR.uri || 'None'}
                            </div>
                          </div>
                        </div>

                        {/* Wallet Address */}
                        <div>
                          <span className="text-[#858585] block text-[10px] uppercase font-mono">
                            Network: <strong className="text-white">{gw.network || 'BEP20'}</strong> &bull; Address:
                          </span>
                          <div className="font-mono text-xs text-zinc-200 bg-[#111111] p-2 rounded border border-[#292929] break-all select-all mt-1 flex items-center justify-between">
                            <span className="truncate mr-2">{targetAddr}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(targetAddr);
                                addToast('Wallet address copied.', 'info');
                              }}
                              className="text-[#858585] hover:text-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-[#858585]">
                          <div>Limits: <span className="text-white font-mono">${gw.min_amount} - ${gw.max_amount}</span></div>
                          <div>Fee: <span className="text-white font-mono">{gw.percent_charge}% + ${gw.fixed_charge}</span></div>
                        </div>

                        <div className="text-[11px] text-[#858585]">
                          Instructions: <span className="text-zinc-300">{gw.instructions}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#292929] flex items-center justify-between">
                        <button
                          onClick={() => toggleGateway(gw.code)}
                          className="text-xs text-[#858585] hover:text-white"
                        >
                          {gw.is_active ? 'Disable' : 'Enable'}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingGateway(gw);
                              setGatewayForm({
                                ...gw,
                                wallet_address: targetAddr
                              });
                              setShowAddGatewayModal(true);
                            }}
                            className="px-3 py-1.5 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete gateway ${gw.name}?`)) {
                                deleteGateway(gw.code);
                                addToast('Gateway deleted from system.', 'info');
                              }
                            }}
                            className="p-1.5 rounded bg-[#171717] hover:bg-red-950 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: HOMEPAGE MANAGER WITH IMAGE UPLOAD & GLOBAL SAVE */}
          {/* ======================================================== */}
          {adminTab === 'homepage' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Homepage Section Controls & Hero Customizer
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Upload hero banners from computer, customize call-to-actions, and toggle homepage sections.
                  </p>
                </div>
                <button
                  onClick={saveAllSettings}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#292929]">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Hero Showcase Section
                    </h3>
                    <p className="text-xs text-[#858585]">
                      Enable or disable the main hero showcase on the customer homepage.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={homepageSettings.hero_enabled}
                      onChange={(e) => updateHomepageSettings({ hero_enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C1121F]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={homepageSettings.hero_title}
                      onChange={(e) => updateHomepageSettings({ hero_title: e.target.value })}
                      className="w-full bg-[#111111] border border-[#292929] rounded-lg px-4 py-2 text-xs text-white outline-none focus:border-[#C1121F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      value={homepageSettings.hero_subtitle}
                      onChange={(e) => updateHomepageSettings({ hero_subtitle: e.target.value })}
                      rows={2}
                      className="w-full bg-[#111111] border border-[#292929] rounded-lg px-4 py-2 text-xs text-white outline-none focus:border-[#C1121F]"
                    />
                  </div>

                  {/* Image Upload Component for Hero Banner */}
                  <ImageUploadField
                    label="Hero Background Banner Image"
                    value={homepageSettings.hero_bg_image}
                    onChange={(newVal) => updateHomepageSettings({ hero_bg_image: newVal })}
                    helperText="Upload your custom high-resolution hero artwork or enter an image URL. Appears on the customer homepage behind dark scrims."
                  />

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={homepageSettings.hero_primary_btn_text}
                        onChange={(e) => updateHomepageSettings({ hero_primary_btn_text: e.target.value })}
                        className="w-full bg-[#111111] border border-[#292929] rounded-lg px-4 py-2 text-xs text-white outline-none focus:border-[#C1121F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#B5B5B5] mb-1">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={homepageSettings.hero_secondary_btn_text}
                        onChange={(e) => updateHomepageSettings({ hero_secondary_btn_text: e.target.value })}
                        className="w-full bg-[#111111] border border-[#292929] rounded-lg px-4 py-2 text-xs text-white outline-none focus:border-[#C1121F]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Toggles */}
                <div className="pt-6 border-t border-[#292929]">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Homepage Sections Visibility
                  </h3>
                  <div className="space-y-3">
                    {homepageSettings.sections.map((section, idx) => (
                      <div
                        key={section.id}
                        className="p-3 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between"
                      >
                        <span className="text-xs font-medium text-white">{section.name}</span>
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={(e) => {
                            const updated = [...homepageSettings.sections];
                            updated[idx].enabled = e.target.checked;
                            updateHomepageSettings({ sections: updated });
                          }}
                          className="h-4 w-4 accent-[#C1121F] rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292929] flex justify-end">
                  <button
                    onClick={saveAllSettings}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: DESIGN & THEME */}
          {/* ======================================================== */}
          {adminTab === 'theme' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Design, Theme & Visual System
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Adjust color tokens, display typography, border styles, and preloader behaviors.
                  </p>
                </div>
                <button
                  onClick={saveAllSettings}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Color Palette (Hex Codes)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#858585] mb-1">Primary Red Highlight</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={designSettings.primary_red}
                          onChange={(e) => updateDesignSettings({ primary_red: e.target.value })}
                          className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={designSettings.primary_red}
                          onChange={(e) => updateDesignSettings({ primary_red: e.target.value })}
                          className="flex-1 bg-[#111111] border border-[#292929] rounded px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#858585] mb-1">Primary Background</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={designSettings.primary_bg}
                          onChange={(e) => updateDesignSettings({ primary_bg: e.target.value })}
                          className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={designSettings.primary_bg}
                          onChange={(e) => updateDesignSettings({ primary_bg: e.target.value })}
                          className="flex-1 bg-[#111111] border border-[#292929] rounded px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#858585] mb-1">Card Background</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={designSettings.card_bg}
                          onChange={(e) => updateDesignSettings({ card_bg: e.target.value })}
                          className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={designSettings.card_bg}
                          onChange={(e) => updateDesignSettings({ card_bg: e.target.value })}
                          className="flex-1 bg-[#111111] border border-[#292929] rounded px-3 py-1.5 text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#292929]">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Typography & Geometry
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#858585] mb-1">Heading Font Family</label>
                      <select
                        value={designSettings.font_display}
                        onChange={(e) => updateDesignSettings({ font_display: e.target.value })}
                        className="w-full bg-[#111111] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Oswald">Oswald (Industrial Condensed)</option>
                        <option value="Inter">Inter (Clean Modern)</option>
                        <option value="Space Mono">Space Mono (Cypherpunk)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#858585] mb-1">Card Corner Radius</label>
                      <select
                        value={designSettings.card_radius}
                        onChange={(e) => updateDesignSettings({ card_radius: e.target.value })}
                        className="w-full bg-[#111111] border border-[#292929] rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="rounded-xl">Rounded (Standard - 12px)</option>
                        <option value="rounded-lg">Compact (8px)</option>
                        <option value="rounded-none">Sharp / Brutalist (0px)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292929] flex justify-end">
                  <button
                    onClick={saveAllSettings}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: GENERAL SETTINGS & LOGO UPLOAD */}
          {/* ======================================================== */}
          {adminTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    General Settings, Logo & Maintenance
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Manage website metadata, legal coordinates, uploaded logo graphics, and maintenance switches.
                  </p>
                </div>
                <button
                  onClick={saveAllSettings}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

              {/* Maintenance Mode Card */}
              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${siteSettings.maintenance_mode ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <h3 className="text-base font-bold text-white font-['Oswald'] uppercase">
                        Emergency Maintenance Mode
                      </h3>
                    </div>
                    <p className="text-xs text-[#858585] mt-1">
                      When enabled, all customer pages are replaced with a locked maintenance splash screen. Only administrators can enter.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteSettings.maintenance_mode}
                      onChange={(e) => {
                        updateSiteSettings({ maintenance_mode: e.target.checked });
                        addToast(`Maintenance mode ${e.target.checked ? 'ENABLED' : 'DISABLED'}.`, e.target.checked ? 'error' : 'success');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {siteSettings.maintenance_mode && (
                  <div>
                    <label className="block text-xs text-[#858585] mb-1">
                      Maintenance Notice Message
                    </label>
                    <textarea
                      value={siteSettings.maintenance_message}
                      onChange={(e) => updateSiteSettings({ maintenance_message: e.target.value })}
                      rows={2}
                      className="w-full bg-[#111111] border border-[#292929] rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* Brand Logo Upload Card */}
              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Marketplace Brand Logo & Assets
                </h3>
                <ImageUploadField
                  label="Uploaded Website Logo"
                  value={siteSettings.logo_url}
                  onChange={(newVal) => updateSiteSettings({ logo_url: newVal })}
                  helperText="Upload your official transparent PNG or SVG logo. Automatically replaces default branding across the header and footer."
                />
              </div>

              {/* Site Details Card */}
              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Marketplace Identity & Localization
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#858585] mb-1">Marketplace Name</label>
                    <input
                      type="text"
                      value={siteSettings.site_name}
                      onChange={(e) => updateSiteSettings({ site_name: e.target.value })}
                      className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#858585] mb-1">Currency Symbol & Code</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={siteSettings.cur_sym}
                        onChange={(e) => updateSiteSettings({ cur_sym: e.target.value })}
                        className="bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white font-mono"
                      />
                      <input
                        type="text"
                        value={siteSettings.cur_text}
                        onChange={(e) => updateSiteSettings({ cur_text: e.target.value })}
                        className="bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#858585] mb-1">Support Contact Email</label>
                    <input
                      type="email"
                      value={siteSettings.contact_email}
                      onChange={(e) => updateSiteSettings({ contact_email: e.target.value })}
                      className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#858585] mb-1">Timezone</label>
                    <input
                      type="text"
                      value={siteSettings.time_zone}
                      onChange={(e) => updateSiteSettings({ time_zone: e.target.value })}
                      className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292929] flex justify-end">
                  <button
                    onClick={saveAllSettings}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: SEO & LEGAL POLICIES */}
          {/* ======================================================== */}
          {adminTab === 'seo' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    SEO & Policy Pages Management
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Manage search engine index meta tags and static information pages.
                  </p>
                </div>
                <button
                  onClick={saveAllSettings}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Metadata & OpenGraph
                </h3>

                <div>
                  <label className="block text-xs text-[#858585] mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={siteSettings.seo_title}
                    onChange={(e) => updateSiteSettings({ seo_title: e.target.value })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#858585] mb-1">Meta Description</label>
                  <textarea
                    value={siteSettings.seo_description}
                    onChange={(e) => updateSiteSettings({ seo_description: e.target.value })}
                    rows={2}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#858585] mb-1">Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={siteSettings.seo_keywords.join(', ')}
                    onChange={(e) => updateSiteSettings({ seo_keywords: e.target.value.split(',').map((s) => s.trim()) })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-[#292929] flex justify-end">
                  <button
                    onClick={saveAllSettings}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: AUDIT TRAIL */}
          {/* ======================================================== */}
          {adminTab === 'audit' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                    Administrative Audit Trail
                  </h2>
                  <p className="text-xs text-[#858585] mt-1">
                    Immutable activity log recording all staff balance modifications, custom approvals, impersonations, imports, and password updates.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#858585]">
                  {auditLogs.length} audit entries
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#292929] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111111] text-[#858585] font-semibold uppercase tracking-wider border-b border-[#292929]">
                      <tr>
                        <th className="py-3 px-4">Log ID</th>
                        <th className="py-3 px-4">Admin Username</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Details & Target</th>
                        <th className="py-3 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292929]">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#111111]/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-zinc-400">
                            #{log.id}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {log.admin_name}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-[#171717] border border-[#292929] text-[#C1121F] font-mono font-bold">
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-300 font-mono text-[11px]">
                            {log.details}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#858585] text-[11px]">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: SECURITY & ACCESS */}
          {/* ======================================================== */}
          {adminTab === 'security' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-['Oswald'] uppercase">
                  Master Security & Password
                </h2>
                <p className="text-xs text-[#858585] mt-1">
                  Manage master credentials and secure administrator session tokens.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#292929] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    Active Master Administrator
                  </h3>
                  <div className="p-3 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{admin.name}</div>
                      <div className="text-[#858585] font-mono">Username: @{admin.username}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      AUTHENTICATED
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292929]">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Update Security Password
                  </h3>

                  {passwordError && (
                    <div className="mb-4 p-3 rounded bg-red-950/40 border border-red-800 text-red-300 text-xs">
                      {passwordError}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-[#858585] mb-1">Current Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#858585] mb-1">New Password (min 6 characters)</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#858585] mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-xs text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#C1121F] hover:bg-[#E01B24] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Update Master Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL: CUSTOM APPROVAL AMOUNT ON DEPOSITS */}
      {/* ======================================================== */}
      {customApproveDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#292929]">
              <div>
                <h3 className="text-base font-bold text-white font-['Oswald'] uppercase">
                  Approve Deposit & Enter Exact Credit
                </h3>
                <div className="text-xs text-[#858585]">
                  Deposit TRX: <span className="font-mono text-zinc-200">{customApproveDepositModal.trx}</span>
                </div>
              </div>
              <button onClick={() => setCustomApproveDepositModal(null)} className="text-[#858585] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#111111] border border-[#292929] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#858585]">User Submitted Amount:</span>
                <span className="font-mono font-bold text-white">${(customApproveDepositModal.submitted_amount ?? customApproveDepositModal.amount).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#858585]">Network & Gateway:</span>
                <span className="font-mono text-zinc-300">{customApproveDepositModal.network || customApproveDepositModal.method_name}</span>
              </div>
            </div>

            {/* Proof thumbnail preview */}
            {customApproveDepositModal.proof_image && (
              <div className="space-y-1">
                <div className="text-[11px] text-[#858585]">Submitted Proof Receipt:</div>
                <button
                  type="button"
                  onClick={() => setViewScreenshotUrl(customApproveDepositModal.proof_image || null)}
                  className="w-full h-32 rounded-lg bg-[#111111] border border-[#292929] overflow-hidden flex items-center justify-center relative group"
                >
                  <img src={customApproveDepositModal.proof_image} alt="Proof" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white gap-1 transition-opacity">
                    <Eye className="w-4 h-4 text-[#C1121F]" />
                    <span>Click to Zoom Screenshot</span>
                  </div>
                </button>
              </div>
            )}

            {/* Custom Amount to Credit */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-white">
                Exact Amount to Credit Customer ($ USD):
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={customApproveAmount}
                onChange={(e) => setCustomApproveAmount(e.target.value)}
                className="w-full bg-[#111111] border border-[#292929] focus:border-emerald-500 rounded-lg px-3 py-2.5 text-lg font-mono font-bold text-emerald-400 outline-none"
                placeholder="e.g. 90.00"
              />
              <p className="text-[11px] text-[#858585]">
                Note: This exact figure will be credited to the customer's balance and recorded in the audit trail.
              </p>
            </div>

            <div className="pt-3 border-t border-[#292929] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCustomApproveDepositModal(null)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const amt = parseFloat(customApproveAmount);
                  if (isNaN(amt) || amt <= 0) {
                    addToast('Please enter a valid credit amount.', 'error');
                    return;
                  }
                  const res = approveDeposit(customApproveDepositModal.id, amt);
                  addToast(res.message, res.success ? 'success' : 'error');
                  if (res.success) {
                    setCustomApproveDepositModal(null);
                  }
                }}
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Confirm & Credit ${parseFloat(customApproveAmount || '0').toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: COMPREHENSIVE USER PROFILE VIEW */}
      {/* ======================================================== */}
      {activeProfileUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-3xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header with User Info & Impersonate CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#292929] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
                    Customer Profile: @{activeProfileUser.username}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    activeProfileUser.status === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {activeProfileUser.status === 1 ? 'Active' : 'Banned'}
                  </span>
                </div>
                <div className="text-xs text-[#858585] mt-0.5">
                  {activeProfileUser.firstname} {activeProfileUser.lastname} &bull; ID #{activeProfileUser.id} &bull; Joined {new Date(activeProfileUser.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const uId = activeProfileUser.id;
                    setActiveProfileUser(null);
                    loginAsUser(uId);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login as User</span>
                </button>
                <button onClick={() => setActiveProfileUser(null)} className="text-[#858585] hover:text-white">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Financial Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#292929]">
                <div className="text-[11px] text-[#858585] uppercase">Available Balance</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                  ${activeProfileUser.balance.toFixed(2)} USD
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#292929]">
                <div className="text-[11px] text-[#858585] uppercase">Total Approved Deposits</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  ${allDeposits.filter((d) => d.user_id === activeProfileUser.id && d.status === 1).reduce((acc, c) => acc + (c.approved_amount ?? c.amount), 0).toFixed(2)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#292929]">
                <div className="text-[11px] text-[#858585] uppercase">Total Cards Purchased</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  {allPurchasedCards.filter((p) => p.user_id === activeProfileUser.id).length} cards
                </div>
              </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#111111] p-4 rounded-xl border border-[#292929]">
              <div>
                <span className="text-[#858585] block text-[10px] uppercase">Email:</span>
                <span className="text-white font-medium">{activeProfileUser.email}</span>
              </div>
              <div>
                <span className="text-[#858585] block text-[10px] uppercase">Phone:</span>
                <span className="text-white font-medium">{activeProfileUser.dial_code} {activeProfileUser.mobile}</span>
              </div>
              <div>
                <span className="text-[#858585] block text-[10px] uppercase">Location:</span>
                <span className="text-white font-medium">{activeProfileUser.city || 'N/A'}, {activeProfileUser.country_name || 'US'}</span>
              </div>
              <div>
                <span className="text-[#858585] block text-[10px] uppercase">Address:</span>
                <span className="text-white font-medium">{activeProfileUser.address || 'Not specified'}</span>
              </div>
            </div>

            {/* Sub-Tabs: History */}
            <div className="space-y-3">
              <div className="flex border-b border-[#292929] gap-4 text-xs font-semibold">
                <button
                  onClick={() => setProfileHistoryTab('deposits')}
                  className={`pb-2 transition-colors ${profileHistoryTab === 'deposits' ? 'border-b-2 border-[#C1121F] text-white' : 'text-[#858585] hover:text-white'}`}
                >
                  Deposit History ({allDeposits.filter((d) => d.user_id === activeProfileUser.id).length})
                </button>
                <button
                  onClick={() => setProfileHistoryTab('purchases')}
                  className={`pb-2 transition-colors ${profileHistoryTab === 'purchases' ? 'border-b-2 border-[#C1121F] text-white' : 'text-[#858585] hover:text-white'}`}
                >
                  Purchased Cards ({allPurchasedCards.filter((p) => p.user_id === activeProfileUser.id).length})
                </button>
                <button
                  onClick={() => setProfileHistoryTab('transactions')}
                  className={`pb-2 transition-colors ${profileHistoryTab === 'transactions' ? 'border-b-2 border-[#C1121F] text-white' : 'text-[#858585] hover:text-white'}`}
                >
                  Transactions Ledger ({allTransactions.filter((t) => t.user_id === activeProfileUser.id).length})
                </button>
              </div>

              {/* History Content */}
              <div className="max-h-56 overflow-y-auto space-y-2 text-xs">
                {profileHistoryTab === 'deposits' && (
                  allDeposits.filter((d) => d.user_id === activeProfileUser.id).length > 0 ? (
                    allDeposits.filter((d) => d.user_id === activeProfileUser.id).map((dep) => (
                      <div key={dep.id} className="p-2.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between">
                        <div>
                          <div className="font-mono font-medium text-white">{dep.trx}</div>
                          <div className="text-[10px] text-[#858585]">{dep.network || dep.method_name} &bull; {dep.created_at}</div>
                          {dep.admin_feedback && <div className="text-[10px] text-zinc-300 italic mt-0.5">{dep.admin_feedback}</div>}
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-white">${(dep.approved_amount ?? dep.amount).toFixed(2)}</div>
                          <span className={`text-[10px] font-bold uppercase ${dep.status === 1 ? 'text-emerald-400' : dep.status === 2 ? 'text-amber-400' : 'text-red-400'}`}>
                            {dep.status === 1 ? 'Approved' : dep.status === 2 ? 'Pending' : 'Rejected'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500">No deposit records for this customer.</div>
                  )
                )}

                {profileHistoryTab === 'purchases' && (
                  allPurchasedCards.filter((p) => p.user_id === activeProfileUser.id).length > 0 ? (
                    allPurchasedCards.filter((p) => p.user_id === activeProfileUser.id).map((p) => (
                      <div key={p.id} className="p-2.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{p.product_name}</div>
                          <div className="text-[10px] font-mono text-zinc-400 truncate max-w-xs">{p.details}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-emerald-400">${p.price.toFixed(2)}</div>
                          <div className="text-[10px] text-[#858585]">{p.purchased_at}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500">No purchases found in vault.</div>
                  )
                )}

                {profileHistoryTab === 'transactions' && (
                  allTransactions.filter((t) => t.user_id === activeProfileUser.id).length > 0 ? (
                    allTransactions.filter((t) => t.user_id === activeProfileUser.id).map((t) => (
                      <div key={t.id} className="p-2.5 rounded-lg bg-[#111111] border border-[#292929] flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{t.details}</div>
                          <div className="text-[10px] text-[#858585] font-mono">{t.trx} &bull; {t.created_at}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-mono font-bold ${t.trx_type === '+' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {t.trx_type}${t.amount.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-[#858585]">Post: ${t.post_balance.toFixed(2)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500">No ledger transactions recorded.</div>
                  )
                )}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-3 border-t border-[#292929] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setBalanceModalUser(activeProfileUser);
                    setBalanceAction('add');
                    setBalanceAmount('50');
                    setBalanceReason('Manual balance adjustment');
                  }}
                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  Adjust Balance
                </button>
                {activeProfileUser.status === 1 ? (
                  <button
                    onClick={() => {
                      updateUserStatus(activeProfileUser.id, 0);
                      setActiveProfileUser({ ...activeProfileUser, status: 0 });
                      addToast(`User @${activeProfileUser.username} banned.`, 'info');
                    }}
                    className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-red-950 text-red-400 text-xs font-semibold"
                  >
                    Ban Customer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      updateUserStatus(activeProfileUser.id, 1);
                      setActiveProfileUser({ ...activeProfileUser, status: 1 });
                      addToast(`User @${activeProfileUser.username} unbanned.`, 'success');
                    }}
                    className="px-3 py-1.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-400 text-xs font-semibold"
                  >
                    Unban Customer
                  </button>
                )}
              </div>

              <button
                onClick={() => setActiveProfileUser(null)}
                className="px-4 py-1.5 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PAYMENT GATEWAY & VERIFIED QR */}
      {/* ======================================================== */}
      {showAddGatewayModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              {editingGateway ? 'Edit Payment Gateway' : 'Add New Payment Gateway'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Gateway Name</label>
                <input
                  type="text"
                  value={gatewayForm.name}
                  onChange={(e) => setGatewayForm({ ...gatewayForm, name: e.target.value })}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  placeholder="e.g. Binance Smart Chain (BEP20)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#858585] mb-1">Blockchain Network</label>
                  <select
                    value={gatewayForm.network || 'BEP20'}
                    onChange={(e) => setGatewayForm({ ...gatewayForm, network: e.target.value })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  >
                    <option value="BEP20">Binance Smart Chain (BEP20)</option>
                    <option value="BTC">Bitcoin Native (BTC)</option>
                    <option value="TRC20">TRON Network (TRC20)</option>
                    <option value="ERC20">Ethereum Network (ERC20)</option>
                    <option value="SOL">Solana Network (SOL)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#858585] mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={gatewayForm.currency}
                    onChange={(e) => setGatewayForm({ ...gatewayForm, currency: e.target.value.toUpperCase() })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                    placeholder="USDT / BTC / BNB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Wallet Address (Primary Destination)</label>
                <input
                  type="text"
                  value={gatewayForm.wallet_address || gatewayForm.bep20_address || gatewayForm.btc_address || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGatewayForm({
                      ...gatewayForm,
                      wallet_address: val,
                      bep20_address: gatewayForm.network === 'BEP20' ? val : gatewayForm.bep20_address,
                      btc_address: gatewayForm.network === 'BTC' ? val : gatewayForm.btc_address
                    });
                  }}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono text-xs"
                  placeholder="e.g. 0xF75fA3... or 1N15Tz..."
                />
              </div>

              {/* Dynamic QR Verification Preview */}
              {(gatewayForm.wallet_address || gatewayForm.bep20_address || gatewayForm.btc_address) && (
                <div className="p-3 bg-[#111111] rounded-xl border border-[#292929] flex items-center gap-4">
                  {(() => {
                    const target = gatewayForm.wallet_address || gatewayForm.bep20_address || gatewayForm.btc_address || '';
                    const qrResult = generateVerifiedQRCode(gatewayForm.network || 'BEP20', target);
                    return (
                      <>
                        <div className="w-20 h-20 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                          {qrResult.qrUrl ? (
                            <img src={qrResult.qrUrl} alt="QR Preview" className="w-full h-full object-contain" />
                          ) : (
                            <QrCode className="w-8 h-8 text-black" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-xs space-y-1">
                          <div className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified QR Payload Generator</span>
                          </div>
                          <div className="text-[10px] text-[#858585] truncate font-mono">
                            Payload URI: {qrResult.uri}
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            Scanned destination matches wallet address.
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#858585] mb-1">Min Deposit ($ USD)</label>
                  <input
                    type="number"
                    value={gatewayForm.min_amount}
                    onChange={(e) => setGatewayForm({ ...gatewayForm, min_amount: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#858585] mb-1">Max Deposit ($ USD)</label>
                  <input
                    type="number"
                    value={gatewayForm.max_amount}
                    onChange={(e) => setGatewayForm({ ...gatewayForm, max_amount: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Payment Instructions</label>
                <textarea
                  value={gatewayForm.instructions}
                  onChange={(e) => setGatewayForm({ ...gatewayForm, instructions: e.target.value })}
                  rows={2}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gatewayForm.is_active}
                    onChange={(e) => setGatewayForm({ ...gatewayForm, is_active: e.target.checked })}
                    className="accent-[#C1121F]"
                  />
                  <span>Active & Available on Customer Deposit Page</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setShowAddGatewayModal(false)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!gatewayForm.name.trim() || !(gatewayForm.wallet_address || gatewayForm.bep20_address || gatewayForm.btc_address)) {
                    addToast('Gateway name and wallet address are required.', 'error');
                    return;
                  }
                  if (editingGateway) {
                    updateGateway(editingGateway.code, gatewayForm);
                    addToast('Payment gateway updated.', 'success');
                  } else {
                    addGateway({
                      ...gatewayForm,
                      code: Date.now() % 100000
                    });
                    addToast('Payment gateway created and live on storefront.', 'success');
                  }
                  setShowAddGatewayModal(false);
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Save Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT CATEGORY */}
      {/* ======================================================== */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  placeholder="e.g. Visa Virtual Cards"
                />
              </div>

              {/* Image Upload for Category */}
              <ImageUploadField
                label="Category Cover Image"
                value={categoryForm.image}
                onChange={(img) => setCategoryForm({ ...categoryForm, image: img })}
                helperText="Upload image or provide URL for the category banner card."
              />

              <div>
                <label className="block text-[#858585] mb-1">Description</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={2}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryForm.featured}
                    onChange={(e) => setCategoryForm({ ...categoryForm, featured: e.target.checked })}
                    className="accent-[#C1121F]"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <select
                  value={categoryForm.status}
                  onChange={(e) => setCategoryForm({ ...categoryForm, status: Number(e.target.value) })}
                  className="bg-[#111111] border border-[#292929] rounded px-2 py-1 text-white"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!categoryForm.name.trim()) return;
                  if (editingCategory) {
                    updateCategory(editingCategory.id, categoryForm);
                    addToast('Category updated.', 'success');
                  } else {
                    addCategory(categoryForm);
                    addToast('Category created.', 'success');
                  }
                  setShowAddCategoryModal(false);
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ======================================================== */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              {editingProduct ? 'Edit Product' : 'Add New Marketplace Product'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Product Title</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  placeholder="e.g. $500 Visa Virtual Prepaid Card"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#858585] mb-1">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: Number(e.target.value) })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#858585] mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Balance Limit Label</label>
                <input
                  type="text"
                  value={productForm.limit}
                  onChange={(e) => setProductForm({ ...productForm, limit: e.target.value })}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                  placeholder="e.g. $500 Balance"
                />
              </div>

              {/* Image Upload for Product */}
              <ImageUploadField
                label="Product Showcase Image"
                value={productForm.image}
                onChange={(img) => setProductForm({ ...productForm, image: img })}
                helperText="Upload product card graphic or enter URL."
              />

              <div>
                <label className="block text-[#858585] mb-1">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={2}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Features (One per line)</label>
                <textarea
                  value={productForm.features.join('\n')}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value.split('\n').filter(Boolean) })}
                  rows={3}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!productForm.name.trim()) return;
                  if (editingProduct) {
                    updateProduct(editingProduct.id, productForm);
                    addToast('Product updated.', 'success');
                  } else {
                    addProduct({
                      ...productForm,
                      in_stock: 0
                    });
                    addToast('Product added to catalog.', 'success');
                  }
                  setShowAddProductModal(false);
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SINGLE CARD ADD */}
      {/* ======================================================== */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              Add Single Card to Vault
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Select Target Product</label>
                <select
                  value={selectedSubcategoryForCard}
                  onChange={(e) => setSelectedSubcategoryForCard(Number(e.target.value))}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                >
                  {subcategories.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (${s.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Card Credentials & Secret Data</label>
                <textarea
                  value={singleCardDetails}
                  onChange={(e) => setSingleCardDetails(e.target.value)}
                  rows={4}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono text-xs"
                  placeholder="CARD: 4532 8912 3456 7890 | EXP: 08/29 | CVV: 824 | PIN: 9912 | BALANCE: $500.00"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setShowAddCardModal(false)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!singleCardDetails.trim()) return;
                  addInventoryCard(selectedSubcategoryForCard, singleCardDetails);
                  addToast('Card loaded into vault.', 'success');
                  setShowAddCardModal(false);
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: BULK CARD IMPORT (MULTI-LINE) */}
      {/* ======================================================== */}
      {showBulkCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              Bulk Import Cards (Line-by-Line)
            </h3>
            <p className="text-xs text-[#858585]">
              Paste multiple card credentials below. Each line represents one discrete card inventory item.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Target Product</label>
                <select
                  value={selectedSubcategoryForCard}
                  onChange={(e) => setSelectedSubcategoryForCard(Number(e.target.value))}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                >
                  {subcategories.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (${s.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">
                  Card Lines (1 per card):
                </label>
                <textarea
                  value={bulkCardLines}
                  onChange={(e) => setBulkCardLines(e.target.value)}
                  rows={8}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono text-xs"
                  placeholder="CARD: 4532 8912 3456 7891 | EXP: 08/29 | CVV: 821&#10;CARD: 4532 8912 3456 7892 | EXP: 09/29 | CVV: 822&#10;CARD: 4532 8912 3456 7893 | EXP: 10/29 | CVV: 823"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setShowBulkCardModal(false)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const count = bulkAddInventoryCards(selectedSubcategoryForCard, bulkCardLines);
                  if (count > 0) {
                    addToast(`Successfully imported ${count} cards into live vault!`, 'success');
                    setShowBulkCardModal(false);
                  } else {
                    addToast('No valid lines provided.', 'error');
                  }
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Import Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: MANUAL BALANCE ADJUSTMENT */}
      {/* ======================================================== */}
      {balanceModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              Manual Balance Adjustment
            </h3>
            <p className="text-xs text-[#858585]">
              Adjusting ledger balance for <span className="text-white font-semibold">@{balanceModalUser.username}</span>. Current Balance: <span className="text-emerald-400 font-mono font-bold">${balanceModalUser.balance.toFixed(2)}</span>
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex rounded-lg overflow-hidden border border-[#292929]">
                <button
                  type="button"
                  onClick={() => setBalanceAction('add')}
                  className={`flex-1 py-2 font-semibold transition-colors ${balanceAction === 'add' ? 'bg-emerald-600 text-white' : 'bg-[#111111] text-[#858585]'}`}
                >
                  + Add Credit
                </button>
                <button
                  type="button"
                  onClick={() => setBalanceAction('deduct')}
                  className={`flex-1 py-2 font-semibold transition-colors ${balanceAction === 'deduct' ? 'bg-red-600 text-white' : 'bg-[#111111] text-[#858585]'}`}
                >
                  - Deduct Funds
                </button>
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Adjustment Amount ($ USD)</label>
                <input
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white font-mono text-base"
                />
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Reason / Ledger Remark (Mandatory)</label>
                <input
                  type="text"
                  value={balanceReason}
                  onChange={(e) => setBalanceReason(e.target.value)}
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                  placeholder="e.g. Wire transfer verified, Promotional credit"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setBalanceModalUser(null)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const amt = parseFloat(balanceAmount);
                  if (isNaN(amt) || amt <= 0) {
                    addToast('Enter a valid amount.', 'error');
                    return;
                  }
                  if (!balanceReason.trim()) {
                    addToast('Admin reason is mandatory.', 'error');
                    return;
                  }
                  const res = adjustUserBalance(balanceModalUser.id, amt, balanceAction, balanceReason);
                  addToast(res.message, res.success ? 'success' : 'error');
                  if (res.success) setBalanceModalUser(null);
                }}
                className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: REJECT DEPOSIT WITH MANDATORY FEEDBACK */}
      {/* ======================================================== */}
      {rejectDepositModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-['Oswald'] uppercase">
              Reject Deposit Request
            </h3>
            <p className="text-xs text-[#858585]">
              Provide mandatory feedback for the customer. Zero balance will be credited to their account.
            </p>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#858585] mb-1">
                Reason for Rejection (Required)
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full bg-[#111111] border border-[#292929] rounded p-2.5 text-xs text-white"
                placeholder="e.g. Transaction hash not found on blockchain explorer, or transfer amount does not match."
              />
            </div>

            <div className="pt-4 border-t border-[#292929] flex justify-end gap-2">
              <button
                onClick={() => setRejectDepositModal(null)}
                className="px-4 py-2 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!rejectReason.trim()) {
                    addToast('Rejection reason is mandatory.', 'error');
                    return;
                  }
                  const res = rejectDeposit(rejectDepositModal, rejectReason);
                  addToast(res.message, 'info');
                  setRejectDepositModal(null);
                  setRejectReason('');
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: FULL PROOF SCREENSHOT LIGHTBOX & DOWNLOAD */}
      {/* ======================================================== */}
      {viewScreenshotUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#0A0A0A] border border-[#292929] rounded-2xl p-4 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#292929] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Deposit Proof Inspection & Verification
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={viewScreenshotUrl}
                  download="REDROOM_Deposit_Proof.png"
                  className="px-2.5 py-1 rounded bg-[#171717] hover:bg-[#252525] text-zinc-300 text-xs flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setViewScreenshotUrl(null)}
                  className="text-[#858585] hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-lg bg-black flex items-center justify-center p-2">
              <img
                src={viewScreenshotUrl}
                alt="Deposit Proof"
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: INSPECT CARD DETAILS */}
      {/* ======================================================== */}
      {inspectCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#292929] rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-['Oswald'] uppercase">
                Inventory Card #{inspectCard.id}
              </h3>
              <button onClick={() => setInspectCard(null)} className="text-[#858585] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#111111] rounded-lg border border-[#292929] space-y-2 text-xs">
              <div className="text-[#858585]">Credentials & Secret Key:</div>
              <div className="font-mono text-zinc-100 bg-[#171717] p-2.5 rounded border border-[#333333] break-all select-all">
                {inspectCard.details}
              </div>
              <div className="text-[11px] text-[#858585] pt-1">
                Status: <span className="text-white font-mono uppercase">{inspectCard.status}</span> &bull; Attached user: <span className="text-white font-mono">{inspectCard.user_id}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inspectCard.details);
                  addToast('Copied to clipboard.', 'info');
                }}
                className="px-4 py-2 rounded bg-[#C1121F] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: FORCE CHANGE PASSWORD */}
      {/* ======================================================== */}
      {showPasswordChangeModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#C1121F] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#C1121F]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-['Oswald'] uppercase">
                Update Master Administrator Password
              </h3>
            </div>
            <p className="text-xs text-[#858585]">
              You must update your credentials before managing production data.
            </p>

            {passwordError && (
              <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-red-300 text-xs">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#858585] mb-1">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#858585] mb-1">New Secure Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#858585] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[#292929] rounded px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordChangeModal(false)}
                  className="px-3 py-2 rounded bg-[#171717] text-zinc-400 text-xs"
                >
                  Later
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#C1121F] hover:bg-[#E01B24] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
