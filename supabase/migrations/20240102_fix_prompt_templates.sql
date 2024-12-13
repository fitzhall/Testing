-- Drop existing table if it exists
drop table if exists public.prompt_templates cascade;

-- Create prompt templates table with proper structure
create table public.prompt_templates (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    version text not null,
    system_prompt text not null,
    user_prompt_template text not null,
    is_active boolean default false,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    constraint unique_name_version unique(name, version)
);

-- Enable RLS
alter table public.prompt_templates enable row level security;

-- Drop existing policies
drop policy if exists "Enable read access to all users" on public.prompt_templates;
drop policy if exists "Enable insert/update for all users" on public.prompt_templates;

-- Create new policies with proper permissions
create policy "Enable read access to all users"
    on public.prompt_templates for select
    using (true);

create policy "Enable insert/update for all users"
    on public.prompt_templates for all
    using (true)
    with check (true);

-- Create updated_at trigger function if it doesn't exist
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
drop trigger if exists update_prompt_templates_updated_at on public.prompt_templates;
create trigger update_prompt_templates_updated_at
    before update on public.prompt_templates
    for each row
    execute function update_updated_at_column();

-- Create function to set active template
create or replace function public.set_active_prompt_template(template_id uuid)
returns void as $$
begin
    -- First, set all templates to inactive
    update public.prompt_templates
    set is_active = false;
    
    -- Then set the specified template to active
    update public.prompt_templates
    set 
        is_active = true,
        updated_at = now()
    where id = template_id;
end;
$$ language plpgsql security definer;

-- Insert default template if none exists
insert into public.prompt_templates (
    name,
    version,
    system_prompt,
    user_prompt_template,
    is_active
) 
select 
    'Default Analysis Template',
    '1.0.0',
    'You are an expert business analyst specializing in digital businesses and tax optimization. Provide actionable insights and recommendations based on the business metrics provided.',
    'Generate a detailed business analysis for a digital business with:\n\nScore Breakdown:\n- Overall: {{totalScore}}/{{maxScore}}\n- Revenue: {{revenueScore}}/{{revenueScoreMax}}\n- Tax: {{taxScore}}/{{taxScoreMax}}\n- Growth: {{growthScore}}/{{growthScoreMax}}\n\nBusiness Details:\n- Monthly Revenue: ${{monthlyRevenue}}\n- Structure: {{businessStructure}}\n- Age: {{businessAge}}\n- Team Size: {{employees}}\n\nPlease provide:\n1. Executive Summary\n2. Top 3 Priority Tax Saving Opportunities\n3. 90-Day Implementation Plan\n4. Tax Strategy Recommendations\n5. Revenue Optimization Insights\n6. Risk Management Considerations',
    true
where not exists (
    select 1 from public.prompt_templates where is_active = true
);