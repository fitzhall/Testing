import { FormData } from '../../types/scoring';
import { RecommendationLevel, BusinessRecommendation } from '../../types/recommendations';
import { recommendationTemplates } from './templates';

export function analyzeGrowthPotential(formData: FormData): BusinessRecommendation {
  const { businessAge, employees, monthlyRevenue } = formData;
  
  let level: RecommendationLevel = 'medium';
  let priority = 2;
  let impact = 2;
  
  // Business maturity analysis
  if (businessAge === '0-1') {
    level = 'low';
    priority = 3;
    impact = 3;
  } else if (businessAge === '5+') {
    level = 'high';
  }
  
  // Team size analysis
  const teamSize = parseInt(employees.split('-')[0]) || 1;
  if (teamSize === 1) {
    level = 'low';
    priority = 3;
  } else if (teamSize > 10) {
    level = 'high';
    impact = 3;
  }
  
  // Revenue potential analysis
  const revenue = parseInt(monthlyRevenue.split('-')[0]) || 0;
  if (revenue > 50000) {
    level = 'high';
    impact = 3;
  }

  return {
    category: 'Growth Potential',
    recommendations: recommendationTemplates.growth[level],
    priority,
    impact,
    implementationDifficulty: level === 'low' ? 1 : level === 'medium' ? 2 : 3
  };
}