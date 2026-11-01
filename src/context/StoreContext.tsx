import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Category,
  Subcategory,
  User,
  Deposit,
  Transaction,
  SupportTicket,
  SupportMessage,
  RefundRequest,
  PaymentGateway,
  AdminUser,
  SiteSettings,
  AuditLog,
  InventoryCard,
  HomepageSettings,
  DesignSettings
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_SUBCATEGORIES,
  INITIAL_GATEWAYS,
  INITIAL_ADMIN,
  SITE_SETTINGS,
  INITIAL_HOMEPAGE_SETTINGS,
  INITIAL_DESIGN_SETTINGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_INVENTORY_CARDS,
  INITIAL_USERS,
  INITIAL_TRANSACTIONS,
  INITIAL_PURCHASED_CARDS,
  INITIAL_TICKETS,
  INITIAL_TICKET_MESSAGES
} from '../data/database';

export interface PurchasedCardItem {
  id: number;
  subcategory_id: number;
  user_id: number;
  trx: string;
  product_name: string;
  price: number;
  details: string;
  purchased_at: string;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  selectedTicketId: number | null;
  setSelectedTicketId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Settings & Appearance
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  homepageSettings: HomepageSettings;
  updateHomepageSettings: (settings: Partial<HomepageSettings>) => void;
  designSettings: DesignSettings;
  updateDesignSettings: (settings: Partial<DesignSettings>) => void;

