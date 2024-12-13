import { FormData } from '../../../types/scoring';
import { PriorityImprovement } from '../../../types/priority';

interface ImpactMetrics {
  annualSavings: number;
  riskLevel: 'low' | 'medium' | 'high';
  implementationDifficulty: number;
}

export function calculateImpactMetrics(
  data: FormData,
  improvements: PriorityImprovement[],
  score: number
): ImpactMetrics {
  const monthlyRevenue = data.revenueAmounts.monthlyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  // Calculate potential annual savings
  const savingsFactors = {
    critical: 0.15,
    high: 0.10,
    moderate: 0.05
  };

  const annualSavings = improvements.reduce((total, improvement) => {
    return total + (annualRevenue * savingsFactors[improvement.level]);
  }, 0);

  // Determine risk level
  const riskLevel = score < 40 ? 'high' :
                   score < 70 ? 'medium' : 'low';

  // Calculate implementation difficulty (1-5)
  const difficultyFactors = {
    structure: 4,
    tax: 3,
    operations: 2
  };

  const implementationDifficulty = Math.min(5,
    Math.round(improvements.reduce((sum, imp) => 
      sum + difficultyFactors[imp.category], 0) / improvements.length)
  );

  return {
    annualSavings,
    riskLevel,
    implementationDifficulty
  };
}