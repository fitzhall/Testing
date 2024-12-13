import { supabase } from '../../supabase/client';

export interface AnalysisStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  averageProcessingTime: number;
}

export async function getAnalysisStats(): Promise<AnalysisStats> {
  const { data: statusCounts, error: countError } = await supabase
    .from('analysis_requests')
    .select('status', { count: 'exact', head: false })
    .then(result => {
      const counts = {
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0
      };
      
      result.data?.forEach((row: any) => {
        counts[row.status as keyof typeof counts]++;
      });
      
      return counts;
    });

  const { data: timingData, error: timingError } = await supabase
    .from('analysis_requests')
    .select('created_at, updated_at')
    .eq('status', 'completed')
    .then(result => {
      let totalTime = 0;
      result.data?.forEach(row => {
        const start = new Date(row.created_at).getTime();
        const end = new Date(row.updated_at).getTime();
        totalTime += end - start;
      });
      return totalTime / (result.data?.length || 1) / 1000; // Average in seconds
    });

  if (countError || timingError) {
    throw new Error('Failed to fetch analysis stats');
  }

  return {
    ...statusCounts,
    averageProcessingTime: timingData
  };
}