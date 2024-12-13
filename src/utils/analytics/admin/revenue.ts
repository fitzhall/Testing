import { supabase } from '../../supabase/client';

export interface RevenueMetrics {
  averageRevenue: number;
  revenueDistribution: Record<string, number>;
  monthlyTrend: number[];
}

export async function getRevenueMetrics(): Promise<RevenueMetrics> {
  try {
    const { data: requests, error } = await supabase
      .from('analysis_requests')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Calculate average revenue
    const revenues = requests
      .map(r => r.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0);
    const averageRevenue = revenues.length > 0
      ? revenues.reduce((a, b) => a + b, 0) / revenues.length
      : 0;

    // Calculate revenue distribution by source
    const revenueDistribution: Record<string, number> = {};
    requests.forEach(req => {
      const sources = req.score_data?.formData?.revenueSources || {};
      const monthlyRevenue = req.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0;
      
      Object.entries(sources).forEach(([source, active]) => {
        if (active) {
          revenueDistribution[source] = (revenueDistribution[source] || 0) + monthlyRevenue;
        }
      });
    });

    // Calculate monthly trend (last 6 months)
    const monthlyTrend = calculateMonthlyTrend(requests);

    return {
      averageRevenue,
      revenueDistribution,
      monthlyTrend
    };
  } catch (error) {
    console.error('Error fetching revenue metrics:', error);
    throw error;
  }
}

function calculateMonthlyTrend(requests: any[]): number[] {
  const months = 6;
  const trend: number[] = new Array(months).fill(0);
  const now = new Date();
  
  requests.forEach(req => {
    const requestDate = new Date(req.created_at);
    const monthDiff = (now.getMonth() - requestDate.getMonth() + 
      (now.getFullYear() - requestDate.getFullYear()) * 12);
    
    if (monthDiff >= 0 && monthDiff < months) {
      trend[months - 1 - monthDiff] += 
        req.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0;
    }
  });

  return trend;
}