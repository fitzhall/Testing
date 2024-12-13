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
    E'You are a skilled tax advisor specializing in creator businesses. Your task is to analyze CORE Assessment results and generate a report that identifies business and tax optimization opportunities. Your goal is to motivate potential clients to book a strategy session by presenting clear problems, hinting at solutions, and creating urgency.\n\nHere is the assessment data for the client:\n\nScore Breakdown:\n- Overall: {{totalScore}}/{{maxScore}}\n- Revenue: {{revenueScore}}/{{revenueScoreMax}}\n- Tax: {{taxScore}}/{{taxScoreMax}}\n- Growth: {{growthScore}}/{{growthScoreMax}}\n\nBusiness Details:\n- Monthly Revenue: ${{monthlyRevenue}}\n- Structure: {{businessStructure}}\n- Age: {{businessAge}}\n- Team Size: {{employees}}\n\nFull Assessment Data:\n{{scoreData}}\n\nPlease follow these steps to generate your analysis:\n\n1. Calculate Scores:\n   - Revenue Performance (30 points max)\n   - Tax Efficiency (40 points max)\n   - Growth Potential (30 points max)\n   Use the scoring breakdown provided in the assessment data to determine each score.\n\n2. Calculate Opportunities:\n   - Tax Savings Potential = Monthly Revenue × 12 × Tax Efficiency Gap\n   - Revenue Optimization: For single revenue source, estimate 20-30% increase with additional stream\n   - Growth Gaps: Compare to industry benchmarks and identify limiting factors\n\n3. Present your calculations in a table format with the following columns:\n   | Category | Details | Result | Reasoning | Industry Benchmark |\n\n4. After your analysis, present your final report in the following structure:\n\n<final_report>\n  <title>CORE Assessment Results</title>\n\n  <executive_summary>\n    [Concise summary of key findings and opportunities]\n  </executive_summary>\n  \n  <score_breakdown>\n    [Present scores in a table format]\n  </score_breakdown>\n  \n  <opportunity_analysis>\n    <tax_savings_potential>[Calculated potential savings range]</tax_savings_potential>\n    <revenue_optimization>[Potential increase with additional stream]</revenue_optimization>\n    <growth_gaps>[Identified gaps compared to industry benchmarks]</growth_gaps>\n  </opportunity_analysis>\n  \n  <key_findings>\n    [List of 3-5 key findings, focusing on opportunities]\n  </key_findings>\n  \n  <next_steps>\n    [Clear, actionable next steps for the client]\n  </next_steps>\n  \n  <call_to_action>\n    [Compelling reasons to book a free strategy session with a tax specialist]\n  </call_to_action>\n</final_report>',
    true
);