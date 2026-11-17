-- Run this file in Supabase Dashboard > SQL Editor.
-- Enable RLS on every table. Never expose the service_role key in the browser.

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  address text,
  phone text,
  is_active boolean not null default true,
  owner_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  description text,
  price integer not null check (price >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '聯大新朋友',
  avatar text not null default '🧑🏻‍🎓',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  restaurant_id text not null,
  status text not null default 'pending'
    check (status in ('pending','accepted','preparing','ready','completed','cancelled')),
  total_amount integer not null check (total_amount >= 0),
  note text,
  payment_method text not null default 'pay_at_pickup',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id text not null,
  item_name text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room text not null default 'campus',
  user_id uuid not null references auth.users(id),
  display_name text not null,
  body text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now()
);

create table if not exists public.avatar_positions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  x integer not null default 2,
  y integer not null default 2,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.restaurants enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.chat_messages enable row level security;
alter table public.avatar_positions enable row level security;

-- Profiles: users can read basic profiles and update only their own row.
create policy "profiles are readable by authenticated users" on public.profiles
for select to authenticated using (true);
create policy "users insert own profile" on public.profiles
for insert to authenticated with check (auth.uid() = id);
create policy "users update own profile" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Restaurant/menu catalogue is public read-only. Manage through trusted admin tooling initially.
create policy "active restaurants readable" on public.restaurants
for select using (is_active = true);
create policy "available menu readable" on public.menu_items
for select using (is_available = true);

-- Orders: customers can only access their own orders.
create policy "users read own orders" on public.orders
for select to authenticated using (auth.uid() = user_id);
create policy "users create own orders" on public.orders
for insert to authenticated with check (auth.uid() = user_id);
create policy "users read own order items" on public.order_items
for select to authenticated using (
  exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "users create own order items" on public.order_items
for insert to authenticated with check (
  exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

-- Chat: signed-in users may read and create messages as themselves.
create policy "authenticated read chat" on public.chat_messages
for select to authenticated using (true);
create policy "users send own chat messages" on public.chat_messages
for insert to authenticated with check (auth.uid() = user_id);

-- Position visibility and ownership.
create policy "authenticated read positions" on public.avatar_positions
for select to authenticated using (true);
create policy "users upsert own position" on public.avatar_positions
for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own position" on public.avatar_positions
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- NOTE:
-- This starter SQL intentionally does not allow clients to update order status,
-- create restaurants, or edit menus. Build a server-side restaurant/admin workflow
-- with verified roles and stricter policies before real merchants use the system.
-- For production, calculate prices server-side from menu_items; never trust browser totals.
