-- Drop existing table and functions
drop table if exists public.prompt_templates cascade;
drop function if exists public.set_active_prompt_template cascade;

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

-- Enable RLS
alter table public.prompt_templates enable row level security;

-- Create RLS policies
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
    update public.prompt_templates set is_active = false;
    update public.prompt_templates set is_active = true where id = template_id;
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
    'You are an expert business analyst specializing in digital businesses and tax optimization.',
    'You are a skilled tax advisor specializing in creator businesses. Your task is to analyze CORE Assessment results and generate a report that identifies business and tax optimization opportunities.

Score Breakdown:
- Overall: {{totalScore}}/{{maxScore}}
- Revenue: {{revenueScore}}/{{revenueScoreMax}}
- Tax: {{taxScore}}/{{taxScoreMax}}
- Growth: {{growthScore}}/{{growthScoreMax}}

Business Details:
- Monthly Revenue: ${{monthlyRevenue}}
- Structure: {{businessStructure}}
- Age: {{businessAge}}
- Team Size: {{employees}}

Full Assessment Data:
{{scoreData}}',
    true
);