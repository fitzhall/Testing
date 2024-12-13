-- Enable HTTP extension if not exists
create extension if not exists "http" with schema extensions;

-- Create webhook function
create or replace function public.handle_new_analysis_request()
returns trigger as $$
declare
  webhook_url text := 'https://xgyksmyvejknyllzjtsh.supabase.co/functions/v1/process-analysis';
  service_role_key text := current_setting('app.settings.service_role_key', true);
  payload jsonb;
  result record;
begin
  -- Construct the payload
  payload := jsonb_build_object(
    'email', NEW.email,
    'scoreData', NEW.score_data
  );

  -- Make the HTTP request
  select
    into result
    *
  from
    http.post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', concat('Bearer ', service_role_key)
      ),
      body := payload
    );

  -- Check response
  if result.status != 200 then
    raise warning 'Webhook request failed with status %', result.status;
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger
drop trigger if exists on_new_analysis_request on public.analysis_requests;
create trigger on_new_analysis_request
  after insert on public.analysis_requests
  for each row
  execute function public.handle_new_analysis_request();

-- Set up secure webhook config
create or replace function set_webhook_config()
returns void as $$
begin
  perform set_config(
    'app.settings.service_role_key',
    current_setting('SUPABASE_SERVICE_ROLE_KEY'),
    false
  );
end;
$$ language plpgsql security definer;