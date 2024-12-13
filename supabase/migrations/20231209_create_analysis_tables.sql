-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables and dependencies
drop table if exists public.analysis_requests cascade;
drop table if exists public.analysis_prompts_request_id_fkey cascade;

-- Create analysis requests table
create table public.analysis_requests (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  score_data jsonb not null,
  analysis_text text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  requested_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  error_message text
);

-- Enable RLS
alter table public.analysis_requests enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Enable insert access for all users" on public.analysis_requests;
drop policy if exists "Enable read access for all users" on public.analysis_requests;

-- Create policies
create policy "Enable insert access for all users"
  on public.analysis_requests
  for insert
  with check (true);

create policy "Enable read access for all users"
  on public.analysis_requests
  for select
  using (true);

-- Create indexes
create index if not exists idx_analysis_requests_email on public.analysis_requests(email);
create index if not exists idx_analysis_requests_status on public.analysis_requests(status);