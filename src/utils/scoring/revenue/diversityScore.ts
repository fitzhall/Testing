import { z } from 'zod';
import { RevenueSources } from '../../../types/revenue';

const PREMIUM_SOURCES = ['coursesSales', 'coaching', 'consulting'] as const;

/**
 * Calculates revenue diversity score based on active revenue sources
 * @param sources Revenue sources object
 * @returns Score between 0-10 points
 */
export function calculateDiversityScore(sources: RevenueSources): number {
  try {
    const activeSources = Object.entries(sources)
      .filter(([_, active]) => active)
      .map(([source]) => source);

    const premiumSourceCount = activeSources
      .filter(source => PREMIUM_SOURCES.includes(source as typeof PREMIUM_SOURCES[number]))
      .length;

    let baseScore = 0;
    if (activeSources.length >= 3) baseScore = 8;
    else if (activeSources.length === 2) baseScore = 5;
    else if (activeSources.length === 1) baseScore = 2;

    // Bonus points for premium sources
    const premiumBonus = Math.min(premiumSourceCount * 1, 2);

    return Math.min(baseScore + premiumBonus, 10);
  } catch (error) {
    console.error('Error calculating diversity score:', error);
    return 0;
  }
}