-- Drop existing table if it exists
drop table if exists public.analysis_requests cascade;

-- Create analysis requests table with proper structure
create table public.analysis_requests (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    score_data jsonb not null,
    analysis_text text,
    status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    error_message text
);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_analysis_requests_updated_at
    before update on analysis_requests
    for each row
    execute function update_updated_at_column();

-- Enable RLS
alter table public.analysis_requests enable row level security;

-- Drop existing policies
drop policy if exists "Enable insert for all users" on public.analysis_requests;
drop policy if exists "Enable select for all users" on public.analysis_requests;
drop policy if exists "Enable update for all users" on public.analysis_requests;

-- Create new policies
create policy "Enable insert for all users"
    on public.analysis_requests
    for insert
    with check (true);

create policy "Enable select for own requests"
    on public.analysis_requests
    for select
    using (email = current_user or auth.role() = 'anon');

create policy "Enable update for own requests"
    on public.analysis_requests
    for update
    using (email = current_user or auth.role() = 'anon')
    with check (status in ('pending', 'processing', 'completed', 'failed'));