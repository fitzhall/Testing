import { FormData } from '../../types/scoring';
import { PriorityFix, BusinessAssessment } from '../../types/recommendations';
import { nanoid } from 'nanoid';

export function generatePriorityFixes(formData: FormData, assessment: BusinessAssessment): PriorityFix[] {
  const fixes: PriorityFix[] = [];
  const monthlyRevenue = formData.revenueAmounts.monthlyRevenue;
  const hasDigitalProducts = formData.revenueSources.digitalProducts;
  const hasMultiplePlatforms = Object.values(formData.revenueSources).filter(Boolean).length > 1;
  const hasCourses = formData.revenueSources.coursesSales;
  const hasSponsorship = formData.revenueSources.sponsorships;

  // Entity Structure Recommendations
  if (monthlyRevenue > 10000 && formData.businessStructure === 'sole-proprietorship') {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'structure',
      title: 'Creator LLC Protection Needed',
      description: 'Operating at scale without liability protection',
      impact: `Protect personal assets and save $${Math.round(monthlyRevenue * 0.15).toLocaleString()}+ annually`
    });
  }

  // IP Holding Company
  if ((hasDigitalProducts || hasCourses) && monthlyRevenue > 20000) {
    fixes.push({
      id: nanoid(),
      level: 'high',
      category: 'structure',
      title: 'IP Holding Company Opportunity',
      description: 'Digital products and courses need IP protection structure',
      impact: 'Protect intellectual property and optimize licensing revenue'
    });
  }

  // Management Company
  if (hasMultiplePlatforms && hasSponsorship && monthlyRevenue > 30000) {
    fixes.push({
      id: nanoid(),
      level: 'high',
      category: 'structure',
      title: 'Creator Management Company',
      description: 'Multi-platform and sponsorship revenue needs optimization',
      impact: 'Enhanced tax efficiency and brand deal structuring'
    });
  }

  // S-Corp Election
  if (monthlyRevenue > 40000 && formData.businessStructure !== 's-corporation') {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'structure',
      title: 'S-Corp Tax Savings Available',
      description: 'Current revenue qualifies for significant tax advantages',
      impact: `Save $${Math.round(monthlyRevenue * 0.15).toLocaleString()}+ in self-employment tax`
    });
  }

  // Tax Planning
  if (!assessment.quarterlyTaxes && monthlyRevenue > 3000) {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'tax',
      title: 'Creator Tax Planning',
      description: 'Missing quarterly tax strategy for creator income',
      impact: `Avoid penalties up to $${Math.round(monthlyRevenue * 12 * 0.25 * 0.1).toLocaleString()}`
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
      impact: `Protect ${Math.round(monthlyRevenue * 0.3).toLocaleString()}+ in tax deductions`
    });
  }

  // Sort by priority and return top 3
  return fixes
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.level] - priorityOrder[b.level];
    })
    .slice(0, 3);
}