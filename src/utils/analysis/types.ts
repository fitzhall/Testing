export interface AnalysisRequest {
  id: string;
  email: string;
  score_data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requested_at: string;
  completed_at?: string;
}

export interface AnalysisPrompt {
  id: string;
  request_id: string;
  prompt: string;
  analysis?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}