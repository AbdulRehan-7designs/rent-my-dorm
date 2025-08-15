-- Enhanced backend system for college rental platform

-- Create enhanced user roles
CREATE TYPE user_role AS ENUM ('student', 'vendor', 'admin', 'college_admin', 'super_admin');

-- Create comprehensive rental categories
CREATE TYPE rental_category AS ENUM (
  'electronics', 'furniture', 'books', 'vehicles', 'sports', 
  'musical_instruments', 'appliances', 'fashion', 'tools', 
  'gaming', 'photography', 'study_materials', 'camping', 'other'
);

-- Create rental condition types
CREATE TYPE item_condition AS ENUM ('new', 'like_new', 'good', 'fair', 'poor');

-- Create booking and rental status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'disputed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded', 'partial');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'resolved', 'escalated');

-- Enhanced profiles table with more fields
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS student_id TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
ADD COLUMN IF NOT EXISTS course TEXT,
ADD COLUMN IF NOT EXISTS year_of_study INTEGER CHECK (year_of_study BETWEEN 1 AND 6),
ADD COLUMN IF NOT EXISTS hostel_block TEXT,
ADD COLUMN IF NOT EXISTS room_number TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS verification_documents JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deactivated')),
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES profiles(id);

-- Enhanced rental items table
ALTER TABLE rental_items 
ADD COLUMN IF NOT EXISTS brand TEXT,
ADD COLUMN IF NOT EXISTS model TEXT,
ADD COLUMN IF NOT EXISTS year_purchased INTEGER,
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS insurance_covered BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS min_rental_days INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_rental_days INTEGER,
ADD COLUMN IF NOT EXISTS location_details JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pickup_instructions TEXT,
ADD COLUMN IF NOT EXISTS usage_guidelines TEXT,
ADD COLUMN IF NOT EXISTS included_accessories TEXT[],
ADD COLUMN IF NOT EXISTS damage_policy TEXT,
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT,
ADD COLUMN IF NOT EXISTS featured_until TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS boost_credits_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS safety_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS quality_score DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS total_earnings DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;

-- Enhanced rental bookings table
ALTER TABLE rental_bookings 
ADD COLUMN IF NOT EXISTS pickup_location TEXT,
ADD COLUMN IF NOT EXISTS dropoff_location TEXT,
ADD COLUMN IF NOT EXISTS pickup_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS dropoff_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS late_fee DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS damage_charges DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS refund_amount DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_status payment_status DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS booking_notes TEXT,
ADD COLUMN IF NOT EXISTS pickup_photos TEXT[],
ADD COLUMN IF NOT EXISTS return_photos TEXT[],
ADD COLUMN IF NOT EXISTS damage_report TEXT,
ADD COLUMN IF NOT EXISTS extension_requested BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS extension_approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS auto_extend_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancelled_reason TEXT,
ADD COLUMN IF NOT EXISTS cancelled_by UUID REFERENCES profiles(id);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES rental_bookings(id) ON DELETE CASCADE,
  payer_id UUID NOT NULL REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT NOT NULL,
  payment_gateway TEXT,
  transaction_id TEXT,
  gateway_transaction_id TEXT,
  payment_status payment_status DEFAULT 'pending',
  payment_type TEXT CHECK (payment_type IN ('booking', 'deposit', 'damage', 'late_fee', 'refund')),
  processed_at TIMESTAMP WITH TIME ZONE,
  gateway_response JSONB,
  failure_reason TEXT,
  refunded_at TIMESTAMP WITH TIME ZONE,
  refund_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create escrow system table
CREATE TABLE IF NOT EXISTS escrow_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES rental_bookings(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES payments(id),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  vendor_amount DECIMAL(10,2) NOT NULL,
  escrow_status TEXT DEFAULT 'held' CHECK (escrow_status IN ('held', 'released', 'disputed', 'refunded')),
  release_scheduled_at TIMESTAMP WITH TIME ZONE,
  released_at TIMESTAMP WITH TIME ZONE,
  dispute_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced reviews table  
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS review_type TEXT DEFAULT 'rental' CHECK (review_type IN ('rental', 'user', 'vendor')),
ADD COLUMN IF NOT EXISTS communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
ADD COLUMN IF NOT EXISTS condition_rating INTEGER CHECK (condition_rating BETWEEN 1 AND 5),
ADD COLUMN IF NOT EXISTS value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
ADD COLUMN IF NOT EXISTS delivery_rating INTEGER CHECK (delivery_rating BETWEEN 1 AND 5),
ADD COLUMN IF NOT EXISTS photos TEXT[],
ADD COLUMN IF NOT EXISTS helpful_votes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reported_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS response_text TEXT,
ADD COLUMN IF NOT EXISTS response_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_purchase BOOLEAN DEFAULT true;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  action_data JSONB,
  related_entity_id UUID,
  related_entity_type TEXT,
  delivery_method TEXT[] DEFAULT ARRAY['app'],
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chat system tables
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES rental_bookings(id),
  participant_ids UUID[] NOT NULL,
  conversation_type TEXT DEFAULT 'rental' CHECK (conversation_type IN ('rental', 'support', 'general')),
  title TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE,
  archived_by UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  message_text TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  attachments JSONB,
  reply_to_id UUID REFERENCES chat_messages(id),
  read_by JSONB DEFAULT '{}',
  edited_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Create wishlist enhancements
ALTER TABLE wishlist 
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
ADD COLUMN IF NOT EXISTS max_budget DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS needed_by DATE,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS notification_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS fulfilled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS fulfillment_booking_id UUID REFERENCES rental_bookings(id);

-- Create vendor analytics table
CREATE TABLE IF NOT EXISTS vendor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  total_bookings INTEGER DEFAULT 0,
  unique_customers INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0.00,
  total_views INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  popular_items JSONB DEFAULT '[]',
  revenue_by_category JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(vendor_id, date)
);

