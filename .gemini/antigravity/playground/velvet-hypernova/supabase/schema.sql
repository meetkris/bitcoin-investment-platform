-- Bitcoin Investment Platform - Admin Panel Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER MANAGEMENT TABLES
-- ============================================

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users (id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    kyc_status TEXT DEFAULT 'pending' CHECK (
        kyc_status IN (
            'pending',
            'verified',
            'rejected'
        )
    ),
    account_status TEXT DEFAULT 'active' CHECK (
        account_status IN (
            'active',
            'suspended',
            'banned'
        )
    ),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- User Portfolios
CREATE TABLE IF NOT EXISTS user_portfolios (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE UNIQUE,
    btc_holdings DECIMAL(18, 8) DEFAULT 0,
    total_invested DECIMAL(18, 2) DEFAULT 0,
    total_profit_loss DECIMAL(18, 2) DEFAULT 0,
    last_transaction_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TRANSACTION MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (
        type IN (
            'buy',
            'sell',
            'deposit',
            'withdrawal'
        )
    ),
    amount DECIMAL(18, 2) NOT NULL,
    btc_amount DECIMAL(18, 8),
    btc_price DECIMAL(18, 2),
    status TEXT DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'completed',
            'failed',
            'cancelled'
        )
    ),
    payment_method TEXT,
    transaction_hash TEXT,
    notes TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        completed_at TIMESTAMP
    WITH
        TIME ZONE
);

-- ============================================
-- CONTENT MANAGEMENT
-- ============================================

-- News Articles
CREATE TABLE IF NOT EXISTS news_articles (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT CHECK (
        category IN (
            'regulation',
            'technology',
            'market',
            'adoption'
        )
    ),
    author TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (
        type IN (
            'info',
            'warning',
            'success',
            'error'
        )
    ),
    active BOOLEAN DEFAULT true,
    start_date TIMESTAMP
    WITH
        TIME ZONE,
        end_date TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUPPORT & TICKETS
-- ============================================

-- Contact Submissions (already exists, but adding if not)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (
        status IN (
            'new',
            'in_progress',
            'resolved',
            'closed'
        )
    ),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (
        status IN (
            'open',
            'in_progress',
            'resolved',
            'closed'
        )
    ),
    priority TEXT DEFAULT 'normal' CHECK (
        priority IN (
            'low',
            'normal',
            'high',
            'urgent'
        )
    ),
    assigned_to UUID REFERENCES auth.users (id),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Ticket Replies
CREATE TABLE IF NOT EXISTS ticket_replies (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    ticket_id UUID REFERENCES support_tickets (id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN & PERMISSIONS
-- ============================================

-- Admin Roles
CREATE TABLE IF NOT EXISTS admin_roles (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE UNIQUE,
    role TEXT NOT NULL CHECK (
        role IN (
            'super_admin',
            'admin',
            'moderator',
            'support'
        )
    ),
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Admin Audit Log
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    admin_id UUID REFERENCES auth.users (id),
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PLATFORM SETTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS platform_settings (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    category TEXT,
    description TEXT,
    updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_by UUID REFERENCES auth.users (id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- User Profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles (email);

CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles (account_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_created ON user_profiles (created_at DESC);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions (user_id);

CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions (status);

CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- News Articles
CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles (published, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles (category);

-- Support Tickets
CREATE INDEX IF NOT EXISTS idx_tickets_user ON support_tickets (user_id);

CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets (status);

CREATE INDEX IF NOT EXISTS idx_tickets_assigned ON support_tickets (assigned_to);

-- Admin Audit Log
CREATE INDEX IF NOT EXISTS idx_audit_admin ON admin_audit_log (admin_id);

CREATE INDEX IF NOT EXISTS idx_audit_created ON admin_audit_log (created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

ALTER TABLE ticket_replies ENABLE ROW LEVEL SECURITY;

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can view their own, admins can view all
CREATE POLICY "Users can view own profile" ON user_profiles FOR
SELECT USING (auth.uid () = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM admin_roles
            WHERE
                user_id = auth.uid ()
        )
    );

CREATE POLICY "Admins can update profiles" ON user_profiles FOR
UPDATE USING (
    EXISTS (
        SELECT 1
        FROM admin_roles
        WHERE
            user_id = auth.uid ()
    )
);

-- User Portfolios: Users can view their own, admins can view all
CREATE POLICY "Users can view own portfolio" ON user_portfolios FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Admins can view all portfolios" ON user_portfolios FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM admin_roles
            WHERE
                user_id = auth.uid ()
        )
    );

-- Transactions: Users can view their own, admins can view all
CREATE POLICY "Users can view own transactions" ON transactions FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Admins can view all transactions" ON transactions FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_roles
        WHERE
            user_id = auth.uid ()
    )
);

-- News Articles: Public can view published, admins can manage all
CREATE POLICY "Public can view published news" ON news_articles FOR
SELECT USING (published = true);

CREATE POLICY "Admins can manage news" ON news_articles FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_roles
        WHERE
            user_id = auth.uid ()
    )
);

-- FAQs: Public can view published, admins can manage
CREATE POLICY "Public can view published FAQs" ON faqs FOR
SELECT USING (published = true);

CREATE POLICY "Admins can manage FAQs" ON faqs FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_roles
        WHERE
            user_id = auth.uid ()
    )
);