  // Catalog
  categories: Category[];
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, cat: Partial<Category>) => void;
  deleteCategory: (id: number) => { success: boolean; message: string };

  subcategories: Subcategory[];
  addProduct: (prod: Omit<Subcategory, 'id'>) => void;
  updateProduct: (id: number, prod: Partial<Subcategory>) => void;
  deleteProduct: (id: number) => { success: boolean; message: string };
  duplicateProduct: (id: number) => void;

  // Digital Inventory (cards table)
  inventoryCards: InventoryCard[];
  addInventoryCard: (subcategoryId: number, details: string) => void;
  bulkAddInventoryCards: (subcategoryId: number, rawLines: string) => number;
  deleteInventoryCard: (id: number) => void;

  // Payment Gateways
  gateways: PaymentGateway[];
  gateway: PaymentGateway; // Active default
  addGateway: (gw: PaymentGateway) => void;
  updateGateway: (code: number, gw: Partial<PaymentGateway>) => void;
  deleteGateway: (code: number) => void;
  toggleGateway: (code: number) => void;

  // Customer Auth
  user: User | null;
  users: User[];
  login: (usernameOrEmail: string, password?: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User> & { password?: string }) => boolean;
  updateProfile: (updatedData: Partial<User>) => void;
  updateUserStatus: (userId: number, status: number) => void;
  adjustUserBalance: (userId: number, amount: number, type: 'add' | 'deduct', reason: string) => { success: boolean; message: string };

  // Admin Auth, Impersonation & Controls
  admin: AdminUser | null;
  impersonatingAdmin: AdminUser | null;
  adminLogin: (usernameOrEmail: string, password?: string) => boolean;
  adminLogout: () => void;
  adminChangePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  loginAsUser: (userId: number) => { success: boolean; message: string };
  exitImpersonation: () => void;
  saveAllSettings: () => { success: boolean; message: string };
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  // Purchasing (Strict Isolation)
  allPurchasedCards: PurchasedCardItem[];
  userPurchasedCards: PurchasedCardItem[];
  purchaseCard: (subcategoryId: number) => { success: boolean; message: string; trx?: string };

  // Deposits
  allDeposits: Deposit[];
  userDeposits: Deposit[];
  submitDeposit: (
    amount: number,
    proofImage?: string,
    txHash?: string,
    gatewayCode?: number,
    network?: string,
    walletAddress?: string
  ) => { success: boolean; message: string };
  approveDeposit: (depositId: number, customCreditAmount?: number) => { success: boolean; message: string };
  rejectDeposit: (depositId: number, feedback: string) => { success: boolean; message: string };

  // Transactions
  allTransactions: Transaction[];
  userTransactions: Transaction[];

  // Support
  allTickets: SupportTicket[];
  userTickets: SupportTicket[];
  ticketMessages: Record<number, SupportMessage[]>;
  createTicket: (subject: string, priority: 1 | 2 | 3, message: string, attachments?: string[]) => { success: boolean; ticketId?: number };
  replyTicket: (ticketId: number, message: string, attachments?: string[]) => void;
  replyTicketAsAdmin: (ticketId: number, message: string) => void;
  updateTicketStatus: (ticketId: number, status: 0 | 1 | 2 | 3) => void;

  // Refunds
  allRefundRequests: RefundRequest[];
  userRefundRequests: RefundRequest[];
  createRefundRequest: (purchaseTrx: string, reason: string) => { success: boolean; message: string };
  approveRefund: (requestId: number, customRefundAmount?: number) => { success: boolean; message: string };
  rejectRefund: (requestId: number, adminNote: string) => { success: boolean; message: string };

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('redroom_settings_v4');
    return saved ? JSON.parse(saved) : SITE_SETTINGS;
  });

  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() => {
    const saved = localStorage.getItem('redroom_homepage_settings_v4');
    return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_SETTINGS;
  });

  const [designSettings, setDesignSettings] = useState<DesignSettings>(() => {
    const saved = localStorage.getItem('redroom_design_settings_v4');
    return saved ? JSON.parse(saved) : INITIAL_DESIGN_SETTINGS;
  });

  // Catalog
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('redroom_categories_v4');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [subcategories, setSubcategories] = useState<Subcategory[]>(() => {
    const saved = localStorage.getItem('redroom_subcategories_v4');
    return saved ? JSON.parse(saved) : INITIAL_SUBCATEGORIES;
  });

  // Digital Inventory Cards
  const [inventoryCards, setInventoryCards] = useState<InventoryCard[]>(() => {
    const saved = localStorage.getItem('redroom_inventory_cards_v4');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY_CARDS;
  });

  // Gateways
  const [gateways, setGateways] = useState<PaymentGateway[]>(() => {
    const saved = localStorage.getItem('redroom_gateways_v4');
    return saved ? JSON.parse(saved) : INITIAL_GATEWAYS;
  });

  const gateway = useMemo(() => {
    const active = gateways.find((g) => g.is_active !== false);
    return active || gateways[0] || INITIAL_GATEWAYS[0];
  }, [gateways]);

  // Admin Account & Password State
  const [adminPasswordHash, setAdminPasswordHash] = useState<string>(() => {
    return localStorage.getItem('redroom_admin_password_v4') || 'admin123';
  });

  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('redroom_admin_v4');
    return saved ? JSON.parse(saved) : null;
  });

  const [impersonatingAdmin, setImpersonatingAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('redroom_impersonating_admin_v4');
    return saved ? JSON.parse(saved) : null;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('redroom_audit_logs_v4');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Customer Accounts
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('redroom_users_v4');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('redroom_current_user_v4');
    return saved ? JSON.parse(saved) : null;
  });

  // Purchases, Transactions, Deposits
  const [allPurchasedCards, setAllPurchasedCards] = useState<PurchasedCardItem[]>(() => {
    const saved = localStorage.getItem('redroom_all_purchases_v4');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASED_CARDS;
  });

  const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('redroom_all_transactions_v4');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [allDeposits, setAllDeposits] = useState<Deposit[]>(() => {
    const saved = localStorage.getItem('redroom_all_deposits_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [allTickets, setAllTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('redroom_all_tickets_v4');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [ticketMessages, setTicketMessages] = useState<Record<number, SupportMessage[]>>(() => {
    const saved = localStorage.getItem('redroom_ticket_messages_v4');
    return saved ? JSON.parse(saved) : INITIAL_TICKET_MESSAGES;
  });

  const [allRefundRequests, setAllRefundRequests] = useState<RefundRequest[]>(() => {
    const saved = localStorage.getItem('redroom_all_refunds_v4');
    return saved ? JSON.parse(saved) : [];
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Logger Helper
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now(),
      admin_name: admin ? admin.username : 'Administrator',
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('redroom_settings_v4', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('redroom_homepage_settings_v4', JSON.stringify(homepageSettings));
  }, [homepageSettings]);

  useEffect(() => {
    localStorage.setItem('redroom_design_settings_v4', JSON.stringify(designSettings));
  }, [designSettings]);

  useEffect(() => {
    localStorage.setItem('redroom_categories_v4', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('redroom_subcategories_v4', JSON.stringify(subcategories));
  }, [subcategories]);

  useEffect(() => {
    localStorage.setItem('redroom_inventory_cards_v4', JSON.stringify(inventoryCards));
  }, [inventoryCards]);

  useEffect(() => {
    localStorage.setItem('redroom_gateways_v4', JSON.stringify(gateways));
  }, [gateways]);

  useEffect(() => {
    localStorage.setItem('redroom_audit_logs_v4', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('redroom_users_v4', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('redroom_current_user_v4', JSON.stringify(user));
    } else {
      localStorage.removeItem('redroom_current_user_v4');
    }
  }, [user]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('redroom_admin_v4', JSON.stringify(admin));
    } else {
      localStorage.removeItem('redroom_admin_v4');
    }
  }, [admin]);

  useEffect(() => {
    if (impersonatingAdmin) {
      localStorage.setItem('redroom_impersonating_admin_v4', JSON.stringify(impersonatingAdmin));
    } else {
      localStorage.removeItem('redroom_impersonating_admin_v4');
    }
  }, [impersonatingAdmin]);

  useEffect(() => {
    localStorage.setItem('redroom_admin_password_v4', adminPasswordHash);
  }, [adminPasswordHash]);

  useEffect(() => {
    localStorage.setItem('redroom_all_purchases_v4', JSON.stringify(allPurchasedCards));
  }, [allPurchasedCards]);

  useEffect(() => {
    localStorage.setItem('redroom_all_transactions_v4', JSON.stringify(allTransactions));
  }, [allTransactions]);

  useEffect(() => {
    localStorage.setItem('redroom_all_deposits_v4', JSON.stringify(allDeposits));
  }, [allDeposits]);

  useEffect(() => {
    localStorage.setItem('redroom_all_tickets_v4', JSON.stringify(allTickets));
  }, [allTickets]);

  useEffect(() => {
    localStorage.setItem('redroom_ticket_messages_v4', JSON.stringify(ticketMessages));
  }, [ticketMessages]);

  useEffect(() => {
    localStorage.setItem('redroom_all_refunds_v4', JSON.stringify(allRefundRequests));
  }, [allRefundRequests]);

  // STRICT PRIVACY: User-scoped getters
  const userPurchasedCards = useMemo(() => {
    if (!user) return [];
    return allPurchasedCards.filter((card) => card.user_id === user.id);
  }, [allPurchasedCards, user]);

  const userTransactions = useMemo(() => {
    if (!user) return [];
    return allTransactions.filter((tx) => tx.user_id === user.id);
  }, [allTransactions, user]);

  const userDeposits = useMemo(() => {
    if (!user) return [];
    return allDeposits.filter((dep) => dep.user_id === user.id);
  }, [allDeposits, user]);

  const userTickets = useMemo(() => {
    if (!user) return [];
    return allTickets.filter((ticket) => ticket.user_id === user.id);
  }, [allTickets, user]);

  const userRefundRequests = useMemo(() => {
    if (!user) return [];
    return allRefundRequests.filter((req) => req.user_id === user.id);
  }, [allRefundRequests, user]);

  // Customer Auth
  const login = (usernameOrEmail: string): boolean => {
    const clean = usernameOrEmail.trim().toLowerCase();
    const found = users.find(
      (u) => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
    );

    if (found) {
      if (found.status === 0) {
        addToast('Your account has been suspended by administration.', 'error');
        return false;
      }
      setUser(found);
      addToast(`Welcome back, ${found.firstname}!`, 'success');
      return true;
    }

    addToast('Account not found. Please register an account.', 'error');
    return false;
  };

  const logout = () => {
    setUser(null);
    addToast('You have signed out.', 'info');
    setCurrentPage('home');
  };

  const register = (userData: Partial<User>): boolean => {
    const cleanUsername = (userData.username || 'user').trim().toLowerCase();
    const cleanEmail = (userData.email || 'user@example.com').trim().toLowerCase();

    const exists = users.some(
      (u) => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail
    );

    if (exists) {
      addToast('Username or email already in use.', 'error');
      return false;
    }

    const newId = Date.now();
    const newUser: User = {
      id: newId,
      firstname: userData.firstname?.trim() || 'Client',
      lastname: userData.lastname?.trim() || 'User',
      username: cleanUsername,
      email: cleanEmail,
      dial_code: userData.dial_code || '+1',
      mobile: userData.mobile?.trim() || '555-010-0000',
      balance: 0.00, // Strictly zero
      country_name: userData.country_name || 'United States',
      city: userData.city || 'New York',
      address: userData.address || '',
      status: 1,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    addToast(`Account created for ${newUser.username}! Balance: $0.00.`, 'success');
    setCurrentPage('dashboard');
    return true;
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    addToast('Profile updated.', 'success');
  };

  const updateUserStatus = (userId: number, status: number) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
    if (user && user.id === userId) {
      setUser((prev) => (prev ? { ...prev, status } : null));
    }
    const action = status === 1 ? 'USER_ACTIVATED' : 'USER_BANNED';
    addAuditLog(action, `User ID #${userId} status set to ${status === 1 ? 'Active' : 'Suspended'}.`);
    addToast(`User ID #${userId} status updated to ${status === 1 ? 'Active' : 'Banned'}.`, 'info');
  };

  const adjustUserBalance = (
    userId: number,
    amount: number,
    type: 'add' | 'deduct',
    reason: string
  ): { success: boolean; message: string } => {
    const target = users.find((u) => u.id === userId);
    if (!target) return { success: false, message: 'User not found' };

    if (amount <= 0) return { success: false, message: 'Amount must be greater than zero' };

    if (type === 'deduct' && target.balance < amount) {
      return { success: false, message: `Insufficient balance ($${target.balance.toFixed(2)}) to deduct $${amount.toFixed(2)}` };
    }

    const newBalance = type === 'add'
      ? Number((target.balance + amount).toFixed(2))
      : Number((target.balance - amount).toFixed(2));

    const trx = `TRX-ADJ-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Update user
    const updatedTarget = { ...target, balance: newBalance };
    setUsers((prev) => prev.map((u) => (u.id === userId ? updatedTarget : u)));
    if (user && user.id === userId) {
      setUser(updatedTarget);
    }

    // Record audited transaction
    const newTx: Transaction = {
      id: Date.now(),
      user_id: userId,
      amount,
      charge: 0,
      post_balance: newBalance,
      trx_type: type === 'add' ? '+' : '-',
      trx,
      details: `Admin Balance Adjustment: ${reason}`,
      remark: type === 'add' ? 'admin_credit' : 'admin_debit',
      created_at: now
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    addAuditLog(
      'BALANCE_ADJUSTMENT',
      `Manual ${type.toUpperCase()} of $${amount.toFixed(2)} USD for user ${target.username} (ID #${userId}). Reason: ${reason}. Post-balance: $${newBalance.toFixed(2)}.`
    );

    addToast(`Balance ${type === 'add' ? 'credited' : 'deducted'} successfully. New balance: $${newBalance.toFixed(2)} USD.`, 'success');
    return { success: true, message: 'Balance adjusted successfully' };
  };

  // Admin Auth (Credentials: admin123 / admin123)
  const adminLogin = (usernameOrEmail: string, password?: string): boolean => {
    const clean = usernameOrEmail.trim();
    const cleanPass = password?.trim() || '';

    // Check credentials (admin123 or legacy Web)
    const isUserMatch = clean === 'admin123' || clean.toLowerCase() === 'admin' || clean.toLowerCase() === 'web';
    const isPassMatch = cleanPass === adminPasswordHash || (adminPasswordHash === 'admin123' && cleanPass === 'admin123');

    if (isUserMatch && isPassMatch) {
      const isInitialPass = adminPasswordHash === 'admin123';
      const adminObj: AdminUser = {
        ...INITIAL_ADMIN,
        username: clean,
        mustChangePassword: isInitialPass
      };
      setAdmin(adminObj);
      addAuditLog('ADMIN_LOGIN', `Admin user "${clean}" authenticated successfully.`);
      addToast('Administrator session established.', 'success');
      return true;
    }

    addAuditLog('FAILED_ADMIN_LOGIN', `Failed login attempt with identifier "${clean}".`);
    addToast('Invalid administrator credentials.', 'error');
    return false;
  };

  const adminLogout = () => {
    if (admin) {
      addAuditLog('ADMIN_LOGOUT', `Admin "${admin.username}" signed out.`);
    }
    setAdmin(null);
    addToast('Admin signed out.', 'info');
  };

  const adminChangePassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    if (oldPass !== adminPasswordHash) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }
    if (newPass === 'admin123') {
      return { success: false, message: 'You cannot reuse the default "admin123" password.' };
    }

    setAdminPasswordHash(newPass);
    if (admin) {
      setAdmin({ ...admin, mustChangePassword: false });
    }
    addAuditLog('ADMIN_PASSWORD_CHANGED', 'Administrator updated their master password.');
    addToast('Admin password changed successfully. Must-change flag cleared.', 'success');
    return { success: true, message: 'Password updated successfully' };
  };

  // Login as User (Impersonation Mode)
  const loginAsUser = (userId: number): { success: boolean; message: string } => {
    const activeAdmin = admin || impersonatingAdmin;
    if (!activeAdmin) {
      addToast('Only authenticated administrators can impersonate users.', 'error');
      return { success: false, message: 'Admin authentication required' };
    }

    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) {
      addToast('Target customer account not found.', 'error');
      return { success: false, message: 'User not found' };
    }

    setImpersonatingAdmin(activeAdmin);
    setUser(targetUser);
    setCurrentPage('dashboard');
    setDashboardTab('overview');

    addAuditLog(
      'ADMIN_IMPERSONATION',
      `Admin "${activeAdmin.username}" initiated session acting as customer @${targetUser.username} (ID #${targetUser.id}).`
    );
    addToast(`Now acting as customer @${targetUser.username}.`, 'info');
    return { success: true, message: 'Impersonation active' };
  };

  const exitImpersonation = () => {
    if (!impersonatingAdmin) return;
    const customerUsername = user?.username || 'user';
    addAuditLog(
      'ADMIN_IMPERSONATION_ENDED',
      `Admin "${impersonatingAdmin.username}" concluded session for customer @${customerUsername}.`
    );
    setAdmin(impersonatingAdmin);
    setImpersonatingAdmin(null);
    setCurrentPage('admin');
    setAdminTab('customers');
    addToast('Returned to Central Administrator Console.', 'success');
  };

  // Global Settings Save
  const saveAllSettings = (): { success: boolean; message: string } => {
    try {
      localStorage.setItem('redroom_settings_v4', JSON.stringify(siteSettings));
      localStorage.setItem('redroom_homepage_settings_v4', JSON.stringify(homepageSettings));
      localStorage.setItem('redroom_design_settings_v4', JSON.stringify(designSettings));
      localStorage.setItem('redroom_gateways_v4', JSON.stringify(gateways));
      localStorage.setItem('redroom_categories_v4', JSON.stringify(categories));
      localStorage.setItem('redroom_subcategories_v4', JSON.stringify(subcategories));
      addAuditLog('SETTINGS_SAVED', 'All marketplace settings and visual configurations committed to database.');
      addToast('All configurations and settings saved successfully!', 'success');
      return { success: true, message: 'Settings saved' };
    } catch (e) {
      addToast('Error saving settings to storage.', 'error');
      return { success: false, message: 'Storage write failed' };
    }
  };

  // Category Management
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newId = Date.now();
    const newCat: Category = { ...cat, id: newId };
    setCategories((prev) => [...prev, newCat]);
    addAuditLog('CATEGORY_ADDED', `Created category "${cat.name}".`);
    addToast(`Category "${cat.name}" added successfully.`, 'success');
  };

  const updateCategory = (id: number, cat: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...cat } : c)));
    addAuditLog('CATEGORY_UPDATED', `Updated category ID #${id}.`);
    addToast('Category updated.', 'success');
  };

  const deleteCategory = (id: number): { success: boolean; message: string } => {
    const hasProducts = subcategories.some((s) => s.category_id === id);
    if (hasProducts) {
      addToast('Cannot delete category: it currently contains active products. Reassign or delete products first.', 'error');
      return { success: false, message: 'Category contains active products' };
    }
    const target = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditLog('CATEGORY_DELETED', `Deleted category "${target?.name || id}".`);
    addToast(`Category "${target?.name || id}" removed.`, 'info');
    return { success: true, message: 'Category deleted' };
  };

  // Product Management
  const addProduct = (prod: Omit<Subcategory, 'id'>) => {
    const newId = Date.now();
    const cat = categories.find((c) => c.id === prod.category_id);
    const newProd: Subcategory = {
      ...prod,
      id: newId,
      category_name: cat?.name || 'General'
    };
    setSubcategories((prev) => [newProd, ...prev]);
    addAuditLog('PRODUCT_ADDED', `Created product "${prod.name}" (Price: $${prod.price.toFixed(2)} USD).`);
    addToast(`Product "${prod.name}" created.`, 'success');
  };

  const updateProduct = (id: number, prod: Partial<Subcategory>) => {
    setSubcategories((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const cat = prod.category_id ? categories.find((c) => c.id === prod.category_id) : undefined;
          return {
            ...p,
            ...prod,
            category_name: cat ? cat.name : p.category_name
          };
        }
        return p;
      })
    );
    addAuditLog('PRODUCT_UPDATED', `Updated product ID #${id}.`);
    addToast('Product details updated.', 'success');
  };

  const deleteProduct = (id: number): { success: boolean; message: string } => {
    const target = subcategories.find((p) => p.id === id);
    setSubcategories((prev) => prev.filter((p) => p.id !== id));
    // Also remove unsold inventory cards
    setInventoryCards((prev) => prev.filter((c) => !(c.subcategory_id === id && c.status === 'available')));
    addAuditLog('PRODUCT_DELETED', `Deleted product "${target?.name || id}".`);
    addToast(`Product "${target?.name || id}" deleted.`, 'info');
    return { success: true, message: 'Product deleted' };
  };

  const duplicateProduct = (id: number) => {
    const target = subcategories.find((p) => p.id === id);
    if (!target) return;
    const newId = Date.now();
    const clone: Subcategory = {
      ...target,
      id: newId,
      name: `${target.name} (Copy)`,
      in_stock: 0
    };
    setSubcategories((prev) => [clone, ...prev]);
    addAuditLog('PRODUCT_DUPLICATED', `Duplicated product "${target.name}" -> "${clone.name}".`);
    addToast(`Product duplicated as "${clone.name}".`, 'success');
  };

  // Digital Inventory (cards table)
  const addInventoryCard = (subcategoryId: number, details: string) => {
    const newCard: InventoryCard = {
      id: Date.now(),
      subcategory_id: subcategoryId,
      user_id: 0,
      trx: null,
      details: details.trim(),
      status: 'available',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setInventoryCards((prev) => [newCard, ...prev]);
    // Increment product in_stock
    setSubcategories((prev) =>
      prev.map((p) => (p.id === subcategoryId ? { ...p, in_stock: p.in_stock + 1 } : p))
    );
    addAuditLog('INVENTORY_ITEM_ADDED', `Added 1 digital card to product #${subcategoryId}.`);
    addToast('Inventory card added to stock.', 'success');
  };

  const bulkAddInventoryCards = (subcategoryId: number, rawLines: string): number => {
    const lines = rawLines
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 5);

    if (lines.length === 0) {
      addToast('No valid card data found in input lines.', 'error');
      return 0;
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newItems: InventoryCard[] = lines.map((line, idx) => ({
      id: Date.now() + idx,
      subcategory_id: subcategoryId,
      user_id: 0,
      trx: null,
      details: line,
      status: 'available',
      created_at: now
    }));

    setInventoryCards((prev) => [...newItems, ...prev]);
    setSubcategories((prev) =>
      prev.map((p) => (p.id === subcategoryId ? { ...p, in_stock: p.in_stock + lines.length } : p))
    );

    addAuditLog('INVENTORY_BULK_ADDED', `Bulk uploaded ${lines.length} inventory cards for product ID #${subcategoryId}.`);
    addToast(`Successfully added ${lines.length} inventory cards to product stock!`, 'success');
    return lines.length;
  };

  const deleteInventoryCard = (id: number) => {
    const card = inventoryCards.find((c) => c.id === id);
    if (!card) return;
    if (card.status === 'sold') {
      addToast('Cannot delete sold inventory item: it belongs to customer purchase history.', 'error');
      return;
    }

    setInventoryCards((prev) => prev.filter((c) => c.id !== id));
    setSubcategories((prev) =>
      prev.map((p) => (p.id === card.subcategory_id ? { ...p, in_stock: Math.max(0, p.in_stock - 1) } : p))
    );
    addAuditLog('INVENTORY_CARD_REMOVED', `Removed unsold inventory card ID #${id}.`);
    addToast('Inventory item removed.', 'info');
  };

  // Payment Gateways CRUD
  const addGateway = (gw: PaymentGateway) => {
    setGateways((prev) => [...prev, gw]);
    addAuditLog('GATEWAY_ADDED', `Added payment gateway "${gw.name}".`);
    addToast(`Payment gateway "${gw.name}" added.`, 'success');
  };

  const updateGateway = (code: number, gw: Partial<PaymentGateway>) => {
    setGateways((prev) => prev.map((g) => (g.code === code ? { ...g, ...gw } : g)));
    addAuditLog('GATEWAY_UPDATED', `Updated gateway code #${code}.`);
    addToast('Payment gateway updated.', 'success');
  };

  const deleteGateway = (code: number) => {
    setGateways((prev) => prev.filter((g) => g.code !== code));
    addAuditLog('GATEWAY_DELETED', `Deleted gateway code #${code}.`);
    addToast('Payment gateway deleted.', 'info');
  };

  const toggleGateway = (code: number) => {
    setGateways((prev) =>
      prev.map((g) => (g.code === code ? { ...g, is_active: g.is_active === false } : g))
    );
    addAuditLog('GATEWAY_TOGGLED', `Toggled gateway code #${code}.`);
    addToast('Gateway status toggled.', 'info');
  };

  // Purchasing with REAL inventory card allocation
  const purchaseCard = (subcategoryId: number): { success: boolean; message: string; trx?: string } => {
    if (!user) {
      addToast('Please login to purchase.', 'error');
      setCurrentPage('login');
      return { success: false, message: 'Authentication required' };
    }

    const product = subcategories.find((p) => p.id === subcategoryId);
    if (!product) {
      addToast('Product not found.', 'error');
      return { success: false, message: 'Product not found' };
    }

    if (product.in_stock <= 0) {
      addToast('This product is out of stock.', 'error');
      return { success: false, message: 'Out of stock' };
    }

    if (user.balance < product.price) {
      const shortage = (product.price - user.balance).toFixed(2);
      addToast(`Insufficient balance ($${user.balance.toFixed(2)}). You need $${shortage} more. Submit a deposit and wait for admin approval.`, 'error');
      setCurrentPage('dashboard');
      setDashboardTab('deposit');
      return { success: false, message: 'Insufficient balance' };
    }

    const newBalance = Number((user.balance - product.price).toFixed(2));
    const trx = `TRX-PUR-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Pull legitimate available inventory card if exists, or generate fresh allocation
    const availableCardIndex = inventoryCards.findIndex(
      (c) => c.subcategory_id === subcategoryId && c.status === 'available'
    );

    let cardDetails = '';
    if (availableCardIndex !== -1) {
      const targetCard = inventoryCards[availableCardIndex];
      cardDetails = targetCard.details;
      // Mark inventory card as sold to this user
      setInventoryCards((prev) =>
        prev.map((c) =>
          c.id === targetCard.id
            ? { ...c, user_id: user.id, trx, status: 'sold', purchased_at: now }
            : c
        )
      );
    } else {
      const binPrefix = product.name.toLowerCase().includes('mastercard') ? '5412' : product.name.toLowerCase().includes('amex') ? '3782' : '4217';
      const randDigits = Math.floor(100000000000 + Math.random() * 900000000000);
      const expMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const expYear = String(Math.floor(Math.random() * 4) + 28);
      const cvv = Math.floor(100 + Math.random() * 900);
      const pin = Math.floor(1000 + Math.random() * 9000);

      cardDetails = `CARD: ${binPrefix}-${String(randDigits).slice(0, 4)}-${String(randDigits).slice(4, 8)}-${String(randDigits).slice(8, 12)} | EXP: ${expMonth}/${expYear} | CVV: ${cvv} | PIN: ${pin} | HOLDER: ${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()} | ISSUER: ${product.name.split('(')[0].trim().toUpperCase()} | STATUS: ACTIVE & VERIFIED`;
    }

    // 1. Deduct user balance
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    // 2. Decrement product stock
    setSubcategories((prev) =>
      prev.map((item) =>
        item.id === subcategoryId ? { ...item, in_stock: Math.max(0, item.in_stock - 1) } : item
      )
    );

    // 3. Bind digital card to this user ID ONLY
    const newPurchase: PurchasedCardItem = {
      id: Date.now(),
      subcategory_id: subcategoryId,
      user_id: user.id,
      trx,
      product_name: product.name,
      price: product.price,
      details: cardDetails,
      purchased_at: now,
      created_at: now
    };
    setAllPurchasedCards((prev) => [newPurchase, ...prev]);

    // 4. Log transaction
    const newTx: Transaction = {
      id: Date.now(),
      user_id: user.id,
      amount: product.price,
      charge: 0,
      post_balance: newBalance,
      trx_type: '-',
      trx,
      details: `Purchased ${product.name}`,
      remark: 'card_purchased',
      created_at: now
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    addToast(`Purchase successful! ${product.name} delivered to your private vault.`, 'success');
    return { success: true, message: 'Purchase complete', trx };
  };

  // Deposit Flow
  const submitDeposit = (
    amount: number,
    proofImage?: string,
    txHash?: string,
    gatewayCode?: number,
    network?: string,
    walletAddress?: string
  ): { success: boolean; message: string } => {
    if (!user) {
      addToast('Please login to deposit funds.', 'error');
      return { success: false, message: 'Authentication required' };
    }

    const selectedGw = (gatewayCode ? gateways.find((g) => g.code === gatewayCode) : null) || gateway;

    if (amount < selectedGw.min_amount) {
      addToast(`Minimum deposit is $${selectedGw.min_amount.toFixed(2)} USD.`, 'error');
      return { success: false, message: 'Below minimum' };
    }

    if (amount > selectedGw.max_amount) {
      addToast(`Maximum deposit is $${selectedGw.max_amount.toFixed(2)} USD.`, 'error');
      return { success: false, message: 'Above maximum' };
    }

    const charge = Number(((amount * selectedGw.percent_charge) / 100).toFixed(2));
    const finalAmount = Number((amount + charge).toFixed(2));
    const trx = txHash && txHash.trim() ? txHash.trim() : `TRX-DEP-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const targetAddress = walletAddress || selectedGw.wallet_address || selectedGw.bep20_address || selectedGw.btc_address;

    const newDeposit: Deposit = {
      id: Date.now(),
      user_id: user.id,
      method_code: selectedGw.code,
      method_name: selectedGw.name,
      amount,
      submitted_amount: amount,
      approved_amount: 0,
      charge,
      final_amount: finalAmount,
      currency: selectedGw.currency,
      network: network || selectedGw.network || 'Crypto Network',
      wallet_address: targetAddress,
      btc_wallet: targetAddress,
      trx,
      status: 2, // Pending
      proof_image: proofImage,
      admin_feedback: 'Submitted — Awaiting Administrator Review & Approval.',
      created_at: now
    };

    setAllDeposits((prev) => [newDeposit, ...prev]);
    addToast('Deposit submitted! Status is PENDING. Funds will only be credited upon verified Admin approval.', 'info');
    return { success: true, message: 'Deposit submitted with Pending status' };
  };

  const approveDeposit = (depositId: number, customCreditAmount?: number): { success: boolean; message: string } => {
    const dep = allDeposits.find((d) => d.id === depositId);
    if (!dep) return { success: false, message: 'Deposit not found' };

    if (dep.status === 1) {
      addToast('This deposit has already been approved and credited. Duplicate credit blocked.', 'error');
      return { success: false, message: 'Already approved' };
    }

    if (dep.status === 3) {
      addToast('Cannot approve a previously rejected deposit.', 'error');
      return { success: false, message: 'Deposit already rejected' };
    }

    const recipient = users.find((u) => u.id === dep.user_id);
    if (!recipient) return { success: false, message: 'User not found' };

    const submittedAmt = dep.submitted_amount ?? dep.amount;
    const creditAmount = customCreditAmount !== undefined && customCreditAmount > 0
      ? Number(customCreditAmount.toFixed(2))
      : submittedAmt;

    const newBalance = Number((recipient.balance + creditAmount).toFixed(2));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const updatedRecipient = { ...recipient, balance: newBalance };
    setUsers((prev) => prev.map((u) => (u.id === recipient.id ? updatedRecipient : u)));
    if (user && user.id === recipient.id) {
      setUser(updatedRecipient);
    }

    setAllDeposits((prev) =>
      prev.map((d) =>
        d.id === depositId
          ? {
              ...d,
              status: 1,
              amount: creditAmount,
              approved_amount: creditAmount,
              final_amount: creditAmount,
              reviewer_admin_id: admin?.id || 1,
              reviewed_at: now,
              admin_feedback: `Approved by Admin (${admin?.username || 'admin'}) at ${now}. Submitted: $${submittedAmt.toFixed(2)} USD | Credited: $${creditAmount.toFixed(2)} USD.`
            }
          : d
      )
    );

    const newTx: Transaction = {
      id: Date.now(),
      user_id: recipient.id,
      amount: creditAmount,
      charge: dep.charge,
      post_balance: newBalance,
      trx_type: '+',
      trx: dep.trx,
      details: `Admin Approved Deposit via ${dep.method_name} (Submitted: $${submittedAmt.toFixed(2)} → Credited: $${creditAmount.toFixed(2)})`,
      remark: 'deposit_approved',
      created_at: now
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    addAuditLog(
      'DEPOSIT_APPROVED',
      `Admin "${admin?.username || 'admin'}" approved deposit ${dep.trx} for user @${recipient.username}. Submitted: $${submittedAmt.toFixed(2)} USD | Credited: $${creditAmount.toFixed(2)} USD.`
    );
    addToast(`Deposit approved! Exactly $${creditAmount.toFixed(2)} USD credited to @${recipient.username}.`, 'success');
    return { success: true, message: `Deposit approved: credited $${creditAmount.toFixed(2)}` };
  };

  const rejectDeposit = (depositId: number, feedback: string): { success: boolean; message: string } => {
    const cleanReason = (feedback || '').trim();
    if (!cleanReason) {
      addToast('A rejection reason is strictly required.', 'error');
      return { success: false, message: 'Rejection reason is required' };
    }

    const dep = allDeposits.find((d) => d.id === depositId);
    if (!dep) return { success: false, message: 'Deposit not found' };

    if (dep.status === 1) {
      addToast('Cannot reject an already approved deposit.', 'error');
      return { success: false, message: 'Already approved' };
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setAllDeposits((prev) =>
      prev.map((d) =>
        d.id === depositId
          ? {
              ...d,
              status: 3,
              admin_feedback: `Rejected by Admin (${admin?.username || 'admin'}): ${cleanReason}`,
              reviewer_admin_id: admin?.id || 1,
              reviewed_at: now
            }
          : d
      )
    );

    addAuditLog(
      'DEPOSIT_REJECTED',
      `Admin "${admin?.username || 'admin'}" rejected deposit ${dep.trx} (Submitted: $${(dep.submitted_amount ?? dep.amount).toFixed(2)} USD). Reason: "${cleanReason}". Zero balance credited.`
    );
    addToast(`Deposit ${dep.trx} rejected. Reason saved to user history.`, 'info');
    return { success: true, message: 'Deposit rejected' };
  };

  // Refund Management
  const createRefundRequest = (purchaseTrx: string, reason: string): { success: boolean; message: string } => {
    if (!user) return { success: false, message: 'Authentication required' };

    const purchase = userPurchasedCards.find((p) => p.trx === purchaseTrx);
    if (!purchase) {
      return { success: false, message: 'Purchase transaction not found in your account' };
    }

    const existing = userRefundRequests.find((r) => r.purchase_trx === purchaseTrx);
    if (existing) {
      return { success: false, message: 'A refund request for this purchase is already pending' };
    }

    const newReq: RefundRequest = {
      id: Date.now(),
      user_id: user.id,
      purchase_trx: purchaseTrx,
      product_name: purchase.product_name,
      amount: purchase.price,
      reason,
      status: 'pending',
      admin_note: 'Request recorded in client queue. Under administrative audit.',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setAllRefundRequests((prev) => [newReq, ...prev]);
    addToast('Refund request submitted for administrator review.', 'info');
    return { success: true, message: 'Refund request logged' };
  };

  const approveRefund = (requestId: number, customRefundAmount?: number): { success: boolean; message: string } => {
    const req = allRefundRequests.find((r) => r.id === requestId);
    if (!req) return { success: false, message: 'Refund request not found' };

    if (req.status === 'approved') return { success: false, message: 'Already approved' };

    const targetUser = users.find((u) => u.id === req.user_id);
    if (!targetUser) return { success: false, message: 'User not found' };

    // Standard 20% platform deduction = 80% credited back, or custom amount
    const refundCredit = customRefundAmount !== undefined ? customRefundAmount : Number((req.amount * 0.8).toFixed(2));
    const newBalance = Number((targetUser.balance + refundCredit).toFixed(2));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const updatedUser = { ...targetUser, balance: newBalance };
    setUsers((prev) => prev.map((u) => (u.id === targetUser.id ? updatedUser : u)));
    if (user && user.id === targetUser.id) {
      setUser(updatedUser);
    }

    setAllRefundRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'approved',
              admin_note: `Approved by Admin on ${now}. Credited $${refundCredit.toFixed(2)} USD (20% fee applied).`
            }
          : r
      )
    );

    const newTx: Transaction = {
      id: Date.now(),
      user_id: targetUser.id,
      amount: refundCredit,
      charge: Number((req.amount - refundCredit).toFixed(2)),
      post_balance: newBalance,
      trx_type: '+',
      trx: `TRX-REF-${Math.floor(1000000 + Math.random() * 9000000)}`,
      details: `Refund approved for ${req.product_name} (${req.purchase_trx})`,
      remark: 'refund_approved',
      created_at: now
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    addAuditLog('REFUND_APPROVED', `Approved refund for ${req.product_name}. Credited $${refundCredit.toFixed(2)} to ${targetUser.username}.`);
    addToast(`Refund approved. $${refundCredit.toFixed(2)} credited to ${targetUser.username}.`, 'success');
    return { success: true, message: 'Refund approved' };
  };

  const rejectRefund = (requestId: number, adminNote: string): { success: boolean; message: string } => {
    const req = allRefundRequests.find((r) => r.id === requestId);
    if (!req) return { success: false, message: 'Refund request not found' };

    setAllRefundRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'declined', admin_note: adminNote || 'Declined: Card was successfully verified.' }
          : r
      )
    );

    addAuditLog('REFUND_REJECTED', `Declined refund request #${requestId} for ${req.product_name}. Reason: ${adminNote}.`);
    addToast('Refund request declined.', 'info');
    return { success: true, message: 'Refund declined' };
  };

  // Support
  const createTicket = (
    subject: string,
    priority: 1 | 2 | 3,
    message: string,
    attachments?: string[]
  ): { success: boolean; ticketId?: number } => {
    if (!user) {
      addToast('Please login to create a support ticket.', 'error');
      return { success: false };
    }

    const ticketNumber = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketId = Date.now();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newTicket: SupportTicket = {
      id: ticketId,
      user_id: user.id,
      ticket: ticketNumber,
      subject,
      status: 0,
      priority,
      last_reply: now,
      created_at: now
    };

    const firstMessage: SupportMessage = {
      id: Date.now(),
      support_ticket_id: ticketId,
      admin_id: 0,
      message,
      attachments,
      created_at: now
    };

    setAllTickets((prev) => [newTicket, ...prev]);
    setTicketMessages((prev) => ({ ...prev, [ticketId]: [firstMessage] }));
    addToast(`Support ticket ${ticketNumber} opened.`, 'success');
    return { success: true, ticketId };
  };

  const replyTicket = (ticketId: number, message: string, attachments?: string[]) => {
    if (!user) return;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newMsg: SupportMessage = {
      id: Date.now(),
      support_ticket_id: ticketId,
      admin_id: 0,
      message,
      attachments,
      created_at: now
    };

    setTicketMessages((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), newMsg]
    }));

    setAllTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 2, last_reply: now } : t))
    );
    addToast('Reply sent.', 'info');
  };

  const replyTicketAsAdmin = (ticketId: number, message: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newMsg: SupportMessage = {
      id: Date.now(),
      support_ticket_id: ticketId,
      admin_id: 1, // Staff
      message,
      created_at: now
    };

    setTicketMessages((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), newMsg]
    }));

    setAllTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 1, last_reply: now } : t))
    );

    addAuditLog('TICKET_REPLIED', `Administrator replied to ticket #${ticketId}.`);
    addToast('Staff response sent to ticket.', 'success');
  };

  const updateTicketStatus = (ticketId: number, status: 0 | 1 | 2 | 3) => {
    setAllTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status } : t)));
    addAuditLog('TICKET_STATUS_UPDATED', `Ticket #${ticketId} status changed to ${status}.`);
    addToast('Ticket status updated.', 'info');
  };

  // Appearance & Settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog('SITE_SETTINGS_UPDATED', 'Updated general website configuration and SEO parameters.');
    addToast('Site settings saved and applied to frontend.', 'success');
  };

  const updateHomepageSettings = (settings: Partial<HomepageSettings>) => {
    setHomepageSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog('HOMEPAGE_SETTINGS_UPDATED', 'Updated homepage hero and sections configuration.');
    addToast('Homepage configuration updated.', 'success');
  };

  const updateDesignSettings = (settings: Partial<DesignSettings>) => {
    setDesignSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog('DESIGN_SETTINGS_UPDATED', 'Updated theme color palette and typography styles.');
    addToast('Design customization applied.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        adminTab,
        setAdminTab,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryId,
        setSelectedCategoryId,
        dashboardTab,
        setDashboardTab,
        selectedTicketId,
        setSelectedTicketId,
        searchQuery,
        setSearchQuery,
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
        gateway,
        addGateway,
        updateGateway,
        deleteGateway,
        toggleGateway,
        user,
        users,
        login,
        logout,
        register,
        updateProfile,
        updateUserStatus,
        adjustUserBalance,
        admin,
        impersonatingAdmin,
        adminLogin,
        adminLogout,
        adminChangePassword,
        loginAsUser,
        exitImpersonation,
        saveAllSettings,
        auditLogs,
        addAuditLog,
        allPurchasedCards,
        userPurchasedCards,
        purchaseCard,
        allDeposits,
        userDeposits,
        submitDeposit,
        approveDeposit,
        rejectDeposit,
        allTransactions,
        userTransactions,
        allTickets,
        userTickets,
        ticketMessages,
        createTicket,
        replyTicket,
        replyTicketAsAdmin,
        updateTicketStatus,
        allRefundRequests,
        userRefundRequests,
        createRefundRequest,
        approveRefund,
        rejectRefund,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
