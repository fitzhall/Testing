import { z } from 'zod';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';
export type BusinessCategory = 'structure' | 'revenue' | 'tax' | 'operations' | 'compliance';

export interface PriorityFix {
  id: string;
  level: PriorityLevel;
  category: BusinessCategory;
  title: string;
  description: string;
  impact: string;
  estimatedSavings?: number;
}

export const businessAssessmentSchema = z.object({
  hasInternationalIncome: z.boolean().default(false),
  hasTeamMembers: z.boolean().default(false),
  hasBrandDeals: z.boolean().default(false),
  hasDigitalProducts: z.boolean().default(false),
  separateBankAccount: z.boolean().default(false),
  accountingSystem: z.boolean().default(false),
  quarterlyTaxes: z.boolean().default(false),
  contractorProcesses: z.boolean().default(false),
  assetTracking: z.boolean().default(false),
  intellectualProperty: z.boolean().default(false)
});

export type BusinessAssessment = z.infer<typeof businessAssessmentSchema>;