import { FormData, ScoreResult } from '../../types/scoring';

/**
 * Calculates score based on entity structure efficiency
 */
export function calculateEntityScore(businessStructure: string, monthlyRevenue: number): number {
  // Base score from structure
  const baseScore = {
    'sole-proprietorship': 5,
    'partnership': 8,
    'llc': 12,
    's-corporation': 15,
    'corporation': 13
  }[businessStructure] || 0;

  // Adjust based on revenue level
  if (monthlyRevenue > 10000 && businessStructure === 'sole-proprietorship') {
    return Math.max(baseScore - 3, 0); // Penalty for high revenue with simple structure
  }

  // Bonus for S-Corp with significant revenue
  if (monthlyRevenue > 15000 && businessStructure === 's-corporation') {
    return Math.min(baseScore + 2, 15); // Bonus for optimal structure with high revenue
  }

  return baseScore;
}

/**
 * Calculates score based on expense tracking practices
 */
export function calculateExpenseTrackingScore(expenseCategories: string[]): number {
  const score = Math.min(expenseCategories.length * 2, 15);
  return score;
}

/**
 * Calculates score based on tax planning indicators
 */
export function calculateTaxPlanningScore(formData: FormData): number {
  let score = 0;
  
  // Score based on business age (established businesses likely have better planning)
  if (formData.businessAge === '3-5' || formData.businessAge === '5+') score += 5;
  else if (formData.businessAge === '1-3') score += 3;

  // Score based on expense tracking comprehensiveness
  if (formData.expenseCategories.length >= 6) score += 5;
  else if (formData.expenseCategories.length >= 3) score += 3;

  // Additional points for optimal tax structure
  if (formData.businessStructure === 's-corporation' && formData.revenueAmounts.monthlyRevenue > 10000) {
    score += 2;
  }

  return Math.min(score, 10); // Cap at 10 points
}

/**
 * Calculates overall tax efficiency score
 */
export function calculateTaxScore(formData: FormData): ScoreResult {
  const entityScore = calculateEntityScore(formData.businessStructure, formData.revenueAmounts.monthlyRevenue);
  const expenseScore = calculateExpenseTrackingScore(formData.expenseCategories);
  const planningScore = calculateTaxPlanningScore(formData);

  const details: string[] = [
    `Entity Structure: ${entityScore}/15 points`,
    `Expense Tracking: ${expenseScore}/15 points`,
    `Tax Planning: ${planningScore}/10 points`
  ];

  return {
    score: entityScore + expenseScore + planningScore,
    maxScore: 40,
    details
  };
}