import { z } from 'zod';

const expenseInputSchema = z.object({
  expenseCategories: z.array(z.string()),
  monthlyExpenses: z.string()
});

type ExpenseInput = z.infer<typeof expenseInputSchema>;

/**
 * Calculates expense optimization score
 * @param input Object containing expense tracking information
 * @returns Score between 0-10 points
 */
export function calculateExpenseScore(input: ExpenseInput): number {
  try {
    const { expenseCategories } = expenseInputSchema.parse(input);
    
    if (expenseCategories.length >= 6) return 10;
    if (expenseCategories.length >= 3) return 6;
    if (expenseCategories.length >= 1) return 3;
    return 0;
  } catch (error) {
    console.error('Error calculating expense score:', error);
    return 0;
  }
}