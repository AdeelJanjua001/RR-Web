import {
  Category,
  Subcategory,
  PaymentGateway,
  User,
  Transaction,
  SupportTicket,
  SupportMessage,
  AdminUser,
  SiteSettings,
  AuditLog,
  InventoryCard,
  HomepageSettings,
  DesignSettings,
  SocialLink,
  PageSeoConfig
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'For Binance Withdrawal',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Pre-activated virtual and debit cards optimized for seamless Binance crypto exchange withdrawals and fiat conversions.'
  },
  {
    id: 2,
    name: 'For Crypto',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Universal crypto on/off-ramp prepaid solutions designed for decentralized asset management.'
  },
  {
    id: 3,
    name: 'For Every Shoping Platform',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Multi-store digital prepaid cards accepted worldwide across e-commerce checkouts with 3DS security.'
  },
  {
    id: 4,
    name: 'For Online Purchasing at Any Site',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'High-tier bank verified virtual cards featuring zero merchant restrictions and instant balance authorization.'
  },
  {
    id: 5,
    name: 'For PayPal (Withdrawal)',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Direct PayPal wallet-linkable prepaid Mastercards and American Express solutions for instant transfers.'
  },
  {
    id: 6,
    name: 'For Apple',
    image: 'https://images.unsplash.com/photo-1510519138171-c70d76fe9f14?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Verified USA bank-issued cards ready for immediate Apple Pay, App Store, and iCloud billing binding.'
  },
  {
    id: 7,
    name: 'For Titkok Coins',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Instant TikTok coins recharge virtual cards with low denomination requirements and quick processing.'
  },
  {
    id: 8,
    name: 'For Meta Ads / Other Ads',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Dedicated ad campaign virtual debit cards with high balance limits to prevent campaign pause.'
  },
  {
    id: 9,
    name: 'For Amazon',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Amazon AWS and marketplace compatible verified payment cards with reliable billing verification.'
  },
  {
    id: 10,
    name: 'For Flipcart Shopping',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Tailored payment options for Indian and regional e-commerce stores with verified billing setup.'
  },
  {
    id: 11,
    name: 'Redot Pay (Withdrawal)',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'High balance RedotPay linked digital Visa cards with global crypto withdrawal limits.'
  },
  {
    id: 12,
    name: 'For Every Crypto Platform',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Exclusive American Express Golden and Black cards with premium balances for elite digital operations.'
  },
  {
    id: 13,
    name: 'PUBG UC / FREE FIRE DIAMOND',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    featured: true,
    status: 1,
    description: 'Game top-up payment cards for global server in-app purchases and digital currency acquisition.'
  }
];

