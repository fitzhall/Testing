import { FormData } from '../../../types/scoring';
import { PriorityFix, BusinessAssessment } from '../types';
import { nanoid } from 'nanoid';

export function generateRevenueFixes(formData: FormData, assessment: BusinessAssessment): PriorityFix[] {
  const fixes: PriorityFix[] = [];
  const monthlyRevenue = formData.revenueAmounts.monthlyRevenue;
  const activeSourcesCount = Object.values(formData.revenueSources).filter(Boolean).length;

  // Platform Diversification
  if (activeSourcesCount === 1 && monthlyRevenue > 5000) {
    fixes.push({
      id: nanoid(),
      level: 'high',
      category: 'revenue',
      title: 'Single Platform Risk',
      description: 'Revenue concentrated on a single platform',
      impact: 'Diversification can protect and grow revenue by 40%',
      estimatedSavings: monthlyRevenue * 0.4
    });
  }

  // Revenue Tracking
  if (!assessment.separateBankAccount && monthlyRevenue > 5000) {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'revenue',
      title: 'Creator Banking Setup',
      description: 'Business and personal finances need separation',
      impact: `Protect ${Math.round(monthlyRevenue * 0.3).toLocaleString()}+ in tax deductions`,
      estimatedSavings: monthlyRevenue * 0.3
    });
  }

  return fixes;
}