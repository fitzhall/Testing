-- Create prompt templates table
create table if not exists public.prompt_templates (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    version text not null,
    system_prompt text not null,
    user_prompt_template text not null,
    is_active boolean default false,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    created_by uuid references auth.users(id),
    metadata jsonb default '{}'::jsonb,
    unique(name, version)
);

-- Add RLS policies
alter table public.prompt_templates enable row level security;

create policy "Allow read access to all users"
    on public.prompt_templates
    for select
    using (true);

create policy "Allow insert/update for authenticated users only"
    on public.prompt_templates
    for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Add updated_at trigger
create trigger update_prompt_templates_updated_at
    before update on public.prompt_templates
    for each row
    execute function update_updated_at_column();

-- Insert initial prompt template
insert into public.prompt_templates (
    name,
    version,
    system_prompt,
    user_prompt_template,
    is_active,
    metadata
) values (
    'business_analysis',
    '1.0.0',
    'You are an expert business analyst specializing in digital businesses and tax optimization. Provide actionable insights and recommendations based on the business metrics provided.',
    'Generate a detailed business analysis for a digital business with:\n\nScore Breakdown:\n- Overall: {{totalScore}}/{{maxScore}}\n- Revenue: {{revenueScore}}/{{revenueScoreMax}}\n- Tax: {{taxScore}}/{{taxScoreMax}}\n- Growth: {{growthScore}}/{{growthScoreMax}}\n\nBusiness Details:\n- Monthly Revenue: ${{monthlyRevenue}}\n- Structure: {{businessStructure}}\n- Age: {{businessAge}}\n- Team Size: {{employees}}\n\nPlease provide:\n1. Executive Summary\n2. Top 3 Priority Tax Saving Opportunities\n3. 90-Day Implementation Plan\n4. Tax Strategy Recommendations\n5. Revenue Optimization Insights\n6. Risk Management Considerations',
    true,
    '{"description": "Initial prompt template for business analysis", "categories": ["tax", "revenue", "growth"]}'
);