export const INITIAL_SUBCATEGORIES: Subcategory[] = [
  {
    id: 1,
    category_id: 4,
    category_name: 'For Online Purchasing at Any Site',
    name: 'J Trust Royal Bank (Minimum 3600$)',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 14,
    limit: '$3,600 USD Minimum Balance / Limit',
    description: 'Pre-activated international card issued by J Trust Royal Bank. Comes with online portal access, 3D secure SMS/email verification token, and global POS/online usability.',
    features: ['Min $3,600 verified credit/balance', 'Immediate digital delivery upon purchase', 'Full CVV, Expiry, and Cardholder credentials', 'Zero fraud chargeback liability']
  },
  {
    id: 2,
    category_id: 5,
    category_name: 'For PayPal (Withdrawal)',
    name: 'Mastercard (Limit Minimum 2100$)',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 22,
    limit: '$2,100 USD Minimum Limit',
    description: 'Optimized Mastercard configured specifically for seamless PayPal wallet linkage and instant fund withdrawal without account flagging.',
    features: ['Instant PayPal link verification code included', '$2,100 pre-loaded / spendable limit', 'Global online checkout compatibility', '24/7 activation support']
  },
  {
    id: 3,
    category_id: 4,
    category_name: 'For Online Purchasing at Any Site',
    name: 'Royal Trust Gaming (Minimum 1000$)',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 19,
    limit: '$1,000 USD Minimum Limit',
    description: 'Budget-friendly digital card crafted for gaming stores, Steam, PlayStation Network, Xbox, and Epic Games online checkouts.',
    features: ['Instant delivery to account dashboard', 'Pre-authorized for microtransactions', 'Clean anonymous digital credentials', 'Immediate usability']
  },
  {
    id: 6,
    category_id: 4,
    category_name: 'For Online Purchasing at Any Site',
    name: 'Stanbic Visa Cards (Minimum 3000$)',
    price: 70.00,
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 8,
    limit: '$3,000 USD Minimum Limit',
    description: 'Premium tier Stanbic Bank Visa card suited for high-value e-commerce checkouts, SaaS subscriptions, and digital services globally.',
    features: ['High limit $3,000 tier', 'Instant digital issuance with secure token', 'Full billing address and zip matching', 'Priority support assistance']
  },
  {
    id: 7,
    category_id: 9,
    category_name: 'For Amazon',
    name: 'Royal Bank Visa Cards (Minimum 2000$)',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 15,
    limit: '$2,000 USD Minimum Limit',
    description: 'Verified Visa issued by Royal Bank, proven to pass Amazon 1-Click order confirmation and subscription renews without triggering verification holds.',
    features: ['Verified for Amazon US/UK/DE/JP', '$2,000 spending power', 'Zero recurring merchant lockouts', 'Includes full CVV/Exp']
  },
  {
    id: 8,
    category_id: 9,
    category_name: 'For Amazon',
    name: 'Trust Royal (Minimum 2600$)',
    price: 70.00,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 11,
    limit: '$2,600 USD Minimum Limit',
    description: 'High-balance Trust Royal card offering expanded limits for bulk physical Amazon orders and high-value tech purchases.',
    features: ['Enhanced limit of $2,600', 'Compatible with global Amazon domains', 'Clean non-blacklisted BIN code', 'Instant credentials delivery']
  },
  {
    id: 11,
    category_id: 5,
    category_name: 'For PayPal (Withdrawal)',
    name: 'PayPal American Express (Minimum 1800$)',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 7,
    limit: '$1,800 USD Minimum Limit',
    description: 'American Express branded card linked to PayPal withdrawal systems. High transfer speed and swift account verification.',
    features: ['American Express network benefits', 'Direct PayPal wallet compatibility', 'Rapid confirmation numbers', 'Secure unallocated inventory']
  },
  {
    id: 12,
    category_id: 5,
    category_name: 'For PayPal (Withdrawal)',
    name: 'Mastercard Western Union (Minimum 1400$)',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 18,
    limit: '$1,400 USD Minimum Limit',
    description: 'Cross-functional Mastercard supporting money transfers, remittance services, Western Union portals, and PayPal transactions.',
    features: ['Pre-configured for remittance portals', 'Full card details revealed in customer portal', 'Immediate access after balance deduction', '100% active inventory']
  },
  {
    id: 13,
    category_id: 6,
    category_name: 'For Apple',
    name: 'Visa USA Banks (Minimum 2500$)',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1510519138171-c70d76fe9f14?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 9,
    limit: '$2,500 USD Minimum Limit',
    description: 'US Domestic BIN Visa card designed for Apple ID billing, Apple Store hardware pre-orders, and Apple Pay device provisioning.',
    features: ['US Bank BIN identification', 'Works with Apple Pay and App Store', '$2,500 tier balance', 'Clear ZIP and Address provided']
  },
  {
    id: 14,
    category_id: 12,
    category_name: 'For Every Crypto Platform',
    name: 'American Express Golden (Minimum 3000$)',
    price: 100.00,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 5,
    limit: '$3,000 USD Minimum Limit',
    description: 'Exclusive Amex Gold digital card with multi-currency crypto exchange on-ramp permission. Designed for crypto power users.',
    features: ['Premium Gold card profile', 'Accepted on major DEX/CEX ramps', '$3,000 verified balance ceiling', 'Dedicated support assistance']
  },
  {
    id: 15,
    category_id: 8,
    category_name: 'For Meta Ads / Other Ads',
    name: 'Australia Visa Cards (Minimum 1800$)',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 12,
    limit: '$1,800 USD Minimum Limit',
    description: 'Australian Bank Visa card verified for Meta Facebook Ads Manager, Google Ads threshold accounts, and TikTok Ads Manager billing.',
    features: ['Approved for Facebook & Google Ads billing', 'Instant authorization without payment holds', '$1,800 ad budget tier', 'Active digital delivery']
  },
  {
    id: 17,
    category_id: 10,
    category_name: 'For Flipcart Shopping',
    name: 'Indian Banks Visa Card (Minimum 3000$)',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 14,
    limit: '$3,000 USD Minimum Limit',
    description: 'Dedicated payment solution for Flipkart, Myntra, and major South Asian shopping hubs with regional OTP support.',
    features: ['Regional merchant compatibility', '$3,000 equivalent purchasing power', 'OTP token assistance included', 'Freshly minted card inventory']
  },
  {
    id: 18,
    category_id: 1,
    category_name: 'For Binance Withdrawal',
    name: 'Binance CC (Minimum 2500$)',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 6,
    limit: '$2,500 USD Minimum Limit',
    description: 'Direct Binance Crypto-friendly card. Ready for swift fiat liquidation and USDT/BUSD to card balance transfers.',
    features: ['Instant Binance P2P and card off-ramp', 'Zero foreign exchange penalties', '$2,500 balance ceiling', 'Instant credentials delivery']
  },
  {
    id: 19,
    category_id: 8,
    category_name: 'For Meta Ads / Other Ads',
    name: 'MasterCard (Minimum 400$)',
    price: 44.00,
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 25,
    limit: '$400 USD Minimum Limit',
    description: 'Low-cost entry level Mastercard for testing advertisement campaigns, digital server trials, and small subscriptions.',
    features: ['Affordable $44 unit price', 'Works on digital advertising platforms', 'Instant issuance', '100% active test balance']
  },
  {
    id: 20,
    category_id: 7,
    category_name: 'For Titkok Coins',
    name: 'Visa TikTok (Minimum 1800$)',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 17,
    limit: '$1,800 USD Minimum Limit',
    description: 'Fast coin recharging card for TikTok live streaming gifts, creator donations, and digital badges.',
    features: ['Quick TikTok billing setup', 'Great budget price $40', 'Secure virtual number', 'Instant dashboard reveal']
  },
  {
    id: 21,
    category_id: 11,
    category_name: 'Redot Pay (Withdrawal)',
    name: 'Redot Pay Visa (Minimum 4000$)',
    price: 100.00,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 4,
    limit: '$4,000 USD Minimum Limit',
    description: 'High capacity RedotPay Visa card allowing $4,000 daily spend with cross-border payment flexibility.',
    features: ['High-capacity $4,000 spending tier', 'Virtual card portal details included', 'Immediate digital delivery', 'Zero transaction lag']
  },
  {
    id: 22,
    category_id: 12,
    category_name: 'For Every Crypto Platform',
    name: 'American Express Black (Balance 5000$)',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80',
    status: 1,
    in_stock: 3,
    limit: '$5,000 USD Verified Balance',
    description: 'The pinnacle of REDROOM marketplace digital solutions. Unrestricted American Express Centurion Black card with $5,000 balance.',
    features: ['Flagship Black Card status', '$5,000 confirmed balance capability', 'Highest priority customer handling', 'Global merchant and exchange acceptance']
  }
];

