-- Create dedicated schema for SBMC
create schema if not exists south_bay_milk_club;

-- Profiles (extends auth.users)
create table south_bay_milk_club.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  phone text,
  role text default 'client' check (role in ('client', 'provider', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table south_bay_milk_club.profiles enable row level security;

create policy "Users can view own profile"
  on south_bay_milk_club.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on south_bay_milk_club.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function south_bay_milk_club.handle_new_user()
returns trigger as $$
begin
  insert into south_bay_milk_club.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_sbmc
  after insert on auth.users
  for each row execute procedure south_bay_milk_club.handle_new_user();

-- Contact form submissions
create table south_bay_milk_club.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  due_date date,
  message text,
  created_at timestamptz default now()
);

alter table south_bay_milk_club.contact_submissions enable row level security;

-- Only allow inserts (admin reads via Supabase dashboard)
create policy "Anyone can submit contact form"
  on south_bay_milk_club.contact_submissions for insert with check (true);

-- Expose the schema to the API (PostgREST)
-- This is required for the Supabase client to query tables in this schema
grant usage on schema south_bay_milk_club to anon, authenticated, service_role;
grant all on all tables in schema south_bay_milk_club to anon, authenticated, service_role;
grant all on all sequences in schema south_bay_milk_club to anon, authenticated, service_role;
alter default privileges in schema south_bay_milk_club grant all on tables to anon, authenticated, service_role;
alter default privileges in schema south_bay_milk_club grant all on sequences to anon, authenticated, service_role;
