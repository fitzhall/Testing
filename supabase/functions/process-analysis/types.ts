import { z } from 'zod';

export interface AnalysisRequest {
  email: string;
  scoreData: {
    totalScore: number;
    maxScore: number;
    revenueScore: ScoreComponent;
    taxScore: ScoreComponent;
    growthScore: ScoreComponent;
    formData: FormData;
  };
}

interface ScoreComponent {
  score: number;
  maxScore: number;
  details: string[];
}

interface FormData {
  revenueAmounts: { monthlyRevenue: number };
  businessStructure: string;
  businessAge: string;
  employees: string;
}

export interface AnalysisResponse {
  status: 'processing' | 'completed' | 'error';
  analysis?: string;
  error?: string;
}

export interface OpenAIResponse {
  content: string;
}