export const INITIAL_ADMIN: AdminUser = {
  id: 1,
  name: 'REDROOM Administrator',
  email: 'admin@redroom-market.com',
  username: 'admin123',
  role: 'admin',
  mustChangePassword: true
};

export const INITIAL_GATEWAYS: PaymentGateway[] = [
  {
    code: 1000,
    name: 'Binance Smart Chain (BEP20)',
    alias: 'binance_smart_chain_bnb__bep20',
    currency: 'USD',
    network: 'BEP20',
    wallet_address: '0xF75fA32Da73a15CB6E1B622D5534649FB6592655',
    min_amount: 30.00,
    max_amount: 10000.00,
    percent_charge: 10.00,
    fixed_charge: 0.00,
    bep20_address: '0xF75fA32Da73a15CB6E1B622D5534649FB6592655',
    btc_address: '',
    bank_name: 'BNB Smart Chain Node',
    instructions: 'Send exact funds via BNB BEP20 network. Submit transaction hash and screenshot proof for admin verification.',
    is_active: true,
    display_order: 1
  },
  {
    code: 1001,
    name: 'Bitcoin Network (BTC Native)',
    alias: 'bitcoin_native',
    currency: 'USD',
    network: 'BTC',
    wallet_address: '1N15TzFdvsfrqW45ywMk3gK7ArM9mpCqwC',
    min_amount: 50.00,
    max_amount: 50000.00,
    percent_charge: 5.00,
    fixed_charge: 0.00,
    bep20_address: '',
    btc_address: '1N15TzFdvsfrqW45ywMk3gK7ArM9mpCqwC',
    bank_name: 'Bitcoin Core Node',
    instructions: 'Send exact BTC funds to the address above. Provide the blockchain transaction ID (TXID).',
    is_active: true,
    display_order: 2
  },
  {
    code: 1002,
    name: 'Tether USD (TRC20)',
    alias: 'tether_trc20',
    currency: 'USDT',
    network: 'TRC20',
    wallet_address: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd36AmWK7',
    min_amount: 20.00,
    max_amount: 50000.00,
    percent_charge: 2.00,
    fixed_charge: 1.00,
    bep20_address: '',
    btc_address: '',
    bank_name: 'TRON Ledger Node',
    instructions: 'Send exact USDT via TRC20 network. Fast confirmation within 3 minutes.',
    is_active: true,
    display_order: 3
  }
];

