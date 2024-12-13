import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../constants.ts';
import type { OpenAIResponse } from '../types.ts';
import { PromptService } from './promptService.ts';

export class OpenAIService {
  private client;
  private promptService;

  constructor() {
    this.client = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    this.promptService = new PromptService();
  }

  async generateAnalysis(scoreData: Record<string, any>): Promise<OpenAIResponse> {
    try {
      // Get the active prompt template
      const promptTemplate = await this.promptService.getActivePrompt();
      
      // Generate the prompts with interpolated data
      const systemPrompt = promptTemplate.system_prompt;
      const userPrompt = promptTemplate.user_prompt_template.replace(
        '{{scoreData}}',
        JSON.stringify(scoreData, null, 2)
      );

      // Log prompts for debugging
      console.log('System prompt:', systemPrompt);
      console.log('User prompt:', userPrompt);

      // Generate completion
      const completion = await this.client.chat.completions.create({
        ...OPENAI_CONFIG,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content generated from OpenAI');
      }

      return { content };
    } catch (error) {
      console.error('Error generating analysis:', error);
      throw error;
    }
  }
}