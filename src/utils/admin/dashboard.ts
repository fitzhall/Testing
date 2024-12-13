import { supabase } from '../supabase/client';

export interface DashboardMetrics {
  totalRequests: number;
  completedRequests: number;
  failedRequests: number;
  averageProcessingTime: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const { data: requests, error: requestsError } = await supabase
      .from('analysis_requests')
      .select('*');

    if (requestsError) throw requestsError;

    const completed = requests.filter(r => r.status === 'completed').length;
    const failed = requests.filter(r => r.status === 'failed').length;
    
    // Calculate average processing time for completed requests
    const completedRequests = requests.filter(r => r.status === 'completed');
    const totalTime = completedRequests.reduce((acc, req) => {
      const start = new Date(req.created_at).getTime();
      const end = new Date(req.updated_at).getTime();
      return acc + (end - start);
    }, 0);
    
    const averageTime = completedRequests.length > 0 
      ? totalTime / completedRequests.length / 1000 // Convert to seconds
      : 0;

    return {
      totalRequests: requests.length,
      completedRequests: completed,
      failedRequests: failed,
      averageProcessingTime: averageTime
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
}