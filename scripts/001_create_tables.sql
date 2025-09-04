-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('rider', 'driver')),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drivers table (additional driver-specific info)
CREATE TABLE IF NOT EXISTS public.drivers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  license_number TEXT NOT NULL,
  motorcycle_model TEXT NOT NULL,
  motorcycle_plate TEXT NOT NULL,
  motorcycle_year INTEGER,
  motorcycle_color TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 5.0,
  total_rides INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rides table
CREATE TABLE IF NOT EXISTS public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID NOT NULL REFERENCES public.users(id),
  driver_id UUID REFERENCES public.users(id),
  pickup_address TEXT NOT NULL,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  destination_address TEXT NOT NULL,
  destination_latitude DECIMAL(10, 8),
  destination_longitude DECIMAL(11, 8),
  status TEXT DEFAULT 'requested' CHECK (status IN ('requested', 'accepted', 'in_progress', 'completed', 'cancelled')),
  fare_amount DECIMAL(10, 2),
  distance_km DECIMAL(8, 2),
  duration_minutes INTEGER,
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'digital_wallet')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for drivers table
CREATE POLICY "Drivers can view their own data" ON public.drivers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Drivers can update their own data" ON public.drivers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Drivers can insert their own data" ON public.drivers
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all drivers for ride matching" ON public.drivers
  FOR SELECT USING (true);

-- RLS Policies for rides table
CREATE POLICY "Users can view their own rides" ON public.rides
  FOR SELECT USING (auth.uid() = rider_id OR auth.uid() = driver_id);

CREATE POLICY "Riders can create rides" ON public.rides
  FOR INSERT WITH CHECK (auth.uid() = rider_id);

CREATE POLICY "Users can update their own rides" ON public.rides
  FOR UPDATE USING (auth.uid() = rider_id OR auth.uid() = driver_id);
