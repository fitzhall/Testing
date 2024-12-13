import { z } from 'zod';

const stabilityInputSchema = z.object({
  businessAge: z.enum(['0-1', '1-3', '3-5', '5+'])
});

type StabilityInput = z.infer<typeof stabilityInputSchema>;

/**
 * Calculates revenue stability score based on business age
 * @param input Object containing business age
 * @returns Score between 0-5 points
 */
export function calculateStabilityScore(input: StabilityInput): number {
  try {
    const { businessAge } = stabilityInputSchema.parse(input);
    
    switch (businessAge) {
      case '5+': return 5;
      case '3-5': return 4;
      case '1-3': return 2;
      case '0-1': return 1;
      default: return 0;
    }
  } catch (error) {
    console.error('Error calculating stability score:', error);
    return 0;
  }
}