import { supabase } from '../../config/supabase';

export async function setupWebhookConfig() {
  try {
    const { error } = await supabase.rpc('set_webhook_config');
    if (error) throw error;
    console.log('Webhook configuration completed');
  } catch (error) {
    console.error('Error setting up webhook:', error);
  }
}

export async function checkWebhookStatus(requestId: string) {
  try {
    const { data, error } = await supabase
      .from('analysis_requests')
      .select('status, completed_at')
      .eq('id', requestId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking webhook status:', error);
    return null;
  }
}