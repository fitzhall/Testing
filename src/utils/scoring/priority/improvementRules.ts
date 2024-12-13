import { FormData } from '../../../types/scoring';
import { PriorityImprovement } from '../../../types/priority';
import { nanoid } from 'nanoid';

interface ImprovementRule {
  condition: (data: FormData, score: number) => boolean;
  generate: (data: FormData) => PriorityImprovement;
}

// Critical Tier Rules (Score < 40)
const criticalRules: ImprovementRule[] = [
  {
    condition: (data, score) => score < 40 && data.businessStructure === 'sole-proprietorship' && data.revenueAmounts.monthlyRevenue > 10000,
    generate: (data) => ({
      id: nanoid(),
      category: 'structure',
      level: 'critical',
      title: 'Urgent: Business Structure Protection',
      description: 'High revenue without liability protection poses significant risk',
      impact: `Protect ${Math.round(data.revenueAmounts.monthlyRevenue * 12).toLocaleString()} in annual revenue`,
      action: 'Form LLC or Corporation immediately'
    })
  },
  {
    condition: (data, score) => score < 40 && (!data.taxPlanning || data.taxPlanning === 'none'),
    generate: (data) => ({
      id: nanoid(),
      category: 'tax',
      level: 'critical',
      title: 'Critical: Tax Planning Required',
      description: 'No tax planning system in place',
      impact: `Save up to ${Math.round(data.revenueAmounts.monthlyRevenue * 0.2 * 12).toLocaleString()} annually`,
      action: 'Implement basic tax planning'
    })
  }
];

// High Priority Rules (Score 40-70)
const highPriorityRules: ImprovementRule[] = [
  {
    condition: (data, score) => score >= 40 && score < 70 && data.expenseCategories.length < 3,
    generate: (data) => ({
      id: nanoid(),
      category: 'operations',
      level: 'high',
      title: 'Expense Tracking Upgrade',
      description: 'Limited expense categorization reducing tax benefits',
      impact: `Capture ${Math.round(data.revenueAmounts.monthlyRevenue * 0.1 * 12).toLocaleString()} in deductions`,
      action: 'Implement comprehensive expense tracking'
    })
  },
  {
    condition: (data, score) => score >= 40 && score < 70 && data.taxPlanning === 'annual',
    generate: (data) => ({
      id: nanoid(),
      category: 'tax',
      level: 'high',
      title: 'Tax Planning Enhancement',
      description: 'Annual planning insufficient for current revenue',
      impact: `Optimize ${Math.round(data.revenueAmounts.monthlyRevenue * 0.15 * 12).toLocaleString()} tax planning`,
      action: 'Upgrade to quarterly tax planning'
    })
  }
];

// Moderate Tier Rules (Score > 70)
const moderateRules: ImprovementRule[] = [
  {
    condition: (data, score) => score >= 70 && data.businessStructure !== 's-corporation' && data.revenueAmounts.monthlyRevenue > 20000,
    generate: (data) => ({
      id: nanoid(),
      category: 'structure',
      level: 'moderate',
      title: 'S-Corp Evaluation',
      description: 'Revenue level suggests S-Corp benefits',
      impact: `Potential ${Math.round(data.revenueAmounts.monthlyRevenue * 0.1 * 12).toLocaleString()} tax savings`,
      action: 'Evaluate S-Corporation election'
    })
  },
  {
    condition: (data, score) => score >= 70 && data.taxPlanning !== 'professional',
    generate: (data) => ({
      id: nanoid(),
      category: 'tax',
      level: 'moderate',
      title: 'Professional Tax Strategy',
      description: 'Complex revenue structure needs expert guidance',
      impact: 'Optimize tax strategy and planning',
      action: 'Engage professional tax advisor'
    })
  }
];

export function generatePriorityImprovements(data: FormData, score: number): PriorityImprovement[] {
  const improvements: PriorityImprovement[] = [];

  // Apply rules based on score tier
  const rules = score < 40 ? criticalRules :
               score < 70 ? highPriorityRules :
               moderateRules;

  // Generate improvements from matching rules
  rules.forEach(rule => {
    if (rule.condition(data, score)) {
      improvements.push(rule.generate(data));
    }
  });

  // Sort by impact (estimated savings) and limit to top 3
  return improvements
    .sort((a, b) => {
      const getNumericImpact = (impact: string) => {
        const match = impact.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      return getNumericImpact(b.impact) - getNumericImpact(a.impact);
    })
    .slice(0, 3);
}