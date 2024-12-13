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

create policy "Enable update for service role"
  on public.analysis_requests
  for update
  using (auth.role() = 'service_role');

-- Create webhook function
create or replace function public.handle_new_analysis_request()
returns trigger as $$
declare
  webhook_url text := 'https://xgyksmyvejknyllzjtsh.supabase.co/functions/v1/process-analysis';
  service_role_key text := current_setting('app.settings.service_role_key', true);
  response json;
begin
  -- Update status to processing
  update public.analysis_requests
  set status = 'processing'
  where id = NEW.id;

  -- Call the Edge Function
  perform http_post(
    webhook_url,
    jsonb_build_object(
      'email', NEW.email,
      'scoreData', NEW.score_data
    )::text,
    'application/json',
    ARRAY[
      ('Authorization', 'Bearer ' || service_role_key)::http_header
    ]
  );
  
  return NEW;
exception when others then
  -- Update status to failed if webhook call fails
  update public.analysis_requests
  set 
    status = 'failed',
    error_message = SQLERRM
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