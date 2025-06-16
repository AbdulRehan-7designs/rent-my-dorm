
-- Create college management tables and enhance existing functionality

-- First, let's add college management capabilities
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS admin_contact_email TEXT;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS admin_contact_phone TEXT;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS establishment_year INTEGER;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS total_students INTEGER DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}';

-- Create college admins table for managing college-specific administrators
CREATE TABLE IF NOT EXISTS college_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  admin_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'college_admin',
  permissions JSONB DEFAULT '{"manage_students": true, "approve_listings": true, "view_analytics": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(college_id, admin_user_id)
);

-- Create vendor applications table for tracking vendor approval process
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id),
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  business_description TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  business_address TEXT,
  documents_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  reviewed_by UUID REFERENCES profiles(id),
  review_notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create college statistics table for analytics
CREATE TABLE IF NOT EXISTS college_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  total_active_users INTEGER DEFAULT 0,
  total_listings INTEGER DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  monthly_revenue NUMERIC DEFAULT 0,
  average_rating DECIMAL(2,1) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(college_id)
);

-- Add RLS policies for college management
ALTER TABLE college_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_statistics ENABLE ROW LEVEL SECURITY;

-- College admins policies
CREATE POLICY "Super admins can manage college admins" ON college_admins
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "College admins can view their assignments" ON college_admins
  FOR SELECT USING (admin_user_id = auth.uid());

-- Vendor applications policies
CREATE POLICY "Users can create vendor applications" ON vendor_applications
  FOR INSERT WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Users can view their own applications" ON vendor_applications
  FOR SELECT USING (applicant_id = auth.uid());

CREATE POLICY "Admins can manage vendor applications" ON vendor_applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- College statistics policies
CREATE POLICY "Admins can view all college statistics" ON college_statistics
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create function to update college statistics
CREATE OR REPLACE FUNCTION update_college_statistics(college_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO college_statistics (college_id, total_active_users, total_listings, total_transactions)
  VALUES (
    college_id_param,
    (SELECT COUNT(*) FROM profiles WHERE college_id = college_id_param AND created_at > now() - interval '30 days'),
    (SELECT COUNT(*) FROM rental_items ri JOIN profiles p ON ri.lister_id = p.id WHERE p.college_id = college_id_param AND ri.is_active = true),
    (SELECT COUNT(*) FROM rental_bookings rb JOIN profiles p ON rb.renter_id = p.id WHERE p.college_id = college_id_param AND rb.status = 'completed')
  )
  ON CONFLICT (college_id) DO UPDATE SET
    total_active_users = EXCLUDED.total_active_users,
    total_listings = EXCLUDED.total_listings,
    total_transactions = EXCLUDED.total_transactions,
    last_updated = now();
END;
$$;
