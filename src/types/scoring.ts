import { RevenueSources, RevenueAmounts } from './revenue';

export interface FormData {
  revenueSources: RevenueSources;
  revenueAmounts: RevenueAmounts;
  businessStructure: string;
  businessAge: string;
  employees: string;
  monthlyExpenses: string;
  expenseCategories: string[];
  taxPlanning: string; // Add new field
}

export interface ScoreResult {
  score: number;
  maxScore: number;
  details: string[];
}

export interface TotalScoreResult {
  totalScore: number;
  maxScore: number;
  revenueScore: ScoreResult;
  taxScore: ScoreResult;
  growthScore: ScoreResult;
  recommendations: string[];
  formData: FormData;
}