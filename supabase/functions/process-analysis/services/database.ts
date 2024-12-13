import { createClient } from '@supabase/supabase-js';

export class DatabaseService {
  private client;

  constructor() {
    this.client = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
  }

  async updateStatus(email: string, status: string, data?: Record<string, any>) {
    const { error } = await this.client
      .from('analysis_requests')
      .update({
        status,
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (error) throw error;
  }

  async markAsProcessing(email: string) {
    await this.updateStatus(email, 'processing');
  }

  async markAsCompleted(email: string, analysis: string) {
    await this.updateStatus(email, 'completed', { analysis_text: analysis });
  }

  async markAsError(email: string, errorMessage: string) {
    await this.updateStatus(email, 'error', { error_message: errorMessage });
  }
}