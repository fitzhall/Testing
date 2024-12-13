import { supabase } from '../../supabase/client';

export interface BusinessInsights {
  commonStructures: Record<string, number>;
  structureByRevenue: Record<string, number>;
  industryComparisons: Record<string, number>;
}

export async function getBusinessInsights(): Promise<BusinessInsights> {
  try {
    const { data: requests, error } = await supabase
      .from('analysis_requests')
      .select('*');

    if (error) throw error;

    // Calculate common structures
    const commonStructures: Record<string, number> = {};
    const structureRevenue: Record<string, number[]> = {};

    requests.forEach(req => {
      const structure = req.score_data?.formData?.businessStructure;
      const revenue = req.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0;
      
      if (structure) {
        commonStructures[structure] = (commonStructures[structure] || 0) + 1;
        structureRevenue[structure] = structureRevenue[structure] || [];
        structureRevenue[structure].push(revenue);
      }
    });

    // Calculate average revenue by structure
    const structureByRevenue: Record<string, number> = {};
    Object.entries(structureRevenue).forEach(([structure, revenues]) => {
      structureByRevenue[structure] = revenues.reduce((a, b) => a + b, 0) / revenues.length;
    });

    // Calculate industry comparisons
    const industryComparisons = calculateIndustryComparisons(requests);

    return {
      commonStructures,
      structureByRevenue,
      industryComparisons
    };
  } catch (error) {
    console.error('Error fetching business insights:', error);
    throw error;
  }
}

function calculateIndustryComparisons(requests: any[]): Record<string, number> {
  const metrics = {
    'Revenue': calculatePercentile(requests, r => 
      r.score_data?.formData?.revenueAmounts?.monthlyRevenue || 0),
    'Tax Efficiency': calculatePercentile(requests, r => 
      r.score_data?.taxScore?.score || 0),
    'Growth Rate': calculatePercentile(requests, r => 
      r.score_data?.growthScore?.score || 0)
  };

  return metrics;
}

function calculatePercentile(requests: any[], getValue: (r: any) => number): number {
  const values = requests.map(getValue).sort((a, b) => a - b);
  const position = values.length - 1;
  return position > 0 ? position / values.length : 0;
}