export const PAYMENT_GATEWAY = INITIAL_GATEWAYS[0];

export const SITE_SETTINGS: SiteSettings = {
  site_name: 'REDROOM',
  site_description: 'Premium customer-facing marketplace for digital cards, prepaid solutions, and secure online accounts with real-time balance, instant delivery, and crypto deposits.',
  site_url: 'https://redroom-market.com',
  cur_text: 'USD',
  cur_sym: '$',
  time_zone: 'UTC',
  contact_email: 'supportteam@redroom.cc',
  contact_phone: '+49 152 1234567',
  address: 'Unter den Linden 42, 10117 Berlin, Germany',
  maintenance_mode: false,
  maintenance_message: 'REDROOM is currently undergoing scheduled node infrastructure maintenance. We will return shortly.',
  seo_title: 'REDROOM — Premium Digital Marketplace',
  seo_description: 'Instant delivery of verified prepaid digital cards and online financial solutions.',
  seo_keywords: ['digital cards', 'prepaid cards', 'virtual cards', 'crypto checkout', 'binance cards'],
  og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
  logo_url: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
  favicon_url: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
  hero_title: 'ENTER THE REDROOM',
  hero_subtitle: 'The premier international digital card marketplace. Verified virtual accounts, high-balance prepaid cards, instant delivery to your private vault, and non-custodial crypto settlement.',
  hero_bg_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=85',
  site_bg_image: ''
};


export const INITIAL_HOMEPAGE_SETTINGS: HomepageSettings = {
  hero_enabled: true,
  hero_title: 'ENTER THE REDROOM',
  hero_subtitle: 'The premier international digital card marketplace. Verified virtual accounts, high-balance prepaid cards, instant delivery to your private vault, and non-custodial crypto settlement.',
  hero_bg_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=85',
  hero_primary_btn_text: 'EXPLORE PRODUCTS',
  hero_primary_btn_link: 'shop',
  hero_secondary_btn_text: 'BROWSE CATEGORIES',
  hero_secondary_btn_link: 'categories',
  sections: [
    { id: 'featured_categories', name: 'Featured Categories', enabled: true, order: 1 },
    { id: 'featured_products', name: 'Featured Products', enabled: true, order: 2 },
    { id: 'popular_products', name: 'Popular Products', enabled: true, order: 3 },
    { id: 'recently_added', name: 'Recently Added', enabled: true, order: 4 },
    { id: 'why_redroom', name: 'Why REDROOM Trust Section', enabled: true, order: 5 },
    { id: 'call_to_action', name: 'Final Call to Action', enabled: true, order: 6 }
  ]
};

