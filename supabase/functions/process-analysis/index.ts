import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { DatabaseService } from './services/database.ts';
import { OpenAIService } from './services/openai.ts';
import { createResponse, createErrorResponse, createOptionsResponse } from './utils/responseHandler.ts';
import type { AnalysisRequest } from './types.ts';

const db = new DatabaseService();
const openai = new OpenAIService();

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return createOptionsResponse();
  }

  try {
    const { email, scoreData } = (await req.json()) as AnalysisRequest;

    if (!email || !scoreData) {
      throw new Error('Missing required fields: email or scoreData');
    }

    await db.markAsProcessing(email);

    const { content: analysis } = await openai.generateAnalysis(scoreData);
    await db.markAsCompleted(email, analysis);

    return createResponse({
      status: 'completed',
      analysis,
    });

  } catch (error) {
    console.error('Error processing analysis:', error);

    try {
      await db.markAsError(error.email, error.message);
    } catch (dbError) {
      console.error('Error updating database with error status:', dbError);
    }

    return createErrorResponse(error);
  }
});