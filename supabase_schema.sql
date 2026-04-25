-- Run this in Supabase SQL Editor

-- Users profile table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  phone text,
  country text,
  language text default 'English',
  role text,
  onboarded boolean default false,
  stripe_customer_id text,
  subscription_status text default 'free',
  subscription_end_date timestamptz,
  searches_today int default 0,
  searches_reset_at date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  ) on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Saved buildings
create table if not exists public.saved_buildings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  building_name text not null,
  area text,
  created_at timestamptz default now()
);

alter table public.saved_buildings enable row level security;
create policy "Users can manage own saved buildings" on public.saved_buildings
  for all using (auth.uid() = user_id);

-- Price alerts
create table if not exists public.price_alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  building_name text,
  area text,
  email text,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.price_alerts enable row level security;
create policy "Users can manage own alerts" on public.price_alerts
  for all using (auth.uid() = user_id);
