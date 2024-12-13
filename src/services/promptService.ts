import { supabase } from '../utils/supabase/client';
import type { PromptTemplate, PromptService } from '../types/prompts';

export class SupabasePromptService implements PromptService {
  async getTemplates(): Promise<PromptTemplate[]> {
    const { data, error } = await supabase
      .from('prompt_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getActiveTemplate(): Promise<PromptTemplate> {
    const { data, error } = await supabase
      .from('prompt_templates')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  async createTemplate(template: Partial<PromptTemplate>): Promise<PromptTemplate> {
    const { data, error } = await supabase
      .from('prompt_templates')
      .insert([template])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateTemplate(id: string, updates: Partial<PromptTemplate>): Promise<PromptTemplate> {
    const { data, error } = await supabase
      .from('prompt_templates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async setActiveTemplate(id: string): Promise<void> {
    const { error } = await supabase.rpc('set_active_prompt_template', {
      template_id: id
    });

    if (error) throw error;
  }
}

export const promptService = new SupabasePromptService();