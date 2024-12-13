-- Create webhook function
create or replace function public.handle_new_analysis_request()
returns trigger as $$
declare
  webhook_url text := 'https://xgyksmyvejknyllzjtsh.supabase.co/functions/v1/process-analysis';
  response json;
begin
  -- Call the Edge Function
  select content::json into response
  from http((
    'POST',
    webhook_url,
    ARRAY[http_header('Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'))],
    'application/json',
    json_build_object(
      'email', NEW.email,
      'scoreData', NEW.score_data
    )::text
  )::http_request);
  
  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger
drop trigger if exists on_new_analysis_request on public.analysis_requests;
create trigger on_new_analysis_request
  after insert on public.analysis_requests
  for each row
  execute function public.handle_new_analysis_request();