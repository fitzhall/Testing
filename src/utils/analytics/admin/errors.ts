import { supabase } from '../../supabase/client';

export interface ErrorReport {
  count: number;
  message: string;
  lastOccurred: string;
}

export async function getErrorReports(): Promise<ErrorReport[]> {
  const { data, error } = await supabase
    .from('analysis_requests')
    .select('error_message, updated_at')
    .eq('status', 'failed')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  const errorCounts = data.reduce((acc: Record<string, ErrorReport>, curr) => {
    const msg = curr.error_message || 'Unknown error';
    if (!acc[msg]) {
      acc[msg] = {
        count: 0,
        message: msg,
        lastOccurred: curr.updated_at
      };
    }
    acc[msg].count++;
    return acc;
  }, {});

  return Object.values(errorCounts);
}