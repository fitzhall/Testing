import { FormData } from '../../types/scoring';
import { RecommendationResult, BusinessRecommendation } from '../../types/recommendations';
import { analyzeRevenueStructure } from './revenueAnalyzer';
import { analyzeTaxEfficiency } from './taxAnalyzer';
import { analyzeGrowthPotential } from './growthAnalyzer';

function sortRecommendations(recommendations: BusinessRecommendation[]): BusinessRecommendation[] {
  return [...recommendations].sort((a, b) => {
    // Sort by priority first
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    // Then by impact
    if (a.impact !== b.impact) {
      return b.impact - a.impact;
    }
    // Finally by implementation difficulty (easier first)
    return a.implementationDifficulty - b.implementationDifficulty;
  });
}

function calculatePriorityScore(recommendations: BusinessRecommendation[]): number {
  return recommendations.reduce((score, rec) => {
    return score + (rec.priority * rec.impact) / rec.implementationDifficulty;
  }, 0);
}

function calculateEstimatedImpact(recommendations: BusinessRecommendation[]): number {
  return recommendations.reduce((total, rec) => total + rec.impact * 1000, 0);
}

export function generateRecommendations(formData: FormData): RecommendationResult {
  try {
    // Generate recommendations for each category
    const revenueRecs = analyzeRevenueStructure(formData);
    const taxRecs = analyzeTaxEfficiency(formData);
    const growthRecs = analyzeGrowthPotential(formData);

    const allRecommendations = [revenueRecs, taxRecs, growthRecs];
    const sortedRecommendations = sortRecommendations(allRecommendations);

    return {
      recommendations: sortedRecommendations,
      priorityScore: calculatePriorityScore(sortedRecommendations),
      estimatedImpact: calculateEstimatedImpact(sortedRecommendations)
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      recommendations: [],
      priorityScore: 0,
      estimatedImpact: 0
    };
  }
}