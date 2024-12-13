import { z } from 'zod';

const operationalInputSchema = z.object({
  monthlyRevenue: z.number().min(0),
  monthlyExpenses: z.string()
});

type OperationalInput = z.infer<typeof operationalInputSchema>;

/**
 * Calculates operational efficiency score
 * @param input Object containing revenue and expense information
 * @returns Score between 0-10 points
 */
export function calculateOperationalScore(input: OperationalInput): number {
  try {
    const { monthlyRevenue, monthlyExpenses } = operationalInputSchema.parse(input);
    
    // Extract expense range
    const [minExpense] = monthlyExpenses.split('-').map(Number);
    const expenseRatio = minExpense / monthlyRevenue;

    if (expenseRatio < 0.5) return 10;
    if (expenseRatio < 0.7) return 6;
    return 3;
  } catch (error) {
    console.error('Error calculating operational score:', error);
    return 0;
  }
}