-- Admin Roles: Only admins can view
CREATE POLICY "Admins can view roles" ON admin_roles FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM admin_roles
            WHERE
                user_id = auth.uid ()
        )
    );

-- Admin Audit Log: Only admins can view
CREATE POLICY "Admins can view audit log" ON admin_audit_log FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM admin_roles
            WHERE
                user_id = auth.uid ()
        )
    );

-- Platform Settings: Only admins can manage
CREATE POLICY "Admins can manage settings" ON platform_settings FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_roles
        WHERE
            user_id = auth.uid ()
    )
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at BEFORE UPDATE ON user_portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_roles_updated_at BEFORE UPDATE ON admin_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_settings_updated_at BEFORE UPDATE ON platform_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA / SEED DATA
-- ============================================

-- Insert default platform settings
INSERT INTO
    platform_settings (
        key,
        value,
        category,
        description
    )
VALUES (
        'site_name',
        '"Bitcoin Investment Platform"',
        'general',
        'Platform name'
    ),
    (
        'maintenance_mode',
        'false',
        'general',
        'Enable/disable maintenance mode'
    ),
    (
        'registration_enabled',
        'true',
        'general',
        'Allow new user registrations'
    ),
    (
        'min_transaction_amount',
        '10',
        'trading',
        'Minimum transaction amount in USD'
    ),
    (
        'max_transaction_amount',
        '100000',
        'trading',
        'Maximum transaction amount in USD'
    ),
    (
        'trading_fee_percentage',
        '0.5',
        'trading',
        'Trading fee percentage'
    ),
    (
        'withdrawal_limit_daily',
        '50000',
        'trading',
        'Daily withdrawal limit in USD'
    ) ON CONFLICT (key) DO NOTHING;

-- Insert sample FAQs
INSERT INTO
    faqs (
        question,
        answer,
        category,
        order_index
    )
VALUES (
        'How do I start investing in Bitcoin?',
        'Simply create an account, verify your identity, connect your wallet, and start buying Bitcoin. Our platform makes it easy for beginners.',
        'getting_started',
        1
    ),
    (
        'Is my Bitcoin safe on your platform?',
        'Yes. We use bank-grade security, cold storage for the majority of funds, and multi-signature wallets to ensure maximum security.',
        'security',
        2
    ),
    (
        'What are the fees?',
        'We offer competitive fees starting at 0.5% per transaction. Volume traders receive discounted rates.',
        'fees',
        3
    ),
    (
        'How long do withdrawals take?',
        'Bitcoin withdrawals are typically processed within 30 minutes. Bank transfers may take 1-3 business days.',
        'withdrawals',
        4
    ) ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '📝 Next steps:';
  RAISE NOTICE '1. Create an admin user in Supabase Auth';
  RAISE NOTICE '2. Add admin role: INSERT INTO admin_roles (user_id, role) VALUES (''your-user-id'', ''super_admin'');';
  RAISE NOTICE '3. Configure environment variables in your Next.js app';
END $$;