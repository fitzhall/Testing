import { FormData, TotalScoreResult } from '../../types/scoring';
import { calculateBaseRevenueScore } from './revenue/baseRevenueScore';
import { calculateDiversityScore } from './revenue/diversityScore';
import { calculateStabilityScore } from './revenue/stabilityScore';
import { calculateEntityStructureScore } from './tax/entityStructureScore';
import { calculatePlanningScore } from './tax/planningScore';
import { calculateExpenseScore } from './tax/expenseScore';
import { calculateRevenueEfficiencyScore } from './growth/revenueEfficiencyScore';
import { calculateTeamScore } from './growth/teamScore';
import { calculateOperationalScore } from './growth/operationalScore';

export function calculateTotalScore(formData: FormData): TotalScoreResult {
  try {
    // Ensure required data exists
    if (!formData.revenueAmounts?.monthlyRevenue || !formData.businessAge || !formData.businessStructure) {
      throw new Error('Missing required form data');
    }

    // Revenue Performance (30 points)
    const baseRevenueScore = calculateBaseRevenueScore({ 
      monthlyRevenue: formData.revenueAmounts.monthlyRevenue 
    });
    const diversityScore = calculateDiversityScore(formData.revenueSources || {});
    const stabilityScore = calculateStabilityScore({ businessAge: formData.businessAge });
    const totalRevenueScore = baseRevenueScore + diversityScore + stabilityScore;

    // Tax Efficiency (40 points)
    const entityScore = calculateEntityStructureScore({
      businessStructure: formData.businessStructure,
      monthlyRevenue: formData.revenueAmounts.monthlyRevenue
    });
    const planningScore = calculatePlanningScore({
      expenseCategories: formData.expenseCategories || [],
      businessAge: formData.businessAge,
      monthlyRevenue: formData.revenueAmounts.monthlyRevenue,
      taxPlanning: formData.taxPlanning
    });
    const expenseScore = calculateExpenseScore({
      expenseCategories: formData.expenseCategories || [],
      monthlyExpenses: formData.monthlyExpenses || '0-1000'
    });
    const totalTaxScore = entityScore + planningScore + expenseScore;

    // Growth Potential (30 points)
    const efficiencyScore = calculateRevenueEfficiencyScore({
      monthlyRevenue: formData.revenueAmounts.monthlyRevenue,
      businessAge: formData.businessAge
    });
    const teamScore = calculateTeamScore({ 
      employees: formData.employees || '1' 
    });
    const operationalScore = calculateOperationalScore({
      monthlyRevenue: formData.revenueAmounts.monthlyRevenue,
      monthlyExpenses: formData.monthlyExpenses || '0-1000'
    });
    const totalGrowthScore = efficiencyScore + teamScore + operationalScore;

    // Calculate total score
    const totalScore = totalRevenueScore + totalTaxScore + totalGrowthScore;
    const maxScore = 100;

    return {
      totalScore,
      maxScore,
      revenueScore: {
        score: totalRevenueScore,
        maxScore: 30,
        details: [
          `Base Revenue: ${baseRevenueScore}/15`,
          `Revenue Diversity: ${diversityScore}/10`,
          `Business Stability: ${stabilityScore}/5`
        ]
      },
      taxScore: {
        score: totalTaxScore,
        maxScore: 40,
        details: [
          `Entity Structure: ${entityScore}/15`,
          `Tax Planning: ${planningScore}/15`,
          `Expense Optimization: ${expenseScore}/10`
        ]
      },
      growthScore: {
        score: totalGrowthScore,
        maxScore: 30,
        details: [
          `Revenue Efficiency: ${efficiencyScore}/10`,
          `Team Structure: ${teamScore}/10`,
          `Operational Efficiency: ${operationalScore}/10`
        ]
      },
      recommendations: generateRecommendations(formData, totalScore),
      formData
    };
  } catch (error) {
    console.error('Error calculating total score:', error);
    throw error;
  }
}

function generateRecommendations(formData: FormData, totalScore: number): string[] {
  const recommendations: string[] = [];

  if (formData.expenseCategories?.length < 3) {
    recommendations.push('Implement more detailed expense tracking');
  }

  if (Object.values(formData.revenueSources || {}).filter(Boolean).length < 2) {
    recommendations.push('Consider diversifying revenue streams');
  }

  if (formData.businessStructure === 'sole-proprietorship' && 
      formData.revenueAmounts?.monthlyRevenue > 10000) {
    recommendations.push('Evaluate benefits of forming an LLC or Corporation');
  }

  return recommendations;
}