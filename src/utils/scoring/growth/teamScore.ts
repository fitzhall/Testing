import { z } from 'zod';

const teamInputSchema = z.object({
  employees: z.enum(['1', '2-5', '6-10', '11+'])
});

type TeamInput = z.infer<typeof teamInputSchema>;

/**
 * Calculates team structure score
 * @param input Object containing team size information
 * @returns Score between 0-10 points
 */
export function calculateTeamScore(input: TeamInput): number {
  try {
    const { employees } = teamInputSchema.parse(input);
    
    switch (employees) {
      case '11+': return 10;
      case '6-10': return 8;
      case '2-5': return 6;
      case '1': return 3;
      default: return 0;
    }
  } catch (error) {
    console.error('Error calculating team score:', error);
    return 0;
  }
}