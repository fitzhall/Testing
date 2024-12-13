import { FormData, TotalScoreResult } from '../../types/scoring';
import { calculateRevenueScore } from './revenueScoring';
import { calculateTaxScore } from './taxScoring';
import { RevenueSources } from '../../types/revenue';

/**
 * Generates recommendations based on scores
 */
function generateRecommendations(
  formData: FormData,
  revenueScore: number,
  taxScore: number
): string[] {
  const recommendations: string[] = [];

  // Revenue recommendations
  const activeSourcesCount = Object.values(formData.revenueSources).filter(Boolean).length;
  if (activeSourcesCount < 2) {
    recommendations.push('Consider diversifying your revenue streams across multiple platforms');
  }

  // Structure recommendations
  if (formData.businessStructure === 'sole-proprietorship' && 
      formData.revenueAmounts.monthlyRevenue > 5000) {
    recommendations.push('Consider forming an LLC or Corporation for better tax benefits and protection');
  }

  // Expense tracking recommendations
  if (formData.expenseCategories.length < 5) {
    recommendations.push('Implement more detailed expense tracking across different categories');
  }

  return recommendations;
}

/**
 * Calculates total business score and provides recommendations
 */
export function calculateTotalScore(formData: FormData): TotalScoreResult {
  const revenueScoreResult = calculateRevenueScore(formData);
  const taxScoreResult = calculateTaxScore(formData);

  const recommendations = generateRecommendations(
    formData,
    revenueScoreResult.score,
    taxScoreResult.score
  );

  return {
    totalScore: revenueScoreResult.score + taxScoreResult.score,
    maxScore: revenueScoreResult.maxScore + taxScoreResult.maxScore,
    revenueScore: revenueScoreResult,
    taxScore: taxScoreResult,
    recommendations,
    formData // Include the original form data
  };
}