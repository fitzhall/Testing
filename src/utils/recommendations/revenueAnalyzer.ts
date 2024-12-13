import { FormData } from '../../types/scoring';
import { RecommendationLevel, BusinessRecommendation } from '../../types/recommendations';
import { recommendationTemplates } from './templates';

export function analyzeRevenueStructure(formData: FormData): BusinessRecommendation {
  const { platforms, monthlyRevenue } = formData;
  
  // Determine recommendation level
  let level: RecommendationLevel = 'medium';
  let priority = 2;
  let impact = 2;
  
  // Platform diversity analysis
  if (platforms.length < 2) {
    level = 'low';
    priority = 3;
    impact = 3;
  } else if (platforms.length > 4) {
    level = 'high';
    priority = 1;
    impact = 2;
  }
  
  // Revenue level analysis
  const revenueAmount = parseInt(monthlyRevenue.split('-')[0]) || 0;
  if (revenueAmount < 5000) {
    level = 'low';
    priority = 3;
    impact = 3;
  } else if (revenueAmount > 20000) {
    level = 'high';
    impact = 3;
  }

  return {
    category: 'Revenue',
    recommendations: recommendationTemplates.revenue[level],
    priority,
    impact,
    implementationDifficulty: level === 'low' ? 1 : level === 'medium' ? 2 : 3
  };
}