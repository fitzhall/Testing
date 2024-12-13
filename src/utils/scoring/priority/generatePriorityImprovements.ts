import { FormData } from '../../../types/scoring';
import { PriorityImprovement } from '../../../types/priority';
import { nanoid } from 'nanoid';

function generateStructureImprovement(data: FormData): PriorityImprovement | null {
  const monthlyRevenue = data.revenueAmounts.monthlyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  if (data.businessStructure === 'sole-proprietorship' && monthlyRevenue > 10000) {
    return {
      id: nanoid(),
      category: 'structure',
      level: 'critical',
      title: 'Business Structure Optimization',
      description: `Operating at ${monthlyRevenue.toLocaleString()}/month without liability protection`,
      impact: `Save up to $${Math.round(annualRevenue * 0.15).toLocaleString()} annually`,
      action: 'Form LLC or Corporation'
    };
  }

  if (data.businessStructure === 'llc' && monthlyRevenue > 20000) {
    return {
      id: nanoid(),
      category: 'structure',
      level: 'high',
      title: 'S-Corporation Election',
      description: 'Revenue level qualifies for S-Corp tax benefits',
      impact: `Save up to $${Math.round(annualRevenue * 0.1).toLocaleString()} in self-employment tax`,
      action: 'Evaluate S-Corporation election'
    };
  }

  return null;
}

function generateTaxImprovement(data: FormData): PriorityImprovement | null {
  const monthlyRevenue = data.revenueAmounts.monthlyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  if (!data.taxPlanning || data.taxPlanning === 'none') {
    return {
      id: nanoid(),
      category: 'tax',
      level: 'critical',
      title: 'Tax Planning Strategy',
      description: 'No formal tax planning system in place',
      impact: `Save up to $${Math.round(annualRevenue * 0.2).toLocaleString()} in tax liability`,
      action: 'Implement quarterly tax planning'
    };
  }

  if (data.taxPlanning === 'annual' && monthlyRevenue > 10000) {
    return {
      id: nanoid(),
      category: 'tax',
      level: 'high',
      title: 'Enhanced Tax Planning',
      description: 'Current revenue requires more frequent planning',
      impact: `Optimize $${Math.round(annualRevenue * 0.15).toLocaleString()} in tax strategy`,
      action: 'Upgrade to quarterly tax planning'
    };
  }

  return null;
}

function generateOperationsImprovement(data: FormData): PriorityImprovement | null {
  const monthlyRevenue = data.revenueAmounts.monthlyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  if (data.expenseCategories.length < 3) {
    return {
      id: nanoid(),
      category: 'operations',
      level: 'high',
      title: 'Expense Tracking Enhancement',
      description: `Only tracking ${data.expenseCategories.length} expense categories`,
      impact: `Capture $${Math.round(annualRevenue * 0.1).toLocaleString()} in missed deductions`,
      action: 'Implement comprehensive expense tracking'
    };
  }

  const platformCount = Object.values(data.revenueSources).filter(Boolean).length;
  if (platformCount === 1 && monthlyRevenue > 5000) {
    return {
      id: nanoid(),
      category: 'operations',
      level: 'high',
      title: 'Revenue Diversification',
      description: 'Single revenue source creates business risk',
      impact: `Protect and grow $${Math.round(annualRevenue).toLocaleString()} revenue`,
      action: 'Diversify revenue streams'
    };
  }

  return null;
}

export function generatePriorityImprovements(data: FormData, score: number): PriorityImprovement[] {
  const improvements: PriorityImprovement[] = [];

  // Generate improvements based on user data
  const structureImprovement = generateStructureImprovement(data);
  const taxImprovement = generateTaxImprovement(data);
  const operationsImprovement = generateOperationsImprovement(data);

  // Add valid improvements
  if (structureImprovement) improvements.push(structureImprovement);
  if (taxImprovement) improvements.push(taxImprovement);
  if (operationsImprovement) improvements.push(operationsImprovement);

  // Sort by priority level
  const priorityOrder = { critical: 0, high: 1, moderate: 2 };
  improvements.sort((a, b) => priorityOrder[a.level] - priorityOrder[b.level]);

  return improvements.slice(0, 3);
}