-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "http" with schema extensions;

-- Drop existing tables if they exist
drop table if exists public.analysis_requests cascade;

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

-- Create policies
create policy "Enable insert access for all users"
  on public.analysis_requests
  for insert
  with check (true);

create policy "Enable read access for all users"
  on public.analysis_requests
  for select
  using (true);

-- Create webhook function
create or replace function public.handle_new_analysis_request()
returns trigger as $$
begin
  -- Update status to processing
  update public.analysis_requests
  set status = 'processing'
  where id = NEW.id;
  
  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger
drop trigger if exists on_new_analysis_request on public.analysis_requests;
create trigger on_new_analysis_request
  after insert on public.analysis_requests
  for each row
  execute function public.handle_new_analysis_request();

-- Create indexes
create index if not exists idx_analysis_requests_email on public.analysis_requests(email);
create index if not exists idx_analysis_requests_status on public.analysis_requests(status);