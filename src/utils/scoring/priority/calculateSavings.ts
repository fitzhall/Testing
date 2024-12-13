import { FormData } from '../../../types/scoring';

interface SavingsBreakdown {
  baseTaxSavings: number;
  structureOptimization: number;
  riskMitigation: number;
  total: number;
}

const TAX_RATES = {
  'none': 0.25,
  'annual': 0.20,
  'quarterly': 0.15,
  'monthly': 0.12,
  'professional': 0.10
};

const STRUCTURE_SAVINGS = {
  'sole-proprietorship': 0.15,
  'llc': 0.10,
  's-corporation': 0.05,
  'corporation': 0.08,
  'partnership': 0.12
};

export function calculatePotentialSavings(formData: FormData, score: number): SavingsBreakdown {
  const monthlyRevenue = formData.revenueAmounts.monthlyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  // Calculate base tax savings based on current tax planning
  const currentTaxRate = TAX_RATES[formData.taxPlanning as keyof typeof TAX_RATES] || TAX_RATES.none;
  const baseTaxSavings = annualRevenue * currentTaxRate;

  // Calculate structure optimization savings
  const structureSavings = STRUCTURE_SAVINGS[formData.businessStructure as keyof typeof STRUCTURE_SAVINGS] || 0.15;
  const structureOptimization = annualRevenue * structureSavings;

  // Calculate risk mitigation savings based on score
  const riskFactor = score < 40 ? 0.10 : score < 70 ? 0.05 : 0.02;
  const riskMitigation = annualRevenue * riskFactor;

  // Calculate total potential savings
  const total = baseTaxSavings + structureOptimization + riskMitigation;

  return {
    baseTaxSavings,
    structureOptimization,
    riskMitigation,
    total: Math.round(total) // Round to nearest dollar
  };
}