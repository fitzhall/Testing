import { FormData } from '../../../types/scoring';
import { PriorityFix, BusinessAssessment } from '../types';
import { nanoid } from 'nanoid';

export function generateTaxFixes(formData: FormData, assessment: BusinessAssessment): PriorityFix[] {
  const fixes: PriorityFix[] = [];
  const monthlyRevenue = formData.revenueAmounts.monthlyRevenue;

  // Quarterly Tax Planning
  if (!assessment.quarterlyTaxes && monthlyRevenue > 3000) {
    const estimatedTax = monthlyRevenue * 12 * 0.25;
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'tax',
      title: 'Creator Tax Planning',
      description: 'Missing quarterly tax strategy for creator income',
      impact: `Avoid penalties up to $${Math.round(estimatedTax * 0.1).toLocaleString()}`,
      estimatedSavings: estimatedTax * 0.1
    });
  }

  // Multi-Platform Tracking
  if (!assessment.accountingSystem && Object.values(formData.revenueSources).filter(Boolean).length > 2) {
    fixes.push({
      id: nanoid(),
      level: 'high',
      category: 'tax',
      title: 'Creator Income Tracking',
      description: 'Multiple revenue streams need consolidated tracking',
      impact: `Capture $${Math.round(monthlyRevenue * 0.2).toLocaleString()}+ in missed deductions`,
      estimatedSavings: monthlyRevenue * 0.2
    });
  }

  return fixes;
}