export const INITIAL_DESIGN_SETTINGS: DesignSettings = {
  primary_bg: '#050505',
  secondary_bg: '#0A0A0A',
  card_bg: '#111111',
  primary_red: '#C1121F',
  dark_red: '#700000',
  hover_red: '#E01B24',
  primary_text: '#FFFFFF',
  secondary_text: '#B5B5B5',
  border_color: '#292929',
  font_display: 'Oswald',
  font_body: 'Inter',
  card_radius: 'rounded-xl',
  button_radius: 'rounded-xl',
  preloader_enabled: true,
  preloader_duration: 800
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 1,
    admin_name: 'System Provisioner',
    action: 'SYSTEM_BOOT',
    details: 'REDROOM Laravel 11 Administration Core initialized. Database tables synced.',
    timestamp: '2026-10-31 10:00:00'
  },
  {
    id: 2,
    admin_name: 'Security Engine',
    action: 'ADMIN_SETUP',
    details: 'Initial administrator credentials set to admin123. First-login password change flag enabled.',
    timestamp: '2026-10-31 10:00:01'
  }
];

// Initial available digital inventory cards matching `cards` table in Laravel database
export const INITIAL_INVENTORY_CARDS: InventoryCard[] = [
  {
    id: 101,
    subcategory_id: 1,
    user_id: 0,
    trx: null,
    details: 'CARD: 4217-8891-3401-9214 | EXP: 11/29 | CVV: 824 | PIN: 9012 | HOLDER: REDROOM CLIENT | ISSUER: J TRUST ROYAL BANK',
    status: 'available',
    created_at: '2026-10-30 12:00:00'
  },
  {
    id: 102,
    subcategory_id: 1,
    user_id: 0,
    trx: null,
    details: 'CARD: 4217-4402-9912-1083 | EXP: 08/29 | CVV: 319 | PIN: 4421 | HOLDER: REDROOM CLIENT | ISSUER: J TRUST ROYAL BANK',
    status: 'available',
    created_at: '2026-10-30 12:05:00'
  },
  {
    id: 103,
    subcategory_id: 2,
    user_id: 0,
    trx: null,
    details: 'CARD: 5412-7721-6632-4019 | EXP: 04/28 | CVV: 912 | PIN: 6620 | HOLDER: REDROOM CLIENT | ISSUER: MASTERCARD PREPAID',
    status: 'available',
    created_at: '2026-10-30 12:10:00'
  },
  {
    id: 104,
    subcategory_id: 6,
    user_id: 0,
    trx: null,
    details: 'CARD: 4111-9201-4432-8812 | EXP: 02/30 | CVV: 402 | PIN: 1189 | HOLDER: REDROOM CLIENT | ISSUER: STANBIC BANK VISA',
    status: 'available',
    created_at: '2026-10-30 12:15:00'
  },
  {
    id: 105,
    subcategory_id: 14,
    user_id: 0,
    trx: null,
    details: 'CARD: 3782-9901-2241-5509 | EXP: 10/29 | CVV: 441 | PIN: 8021 | HOLDER: REDROOM CLIENT | ISSUER: AMERICAN EXPRESS GOLD',
    status: 'available',
    created_at: '2026-10-30 12:20:00'
  },
  {
    id: 106,
    subcategory_id: 22,
    user_id: 0,
    trx: null,
    details: 'CARD: 3782-0019-8832-1144 | EXP: 12/30 | CVV: 771 | PIN: 9940 | HOLDER: REDROOM CLIENT | ISSUER: AMEX BLACK CENTURION',
    status: 'available',
    created_at: '2026-10-30 12:25:00'
  }
];

// All customer accounts start clean
export const INITIAL_USERS: User[] = [];
export const INITIAL_TRANSACTIONS: Transaction[] = [];
export const INITIAL_PURCHASED_CARDS: any[] = [];
export const INITIAL_TICKETS: SupportTicket[] = [];
export const INITIAL_TICKET_MESSAGES: Record<number, SupportMessage[]> = {};