-- Create system-wide analytics table
CREATE TABLE IF NOT EXISTS platform_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_signups INTEGER DEFAULT 0,
  total_listings INTEGER DEFAULT 0,
  new_listings INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  completed_bookings INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0.00,
  platform_commission DECIMAL(12,2) DEFAULT 0.00,
  avg_booking_value DECIMAL(10,2) DEFAULT 0.00,
  top_categories JSONB DEFAULT '[]',
  top_colleges JSONB DEFAULT '[]',
  user_satisfaction DECIMAL(3,2) DEFAULT 0.00,
  dispute_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create referral system table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES profiles(id),
  referred_id UUID NOT NULL REFERENCES profiles(id),
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'credited')),
  reward_amount DECIMAL(10,2) DEFAULT 0.00,
  credited_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(referrer_id, referred_id)
);

-- Create admin actions log
CREATE TABLE IF NOT EXISTS admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES profiles(id),
  action_type TEXT NOT NULL,
  target_entity_type TEXT,
  target_entity_id UUID,
  action_details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_college_role ON profiles(college_id, role);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code) WHERE referral_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_rental_items_category_active ON rental_items(category, is_active, is_available);
CREATE INDEX IF NOT EXISTS idx_rental_items_location ON rental_items USING GIN(location_details);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_dates ON rental_bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_status ON rental_bookings(status);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_conversations_participants ON chat_conversations USING GIN(participant_ids);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_vendor_analytics_date ON vendor_analytics(vendor_id, date);

-- Enable Row Level Security on all new tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (payer_id = auth.uid());

CREATE POLICY "Users can create their own payments" ON payments
  FOR INSERT WITH CHECK (payer_id = auth.uid());

-- RLS Policies for escrow
CREATE POLICY "Users can view escrow for their bookings" ON escrow_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rental_bookings rb 
      WHERE rb.id = booking_id 
      AND (rb.renter_id = auth.uid() OR rb.lister_id = auth.uid())
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for chat
CREATE POLICY "Users can view conversations they participate in" ON chat_conversations
  FOR SELECT USING (auth.uid() = ANY(participant_ids));

CREATE POLICY "Users can create conversations" ON chat_conversations
  FOR INSERT WITH CHECK (auth.uid() = ANY(participant_ids));

CREATE POLICY "Users can view messages in their conversations" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_conversations cc 
      WHERE cc.id = conversation_id 
      AND auth.uid() = ANY(cc.participant_ids)
    )
  );

CREATE POLICY "Users can send messages in their conversations" ON chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM chat_conversations cc 
      WHERE cc.id = conversation_id 
      AND auth.uid() = ANY(cc.participant_ids)
    )
  );

-- RLS Policies for vendor analytics
CREATE POLICY "Vendors can view their own analytics" ON vendor_analytics
  FOR SELECT USING (vendor_id = auth.uid());

-- RLS Policies for platform analytics (admin only)
CREATE POLICY "Admins can view platform analytics" ON platform_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for referrals
CREATE POLICY "Users can view their referrals" ON referrals
  FOR SELECT USING (referrer_id = auth.uid() OR referred_id = auth.uid());

CREATE POLICY "Users can create referrals" ON referrals
  FOR INSERT WITH CHECK (referrer_id = auth.uid());

-- RLS Policies for admin actions (admin only)
CREATE POLICY "Admins can view admin actions" ON admin_actions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can log admin actions" ON admin_actions
  FOR INSERT WITH CHECK (admin_id = auth.uid());

-- Create functions for common operations
CREATE OR REPLACE FUNCTION public.calculate_platform_fee(amount DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  -- 5% platform fee with minimum of ₹10
  RETURN GREATEST(amount * 0.05, 10.00);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_item_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE rental_items 
    SET 
      rental_count = COALESCE((
        SELECT COUNT(*) 
        FROM rental_bookings 
        WHERE item_id = NEW.item_id 
        AND status = 'completed'
      ), 0),
      total_earnings = COALESCE((
        SELECT SUM(total_amount) 
        FROM rental_bookings 
        WHERE item_id = NEW.item_id 
        AND status = 'completed'
      ), 0.00),
      avg_rating = COALESCE((
        SELECT AVG(rating::DECIMAL) 
        FROM reviews r
        JOIN rental_bookings rb ON r.booking_id = rb.id
        WHERE rb.item_id = NEW.item_id
        AND r.rating IS NOT NULL
      ), 0.00),
      total_reviews = COALESCE((
        SELECT COUNT(*) 
        FROM reviews r
        JOIN rental_bookings rb ON r.booking_id = rb.id
        WHERE rb.item_id = NEW.item_id
      ), 0),
      updated_at = now()
    WHERE id = NEW.item_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_rental_item_stats
  AFTER INSERT OR UPDATE ON rental_bookings
  FOR EACH ROW EXECUTE FUNCTION update_item_stats();

CREATE TRIGGER update_rental_item_stats_on_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_item_stats();

-- Create function to generate referral codes
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Update profiles to auto-generate referral codes
UPDATE profiles 
SET referral_code = generate_referral_code() 
WHERE referral_code IS NULL;