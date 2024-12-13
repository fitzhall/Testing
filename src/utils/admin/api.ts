import { supabase } from '../supabase/client';
import { trackError } from '../analytics/core/error-tracking';
import { AnalyticsMetrics } from '../analytics/admin/dashboard';
import { UserJourneyMetrics } from '../analytics/admin/user-journey';
import { RevenueMetrics } from '../analytics/admin/revenue';
import { BusinessInsights } from '../analytics/admin/business';

interface DashboardData {
  stats: AnalyticsMetrics;
  journeyMetrics: UserJourneyMetrics;
  revenueMetrics: RevenueMetrics;
  businessInsights: BusinessInsights;
  errors: Array<{
    message: string;
    timestamp: string;
    requestId: string;
  }>;
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const { data: requests, error } = await supabase
      .from('analysis_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate stats
    const total = requests.length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const failed = requests.filter(r => r.status === 'failed').length;
    const pending = requests.filter(r => r.status === 'pending').length;
    const processing = requests.filter(r => r.status === 'processing').length;

    // Calculate average processing time
    const completedRequests = requests.filter(r => r.status === 'completed');
    const totalProcessingTime = completedRequests.reduce((acc, req) => {
      const start = new Date(req.created_at).getTime();
      const end = new Date(req.updated_at).getTime();
      return acc + (end - start);
    }, 0);

    const averageProcessingTime = completedRequests.length > 0 
      ? totalProcessingTime / completedRequests.length / 1000 // Convert to seconds
      : 0;

    // Calculate revenue metrics
    const revenues = requests
      .map(r => r.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0);
    const averageRevenue = revenues.length > 0
      ? revenues.reduce((a, b) => a + b, 0) / revenues.length
      : 0;

    // Calculate monthly trend
    const monthlyTrend = calculateMonthlyTrend(requests);

    return {
      stats: {
        totalRequests: total,
        completionRate: total > 0 ? (completed / total) * 100 : 0,
        averageTime: averageProcessingTime,
        errorRate: total > 0 ? (failed / total) * 100 : 0
      },
      journeyMetrics: {
        averageTimeToComplete: averageProcessingTime / 60, // Convert to minutes
        dropOffPoints: calculateDropOffPoints(requests),
        completionRate: total > 0 ? completed / total : 0
      },
      revenueMetrics: {
        averageRevenue,
        revenueDistribution: calculateRevenueDistribution(requests),
        monthlyTrend
      },
      businessInsights: {
        commonStructures: calculateCommonStructures(requests),
        structureByRevenue: calculateStructureByRevenue(requests),
        industryComparisons: calculateIndustryComparisons(requests)
      },
      errors: requests
        .filter(r => r.status === 'failed' && r.error_message)
        .map(r => ({
          message: r.error_message,
          timestamp: r.updated_at,
          requestId: r.id
        }))
    };
  } catch (error) {
    trackError(error, 'getDashboardData');
    throw new Error('Failed to fetch dashboard data');
  }
}

function calculateDropOffPoints(requests: any[]): Record<string, number> {
  const dropOffs = {
    'Revenue Info': 0,
    'Business Structure': 0,
    'Tax Planning': 0,
    'Final Submission': 0
  };

  const total = requests.length;
  if (total === 0) return dropOffs;

  requests.forEach(req => {
    const data = req.score_data?.formData;
    if (!data?.revenueSources) dropOffs['Revenue Info']++;
    else if (!data.businessStructure) dropOffs['Business Structure']++;
    else if (!data.taxPlanning) dropOffs['Tax Planning']++;
    else if (req.status !== 'completed') dropOffs['Final Submission']++;
  });

  // Convert to rates
  Object.keys(dropOffs).forEach(key => {
    dropOffs[key] = dropOffs[key] / total;
  });

  return dropOffs;
}

function calculateRevenueDistribution(requests: any[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  requests.forEach(req => {
    const sources = req.score_data?.formData?.revenueSources || {};
    const monthlyRevenue = req.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0;
    
    Object.entries(sources).forEach(([source, active]) => {
      if (active) {
        distribution[source] = (distribution[source] || 0) + monthlyRevenue;
      }
    });
  });
  return distribution;
}

function calculateMonthlyTrend(requests: any[]): number[] {
  const months = 6;
  const trend = new Array(months).fill(0);
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

function calculateCommonStructures(requests: any[]): Record<string, number> {
  const structures: Record<string, number> = {};
  requests.forEach(req => {
    const structure = req.score_data?.formData?.businessStructure;
    if (structure) {
      structures[structure] = (structures[structure] || 0) + 1;
    }
  });
  return structures;
}

function calculateStructureByRevenue(requests: any[]): Record<string, number> {
  const structureRevenue: Record<string, number[]> = {};
  requests.forEach(req => {
    const structure = req.score_data?.formData?.businessStructure;
    const revenue = req.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0;
    if (structure) {
      structureRevenue[structure] = structureRevenue[structure] || [];
      structureRevenue[structure].push(revenue);
    }
  });

  const averages: Record<string, number> = {};
  Object.entries(structureRevenue).forEach(([structure, revenues]) => {
    averages[structure] = revenues.reduce((a, b) => a + b, 0) / revenues.length;
  });
  return averages;
}

function calculateIndustryComparisons(requests: any[]): Record<string, number> {
  return {
    'Revenue': calculatePercentile(requests, r => 
      r.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0),
    'Tax Efficiency': calculatePercentile(requests, r => 
      r.score_data?.taxScore?.score || 0),
    'Growth Rate': calculatePercentile(requests, r => 
      r.score_data?.growthScore?.score || 0)
  };
}

function calculatePercentile(requests: any[], getValue: (r: any) => number): number {
  const values = requests.map(getValue).sort((a, b) => a - b);
  const position = values.length - 1;
  return position > 0 ? position / values.length : 0;
}