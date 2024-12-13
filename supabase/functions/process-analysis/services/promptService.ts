import { createClient } from '@supabase/supabase-js';

export class PromptService {
  private client;

  constructor() {
    this.client = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
  }

  async getActivePrompt() {
    const { data, error } = await this.client
      .from('prompt_templates')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching active prompt:', error);
      throw error;
    }
    
    if (!data) {
      throw new Error('No active prompt template found');
    }

    return data;
  }
}