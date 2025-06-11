
-- Create loyalty_transactions table for Campus Credits system
CREATE TABLE public.loyalty_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'redeemed')),
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campus_pulse_feed table for Campus Pulse system
CREATE TABLE public.campus_pulse_feed (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content_type TEXT NOT NULL CHECK (content_type IN ('new_listing', 'trending_item', 'request', 'announcement', 'recommendation')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  priority INTEGER NOT NULL DEFAULT 1,
  is_viewed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  content_id UUID
);

-- Create group_rentals table for Squad Up functionality
CREATE TABLE public.group_rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID NOT NULL REFERENCES auth.users(id),
  item_id UUID REFERENCES public.rental_items(id),
  title TEXT NOT NULL,
  description TEXT,
  max_participants INTEGER NOT NULL,
  cost_per_person NUMERIC NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group_rental_participants table
CREATE TABLE public.group_rental_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_rental_id UUID NOT NULL REFERENCES public.group_rentals(id),
  participant_id UUID NOT NULL REFERENCES auth.users(id),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_rental_id, participant_id)
);

-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS campus_credits INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS successful_rentals INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS trust_score INTEGER DEFAULT 0;

-- Add RLS policies for new tables
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_pulse_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_rental_participants ENABLE ROW LEVEL SECURITY;

-- Loyalty transactions policies
CREATE POLICY "Users can view their own loyalty transactions" 
  ON public.loyalty_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own loyalty transactions" 
  ON public.loyalty_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Campus pulse feed policies
CREATE POLICY "Users can view their own pulse feed" 
  ON public.campus_pulse_feed 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own pulse feed" 
  ON public.campus_pulse_feed 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Group rentals policies
CREATE POLICY "Users can view group rentals" 
  ON public.group_rentals 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create group rentals" 
  ON public.group_rentals 
  FOR INSERT 
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their group rentals" 
  ON public.group_rentals 
  FOR UPDATE 
  USING (auth.uid() = organizer_id);

-- Group rental participants policies
CREATE POLICY "Users can view group rental participants" 
  ON public.group_rental_participants 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can join group rentals" 
  ON public.group_rental_participants 
  FOR INSERT 
  WITH CHECK (auth.uid() = participant_id);
