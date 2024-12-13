import { FormData, ScoreResult } from '../../types/scoring';
import { RevenueSources } from '../../types/revenue';

/**
 * Calculates score based on platform diversity and revenue mix
 */
export function calculatePlatformScore(revenueSources: RevenueSources): number {
  const activeSourcesCount = Object.values(revenueSources).filter(Boolean).length;
  
  // Base score for number of platforms (max 10 points)
  let score = 0;
  if (activeSourcesCount >= 4) score = 10;
  else if (activeSourcesCount >= 2) score = 7;
  else if (activeSourcesCount === 1) score = 4;

  // Bonus points for strategic platform combinations (max 5 bonus points)
  if (revenueSources.coursesSales && revenueSources.membershipSites) score += 2;
  if (revenueSources.sponsorships && (revenueSources.youtube || revenueSources.instagram)) score += 2;
  if (revenueSources.digitalProducts && revenueSources.coaching) score += 1;

  return Math.min(score, 10); // Cap at 10 points
}

/**
 * Calculates score based on monthly revenue with realistic tiers
 */
export function calculateRevenueAmountScore(monthlyRevenue: number): number {
  // More granular scoring for realistic creator revenue levels
  if (monthlyRevenue >= 50000) return 10;
  if (monthlyRevenue >= 20000) return 8;
  if (monthlyRevenue >= 10000) return 6;
  if (monthlyRevenue >= 5000) return 4;
  if (monthlyRevenue >= 1000) return 2;
  return 1;
}

/**
 * Calculates score based on business structure optimization
 */
export function calculateStructureScore(businessStructure: string, monthlyRevenue: number): number {
  const baseScores: { [key: string]: number } = {
    'sole-proprietorship': 3,
    'partnership': 5,
    'llc': 7,
    's-corporation': 10,
    'corporation': 8
  };

  let score = baseScores[businessStructure] || 0;

  // Adjust score based on revenue level and structure fit
  if (monthlyRevenue > 10000 && businessStructure === 'sole-proprietorship') {
    score = Math.max(score - 2, 0); // Penalty for high revenue with basic structure
  }

  if (monthlyRevenue > 20000 && businessStructure === 's-corporation') {
    score += 2; // Bonus for optimal structure at scale
  }

  return Math.min(score, 10); // Cap at 10 points
}

/**
 * Calculates overall revenue score with detailed breakdown
 */
export function calculateRevenueScore(formData: FormData): ScoreResult {
  const platformScore = calculatePlatformScore(formData.revenueSources);
  const revenueScore = calculateRevenueAmountScore(formData.revenueAmounts.monthlyRevenue);
  const structureScore = calculateStructureScore(formData.businessStructure, formData.revenueAmounts.monthlyRevenue);

  const details: string[] = [
    `Platform Strategy: ${platformScore}/10 points`,
    `Revenue Scale: ${revenueScore}/10 points`,
    `Business Structure: ${structureScore}/10 points`
  ];

  const totalScore = platformScore + revenueScore + structureScore;

  return {
    score: totalScore,
    maxScore: 30,
    details,
    interpretation: getScoreInterpretation(totalScore)
  };
}

/**
 * Provides contextual interpretation of the revenue score
 */
function getScoreInterpretation(score: number): string {
  if (score >= 25) return "Elite Creator Business";
  if (score >= 20) return "Professional Creator";
  if (score >= 15) return "Growing Creator";
  if (score >= 10) return "Emerging Creator";
  return "Early Stage Creator";
}