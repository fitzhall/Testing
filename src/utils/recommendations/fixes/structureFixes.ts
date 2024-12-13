import { FormData } from '../../../types/scoring';
import { PriorityFix, BusinessAssessment } from '../types';
import { nanoid } from 'nanoid';

export function generateStructureFixes(formData: FormData, assessment: BusinessAssessment): PriorityFix[] {
  const fixes: PriorityFix[] = [];
  const monthlyRevenue = formData.revenueAmounts.monthlyRevenue;
  const hasDigitalProducts = formData.revenueSources.digitalProducts;
  const hasMultiplePlatforms = Object.values(formData.revenueSources).filter(Boolean).length > 1;
  const hasCourses = formData.revenueSources.coursesSales;
  const hasSponsorship = formData.revenueSources.sponsorships;

  // Basic Entity Protection
  if (monthlyRevenue > 10000 && formData.businessStructure === 'sole-proprietorship') {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'structure',
      title: 'Creator LLC Protection Needed',
      description: 'Operating a creator business at scale without liability protection',
      impact: `Protect personal assets and save $${Math.round(monthlyRevenue * 0.15).toLocaleString()}+ annually`,
      estimatedSavings: monthlyRevenue * 0.15
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
      impact: 'Protect intellectual property and optimize licensing revenue',
      estimatedSavings: monthlyRevenue * 0.2
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
      impact: 'Enhanced tax efficiency and brand deal structuring',
      estimatedSavings: monthlyRevenue * 0.18
    });
  }

  // S-Corp Election
  if (monthlyRevenue > 40000 && formData.businessStructure === 'llc') {
    fixes.push({
      id: nanoid(),
      level: 'critical',
      category: 'structure',
      title: 'S-Corp Tax Savings Available',
      description: 'Current revenue qualifies for significant tax advantages',
      impact: `Save $${Math.round(monthlyRevenue * 0.15).toLocaleString()}+ in self-employment tax`,
      estimatedSavings: monthlyRevenue * 0.15
    });
  }

  return fixes;
}