import { supabase } from '../supabase/client';

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

export async function getPromptTemplates() {
  const { data, error } = await supabase
    .from('prompt_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getActivePromptTemplate() {
  const { data, error } = await supabase
    .from('prompt_templates')
    .select('*')
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
}

export async function createPromptTemplate(template: Partial<PromptTemplate>) {
  const { data, error } = await supabase
    .from('prompt_templates')
    .insert([template])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePromptTemplate(id: string, updates: Partial<PromptTemplate>) {
  const { data, error } = await supabase
    .from('prompt_templates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function setActivePromptTemplate(id: string) {
  // Start a transaction to update active status
  const { error } = await supabase.rpc('set_active_prompt_template', {
    template_id: id
  });

  if (error) throw error;
}