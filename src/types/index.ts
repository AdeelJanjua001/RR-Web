export interface Category {
  id: number;
  name: string;
  image: string;
  featured: boolean;
  status: number;
  description?: string;
}

export interface Subcategory {
  id: number;
  category_id: number;
  category_name?: string;
  name: string;
  price: number;
  image: string;
  status: number;
  in_stock: number;
  description?: string;
  features?: string[];
  limit?: string;
}

export interface DigitalCard {
  id: number;
  subcategory_id: number;
  user_id: number;
  trx: string | null;
  details: string; // The secret digital credentials (e.g. Card number / token / key / PIN)
  image?: string;
  purchased_at?: string | null;
  created_at: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  dial_code: string;
  mobile: string;
  balance: number;
  country_name: string;
  city: string;
  address: string;
  status: number;
  created_at: string;
  b2b_verified?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
}

export interface Deposit {
  id: number;
  user_id: number;
  method_code: number;
  method_name: string;
  amount: number; // approved/credited amount or submitted amount
  submitted_amount: number;
  approved_amount?: number;
  charge: number;
  final_amount: number;
  currency?: string;
  network?: string;
  wallet_address?: string;
  btc_amount?: string;
  btc_wallet?: string;
  trx: string;
  status: 1 | 2 | 3; // 1: Approved/Success, 2: Pending, 3: Rejected
  proof_image?: string;
  admin_feedback?: string;
  reviewer_admin_id?: number;
  reviewed_at?: string;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  charge: number;
  post_balance: number;
  trx_type: '+' | '-';
  trx: string;
  details: string;
  remark: string;
  created_at: string;
}

export interface SupportTicket {
  id: number;
  user_id: number;
  ticket: string;
  subject: string;
  status: 0 | 1 | 2 | 3; // 0: Open, 1: Answered, 2: Replied, 3: Closed
  priority: 1 | 2 | 3; // 1: Low, 2: Medium, 3: High
  last_reply: string;
  created_at: string;
}

export interface SupportMessage {
  id: number;
  support_ticket_id: number;
  admin_id: number; // 0: Customer, 1: REDROOM Support Staff
  message: string;
  attachments?: string[];
  created_at: string;
}

export interface RefundRequest {
  id: number;
  user_id: number;
  purchase_trx: string;
  product_name: string;
  amount: number;
  reason: string;
  status: 'pending' | 'reviewing' | 'approved' | 'declined';
  admin_note?: string;
  created_at: string;
}

export interface PaymentGateway {
  code: number;
  name: string;
  alias: string;
  currency: string;
  network: string; // e.g. 'BEP20', 'BTC', 'TRC20', 'ERC20'
  wallet_address: string;
  min_amount: number;
  max_amount: number;
  percent_charge: number;
  fixed_charge: number;
  bep20_address: string;
  btc_address: string;
  bank_name: string;
  instructions: string;
  is_active?: boolean;
  qr_code_url?: string;
  qr_payload?: string;
  display_order?: number;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: 'admin';
  mustChangePassword?: boolean;
}

export interface AuditLog {
  id: number;
  admin_name: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface InventoryCard {
  id: number;
  subcategory_id: number;
  user_id: number; // 0: Available, >0: Sold to user_id
  trx: string | null;
  details: string; // The secret credentials (e.g. CARD: ... | EXP: ... | CVV: ...)
  status: 'available' | 'sold' | 'disabled';
  purchased_at?: string | null;
  created_at: string;
}

export interface HomepageSectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface HomepageSettings {
  hero_enabled: boolean;
  hero_title: string;
  hero_subtitle: string;
  hero_bg_image: string;
  hero_primary_btn_text: string;
  hero_primary_btn_link: string;
  hero_secondary_btn_text: string;
  hero_secondary_btn_link: string;
  sections: HomepageSectionConfig[];
}

export interface DesignSettings {
  primary_bg: string;
  secondary_bg: string;
  card_bg: string;
  primary_red: string;
  dark_red: string;
  hover_red: string;
  primary_text: string;
  secondary_text: string;
  border_color: string;
  font_display: string;
  font_body: string;
  card_radius: string;
  button_radius: string;
  preloader_enabled: boolean;
  preloader_duration: number;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  site_url: string;
  cur_text: string;
  cur_sym: string;
  time_zone: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  og_image: string;
  logo_url: string;
  favicon_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_bg_image: string;
  site_bg_image?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: 'telegram' | 'whatsapp' | 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'email' | 'discord' | 'custom';
  url: string;
  enabled: boolean;
  show_in_header: boolean;
  show_in_footer: boolean;
  show_in_contact: boolean;
}

export interface PageSeoConfig {
  page_id: string;
  page_name: string;
  title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: 'summary' | 'summary_large_image';
  robots_index: boolean;
  robots_follow: boolean;
  schema_type: 'WebSite' | 'Product' | 'Organization' | 'BreadcrumbList' | 'ContactPage';
  custom_json_ld?: string;
}

export interface DangerZoneTargets {
  users: boolean;
  inventory: boolean;
  transactions: boolean;
  deposits: boolean;
  tickets: boolean;
}



