import { z } from 'zod';

const baseRevenueInputSchema = z.object({
  monthlyRevenue: z.number().min(0)
});

type BaseRevenueInput = z.infer<typeof baseRevenueInputSchema>;

/**
 * Calculates base revenue score based on monthly revenue
 * @param input Object containing monthly revenue
 * @returns Score between 0-15 points
 */
export function calculateBaseRevenueScore(input: BaseRevenueInput): number {
  try {
    const { monthlyRevenue } = baseRevenueInputSchema.parse(input);
    
    if (monthlyRevenue >= 100000) return 15;
    if (monthlyRevenue >= 50000) return 12;
    if (monthlyRevenue >= 20000) return 9;
    if (monthlyRevenue >= 10000) return 6;
    return 3;
  } catch (error) {
    console.error('Error calculating base revenue score:', error);
    return 0;
  }
}