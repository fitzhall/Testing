import { z } from 'zod';

const entityInputSchema = z.object({
  businessStructure: z.enum(['sole-proprietorship', 'llc', 's-corporation', 'corporation', 'partnership']),
  monthlyRevenue: z.number().min(0)
});

type EntityInput = z.infer<typeof entityInputSchema>;

/**
 * Calculates score based on business structure and revenue
 * @param input Object containing business structure and monthly revenue
 * @returns Score between 0-15 points
 */
export function calculateEntityStructureScore(input: EntityInput): number {
  try {
    const { businessStructure, monthlyRevenue } = entityInputSchema.parse(input);
    
    let baseScore = {
      'sole-proprietorship': 3,
      'llc': 6,
      'partnership': 9,
      's-corporation': 12,
      'corporation': 9
    }[businessStructure];

    // Optimization bonus for high-revenue businesses
    if (monthlyRevenue > 20000 && businessStructure === 's-corporation') {
      baseScore += 3;
    }

    return Math.min(baseScore, 15);
  } catch (error) {
    console.error('Error calculating entity structure score:', error);
    return 0;
  }
}