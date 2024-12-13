import { supabase } from '../../config/supabase';

export async function checkAnalysisStatus(email: string) {
  try {
    const { data, error } = await supabase
      .from('analysis_requests')
      .select('*')
      .eq('email', email)
      .order('requested_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking analysis status:', error);
    return null;
  }
}