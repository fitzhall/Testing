-- Drop existing table if it exists
drop table if exists public.prompt_templates cascade;

-- Create prompt templates table
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

-- Add RLS policies
alter table public.prompt_templates enable row level security;

create policy "Enable read access to all users"
    on public.prompt_templates for select
    using (true);

create policy "Enable insert/update for all users"
    on public.prompt_templates for all
    using (true)
    with check (true);

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

-- Insert default template
insert into public.prompt_templates (
    name,
    version,
    system_prompt,
    user_prompt_template,
    is_active
) values (
    'Default Analysis Template',
    '1.0.0',
    'You are an expert business analyst specializing in digital businesses and tax optimization. Provide actionable insights and recommendations based on the business metrics provided.',
    'Generate a detailed business analysis for a digital business with:\n\nScore Breakdown:\n- Overall: {{totalScore}}/{{maxScore}}\n- Revenue: {{revenueScore}}/{{revenueScoreMax}}\n- Tax: {{taxScore}}/{{taxScoreMax}}\n- Growth: {{growthScore}}/{{growthScoreMax}}\n\nBusiness Details:\n- Monthly Revenue: ${{monthlyRevenue}}\n- Structure: {{businessStructure}}\n- Age: {{businessAge}}\n- Team Size: {{employees}}\n\nPlease provide:\n1. Executive Summary\n2. Top 3 Priority Tax Saving Opportunities\n3. 90-Day Implementation Plan\n4. Tax Strategy Recommendations\n5. Revenue Optimization Insights\n6. Risk Management Considerations',
    true
);