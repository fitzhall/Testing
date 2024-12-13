export type PriorityLevel = 'critical' | 'high' | 'moderate';
export type ImprovementCategory = 'structure' | 'tax' | 'operations';

export interface PriorityImprovement {
  category: ImprovementCategory;
  level: PriorityLevel;
  title: string;
  description: string;
  impact: string;
  action: string;
}

export interface SavingsProjection {
  annual: number;
  breakdown: {
    baseTax: number;
    structure: number;
    risk: number;
  };
}