import { FormData } from '../../types/scoring';
import { RecommendationLevel, BusinessRecommendation } from '../../types/recommendations';
import { recommendationTemplates } from './templates';

export function analyzeTaxEfficiency(formData: FormData): BusinessRecommendation {
  const { businessStructure, expenseCategories, monthlyRevenue } = formData;
  
  let level: RecommendationLevel = 'medium';
  let priority = 2;
  let impact = 2;
  
  // Entity structure analysis
  if (businessStructure === 'sole-proprietorship') {
    const revenue = parseInt(monthlyRevenue.split('-')[0]) || 0;
    if (revenue > 10000) {
      level = 'low';
      priority = 3;
      impact = 3;
    }
  } else if (businessStructure === 'corporation') {
    level = 'high';
  }
  
  // Expense tracking analysis
  if (expenseCategories.length < 3) {
    level = 'low';
    priority = 3;
    impact = 3;
  } else if (expenseCategories.length > 6) {
    level = 'high';
    impact = 2;
  }

  return {
    category: 'Tax Efficiency',
    recommendations: recommendationTemplates.tax[level],
    priority,
    impact,
    implementationDifficulty: level === 'low' ? 1 : level === 'medium' ? 2 : 3
  };
}