import { supabase } from '../../supabase/client';

export interface UserJourneyMetrics {
  averageTimeToComplete: number;
  dropOffPoints: Record<string, number>;
  completionRate: number;
}

export async function getUserJourneyMetrics(): Promise<UserJourneyMetrics> {
  try {
    const { data: requests, error } = await supabase
      .from('analysis_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate completion rate
    const completed = requests.filter(r => r.status === 'completed').length;
    const completionRate = requests.length > 0 ? completed / requests.length : 0;

    // Calculate average time to complete
    const completedRequests = requests.filter(r => r.status === 'completed');
    const totalTime = completedRequests.reduce((acc, req) => {
      const start = new Date(req.created_at).getTime();
      const end = new Date(req.updated_at).getTime();
      return acc + (end - start);
    }, 0);
    
    const averageTime = completedRequests.length > 0 
      ? (totalTime / completedRequests.length) / (1000 * 60) // Convert to minutes
      : 0;

    // Analyze drop-off points
    const dropOffPoints = {
      'Revenue Info': 0,
      'Business Structure': 0,
      'Tax Planning': 0,
      'Final Submission': 0
    };

    requests.forEach(req => {
      const data = req.score_data?.formData;
      if (!data) return;

      if (!data.revenueSources) dropOffPoints['Revenue Info']++;
      else if (!data.businessStructure) dropOffPoints['Business Structure']++;
      else if (!data.taxPlanning) dropOffPoints['Tax Planning']++;
      else if (req.status !== 'completed') dropOffPoints['Final Submission']++;
    });

    // Convert counts to rates
    Object.keys(dropOffPoints).forEach(key => {
      dropOffPoints[key] = requests.length > 0 
        ? dropOffPoints[key] / requests.length 
        : 0;
    });

    return {
      averageTimeToComplete: averageTime,
      dropOffPoints,
      completionRate
    };
  } catch (error) {
    console.error('Error fetching user journey metrics:', error);
    throw error;
  }
}