export const CMS_ABOUT = {
  title: 'About REDROOM',
  heading: 'The World’s Premier Digital Marketplace',
  description: 'Welcome to REDROOM — Your Trusted Digital Card Marketplace. We specialize in providing verified, top-quality digital cards, prepaid accounts, and liquidity solutions at transparent prices. Our platform is engineered from the ground up for privacy, speed, and rock-solid reliability. With instant digital delivery upon purchase, real-time balance accounting, and verified non-custodial crypto deposit settlement, REDROOM gives you the digital freedom you demand.',
  stats: [
    { label: 'Active Marketplace Products', value: '17+' },
    { label: 'Global Categories', value: '13' },
    { label: 'Instant Digital Delivery', value: '100%' },
    { label: 'Secure Transaction Settlement', value: '24/7' }
  ]
};

export const CMS_BLOG_POSTS = [
  {
    slug: 'usa-debit-cards-types-benefits-how-to-choose-the-right-card',
    title: 'USA Debit Cards: Types, Benefits & How to Choose the Right Card',
    excerpt: 'Debit cards are one of the most common ways people access money in digital accounts. Learn about traditional bank cards, virtual cards, prepaid cards, and security features.',
    date: 'Oct 2026',
    author: 'REDROOM Editorial Team'
  },
  {
    slug: 'stanbic-bank-debit-card-features-fees-benefits-how-to-get-one',
    title: 'Stanbic Bank Debit Card: Features, Fees, Benefits & Operational Guide',
    excerpt: 'A comprehensive review of Stanbic Bank debit cards, ATM access, online compatibility, multi-currency fee schedules, and contactless payment limits.',
    date: 'Oct 2026',
    author: 'REDROOM Editorial Team'
  },
  {
    slug: 'paypal-debit-card-explained-features-benefits-fees-availability',
    title: 'PayPal Debit Card Explained: Features, Benefits, Fees & Availability',
    excerpt: 'How PayPal cards link directly to available wallet funds, avoid merchant locks, and streamline digital checkouts without manual bank transfers.',
    date: 'Oct 2026',
    author: 'REDROOM Editorial Team'
  },
  {
    slug: 'redotpay-card-explained-features-fees-benefits-how-it-works',
    title: 'RedotPay Card Explained: Features, Fees, Benefits & How It Works',
    excerpt: 'Connecting digital assets with everyday e-commerce. A breakdown of virtual cards, point-of-sale support, daily withdrawal limits, and security controls.',
    date: 'Oct 2026',
    author: 'REDROOM Editorial Team'
  }
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'telegram',
    name: 'Official Telegram Channel',
    icon: 'telegram',
    url: 'https://t.me/redroom_marketplace',
    enabled: true,
    show_in_header: true,
    show_in_footer: true,
    show_in_contact: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Support Desk',
    icon: 'whatsapp',
    url: 'https://wa.me/491521234567',
    enabled: true,
    show_in_header: false,
    show_in_footer: true,
    show_in_contact: true
  },
  {
    id: 'email',
    name: 'Official Support Email',
    icon: 'email',
    url: 'mailto:support@redroom-marketplace.cc',
    enabled: true,
    show_in_header: true,
    show_in_footer: true,
    show_in_contact: true
  },
  {
    id: 'twitter',
    name: 'X (Twitter) Announcements',
    icon: 'twitter',
    url: 'https://x.com/redroom_market',
    enabled: true,
    show_in_header: false,
    show_in_footer: true,
    show_in_contact: false
  },
  {
    id: 'discord',
    name: 'Discord Community Server',
    icon: 'discord',
    url: 'https://discord.gg/redroom',
    enabled: true,
    show_in_header: false,
    show_in_footer: true,
    show_in_contact: false
  },
  {
    id: 'youtube',
    name: 'YouTube Tutorials',
    icon: 'youtube',
    url: 'https://youtube.com/@redroom_market',
    enabled: false,
    show_in_header: false,
    show_in_footer: false,
    show_in_contact: false
  }
];

