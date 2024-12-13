-- Function to set active prompt template
create or replace function set_active_prompt_template(template_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    -- First, set all templates to inactive
    update prompt_templates
    set is_active = false;
    
    -- Then set the specified template to active
    update prompt_templates
    set 
        is_active = true,
        updated_at = now()
    where id = template_id;
end;
$$;