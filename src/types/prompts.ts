export interface PromptTemplate {
  id: string;
  name: string;
  version: string;
  system_prompt: string;
  user_prompt_template: string;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PromptService {
  getTemplates(): Promise<PromptTemplate[]>;
  getActiveTemplate(): Promise<PromptTemplate>;
  createTemplate(template: Partial<PromptTemplate>): Promise<PromptTemplate>;
  updateTemplate(id: string, updates: Partial<PromptTemplate>): Promise<PromptTemplate>;
  setActiveTemplate(id: string): Promise<void>;
}