export const INITIAL_PAGE_SEO: PageSeoConfig[] = [
  {
    page_id: 'home',
    page_name: 'Homepage',
    title: 'REDROOM — Premium Digital Marketplace | Verified Virtual Cards',
    meta_description: 'Instant delivery of verified prepaid digital cards and online financial solutions. Non-custodial crypto checkout, zero KYC, 24/7 automated delivery.',
    meta_keywords: 'digital cards, prepaid cards, virtual cards, crypto checkout, binance cards, buy virtual card',
    canonical_url: 'https://redroom-market.com',
    og_title: 'REDROOM — Premium Digital Marketplace',
    og_description: 'Instant delivery of verified prepaid digital cards and online financial solutions. 100% active test balance, non-custodial crypto deposits.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'WebSite'
  },
  {
    page_id: 'shop',
    page_name: 'Shop Catalog',
    title: 'Marketplace Catalog — Buy Verified Digital Cards | REDROOM',
    meta_description: 'Browse our complete catalog of verified digital cards, debit cards, and prepaid accounts for Binance, PayPal, Google Ads, and global shopping.',
    meta_keywords: 'buy debit cards, binance withdrawal card, paypal virtual card, ads payment card, crypto debit card',
    canonical_url: 'https://redroom-market.com/shop',
    og_title: 'Marketplace Catalog — Buy Verified Digital Cards | REDROOM',
    og_description: 'Select from 17+ verified digital card products with instant credential delivery to your customer vault.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Product'
  },
  {
    page_id: 'categories',
    page_name: 'Categories Hub',
    title: 'Browse Digital Card Categories | REDROOM Marketplace',
    meta_description: 'Explore 13+ specialized digital card categories including crypto withdrawal, e-commerce checkouts, ad networks, and payment systems.',
    meta_keywords: 'digital card categories, prepaid card types, virtual debit card categories, paypal withdrawal cards',
    canonical_url: 'https://redroom-market.com/categories',
    og_title: 'Browse Digital Card Categories | REDROOM Marketplace',
    og_description: 'Curated collections of verified prepaid solutions built for discretion, reliability, and speed.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'BreadcrumbList'
  },
  {
    page_id: 'about',
    page_name: 'About REDROOM',
    title: 'About REDROOM — The Premier Digital Card Marketplace',
    meta_description: 'Discover the REDROOM standard: guaranteed unallocated inventory, single-owner isolation, and non-custodial crypto settlement since 2024.',
    meta_keywords: 'about redroom, digital card marketplace, verified cards, crypto payment marketplace',
    canonical_url: 'https://redroom-market.com/about',
    og_title: 'About REDROOM — The Premier Digital Card Marketplace',
    og_description: 'Architected for security, privacy, and continuous unallocated stock availability across 13 international categories.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Organization'
  },
  {
    page_id: 'contact',
    page_name: 'Contact & Support',
    title: 'Client Support Desk & Contact Channels | REDROOM',
    meta_description: 'Get in touch with the REDROOM support engineering team. Direct encrypted ticketing, Telegram dispatch, and 24/7 resolution.',
    meta_keywords: 'contact redroom, client support, telegram helpdesk, redroom support, crypto deposit help',
    canonical_url: 'https://redroom-market.com/contact',
    og_title: 'Client Support Desk & Contact Channels | REDROOM',
    og_description: 'Have questions about digital card activation or cryptocurrency deposits? Reach our technical support team directly.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'ContactPage'
  },
  {
    page_id: 'policy',
    page_name: 'Policies & Legal',
    title: 'Terms of Service, Privacy Policy & Refund Guidelines | REDROOM',
    meta_description: 'Official marketplace policies, customer privacy guidelines, 20% handling fee refund procedure, and service commitments.',
    meta_keywords: 'redroom terms, refund policy, privacy policy, marketplace rules, digital card refund',
    canonical_url: 'https://redroom-market.com/policy',
    og_title: 'Terms of Service, Privacy Policy & Refund Guidelines | REDROOM',
    og_description: 'Transparent operational policies, 20% administrative handling refund terms, and customer data isolation agreements.',
    og_image: '/assets/aistudio/RR_pt__2_e0b617f3.jfif',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'WebSite'
  }
];

