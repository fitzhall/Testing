import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

export async function createAnalysisRequest(email: string, scoreData: any) {
  const { data, error } = await adminClient
    .from('analysis_requests')
    .insert([
      {
        email,
        score_data: scoreData,
        status: 'pending'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function checkAnalysisStatus(requestId: string) {
  const { data, error } = await adminClient
    .from('analysis_requests')
    .select('status, completed_at')
    .eq('id', requestId)
    .single();

  if (error) throw error;
  return data;
}