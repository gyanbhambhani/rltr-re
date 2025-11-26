-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Workflows Table
create table workflows (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  nodes jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table workflows enable row level security;

create policy "Users can view their own workflows" on workflows
  for select using (auth.uid() = user_id);

create policy "Users can insert their own workflows" on workflows
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own workflows" on workflows
  for update using (auth.uid() = user_id);

create policy "Users can delete their own workflows" on workflows
  for delete using (auth.uid() = user_id);

-- Clients Table
create table clients (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  email text,
  phone text,
  status text check (status in ('Active', 'Lead', 'Past')),
  last_contact timestamptz default now(),
  created_at timestamptz default now()
);

alter table clients enable row level security;

create policy "Users can view their own clients" on clients
  for select using (auth.uid() = user_id);

create policy "Users can insert their own clients" on clients
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own clients" on clients
  for update using (auth.uid() = user_id);

create policy "Users can delete their own clients" on clients
  for delete using (auth.uid() = user_id);

-- Deals Table
create table deals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  value numeric,
  stage text check (stage in ('New', 'Negotiation', 'Under Contract', 'Closed')),
  client_name text,
  created_at timestamptz default now()
);

alter table deals enable row level security;

create policy "Users can view their own deals" on deals
  for select using (auth.uid() = user_id);

create policy "Users can insert their own deals" on deals
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own deals" on deals
  for update using (auth.uid() = user_id);

create policy "Users can delete their own deals" on deals
  for delete using (auth.uid() = user_id);

-- Tasks Table
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  due_date timestamptz,
  priority text check (priority in ('High', 'Medium', 'Low')),
  completed boolean default false,
  created_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Users can view their own tasks" on tasks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks" on tasks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own tasks" on tasks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own tasks" on tasks
  for delete using (auth.uid() = user_id);

-- Contracts Table
create table contracts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  client_name text,
  title text not null,
  status text check (status in ('Draft', 'Sent', 'Signed')),
  last_updated timestamptz default now(),
  content text,
  checklist jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table contracts enable row level security;

create policy "Users can view their own contracts" on contracts
  for select using (auth.uid() = user_id);

create policy "Users can insert their own contracts" on contracts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own contracts" on contracts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own contracts" on contracts
  for delete using (auth.uid() = user_id);

-- Properties Table (Search Agent)
create table properties (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  price text,
  address text,
  beds numeric,
  baths numeric,
  sqft text,
  days_on_market numeric,
  match_score numeric,
  ai_tag text,
  created_at timestamptz default now()
);

alter table properties enable row level security;

create policy "Users can view their own properties" on properties
  for select using (auth.uid() = user_id);

create policy "Users can insert their own properties" on properties
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own properties" on properties
  for update using (auth.uid() = user_id);

create policy "Users can delete their own properties" on properties
  for delete using (auth.uid() = user_id);
