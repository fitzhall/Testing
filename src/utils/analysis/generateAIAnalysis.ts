import { TotalScoreResult } from '../../types/scoring';
import { supabase } from '../supabase/client';
import { trackEvent } from '../analytics/core/track';
import { trackError } from '../analytics/core/error-tracking';
import { ANALYTICS_EVENTS } from '../analytics/events';
import toast from 'react-hot-toast';

export async function generateAndSendAnalysis({ 
  email, 
  scoreResult 
}: { 
  email: string; 
  scoreResult: TotalScoreResult; 
}) {
  try {
    // First, check if we already have a pending request
    const { data: existingRequest } = await supabase
      .from('analysis_requests')
      .select('*')
      .eq('email', email)
      .eq('status', 'pending')
      .single();

    if (existingRequest) {
      throw new Error('Analysis already in progress');
    }

    // Create analysis request
    const { data, error } = await supabase
      .from('analysis_requests')
      .insert({
        email,
        score_data: scoreResult,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Track successful request
    trackEvent({
      name: ANALYTICS_EVENTS.ANALYSIS.REQUESTED,
      properties: {
        email_provided: Boolean(email),
        score: scoreResult.totalScore
      }
    });

    toast.success('Analysis request submitted successfully!');

    return { 
      success: true, 
      data: data 
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    trackError(error, 'generateAndSendAnalysis');
    trackEvent({
      name: ANALYTICS_EVENTS.ANALYSIS.FAILED,
      properties: {
        error: errorMessage
      }
    });

    toast.error(errorMessage);
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}