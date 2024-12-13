import { z } from 'zod';

const planningInputSchema = z.object({
  expenseCategories: z.array(z.string()),
  businessAge: z.enum(['0-1', '1-3', '3-5', '5+']),
  monthlyRevenue: z.number().min(0),
  taxPlanning: z.enum(['none', 'annual', 'quarterly', 'monthly', 'professional', '']).optional()
});

type PlanningInput = z.infer<typeof planningInputSchema>;

/**
 * Calculates tax planning sophistication score
 * @param input Object containing planning indicators
 * @returns Score between 0-15 points
 */
export function calculatePlanningScore(input: PlanningInput): number {
  try {
    const { expenseCategories, businessAge, monthlyRevenue, taxPlanning } = planningInputSchema.parse(input);
    
    let score = 0;

    // Tax planning approach score (0-6 points)
    switch (taxPlanning) {
      case 'professional':
        score += 6;
        break;
      case 'monthly':
        score += 5;
        break;
      case 'quarterly':
        score += 4;
        break;
      case 'annual':
        score += 2;
        break;
      default:
        score += 0;
    }

    // Expense tracking maturity (0-4 points)
    if (expenseCategories.length >= 5) score += 4;
    else if (expenseCategories.length >= 3) score += 2;
    else if (expenseCategories.length >= 1) score += 1;
    
    // Business maturity and complexity (0-5 points)
    if (businessAge === '5+' && monthlyRevenue > 20000) score += 5;
    else if (businessAge === '3-5' || monthlyRevenue > 10000) score += 3;
    else if (businessAge === '1-3') score += 1;

    return Math.min(score, 15);
  } catch (error) {
    console.error('Error calculating planning score:', error);
    return 0;
  }
}