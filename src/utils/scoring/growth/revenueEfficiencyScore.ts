import { z } from 'zod';

const efficiencyInputSchema = z.object({
  monthlyRevenue: z.number().min(0),
  businessAge: z.enum(['0-1', '1-3', '3-5', '5+'])
});

type EfficiencyInput = z.infer<typeof efficiencyInputSchema>;

const MARKET_RATES = {
  '0-1': 5000,
  '1-3': 10000,
  '3-5': 20000,
  '5+': 50000
};

/**
 * Calculates revenue efficiency score based on age and revenue
 * @param input Object containing monthly revenue and business age
 * @returns Score between 0-10 points
 */
export function calculateRevenueEfficiencyScore(input: EfficiencyInput): number {
  try {
    const { monthlyRevenue, businessAge } = efficiencyInputSchema.parse(input);
    
    const marketRate = MARKET_RATES[businessAge];
    const ratio = monthlyRevenue / marketRate;

    if (ratio >= 1.5) return 10;
    if (ratio >= 1.0) return 6;
    return 3;
  } catch (error) {
    console.error('Error calculating revenue efficiency score:', error);
    return 0;
  }
}