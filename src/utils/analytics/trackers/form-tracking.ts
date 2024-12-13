import { trackEvent } from '../core/track';
import { ANALYTICS_EVENTS } from '../events';
import { FormStepData } from '../types';

export function trackFormStep(stepNumber: number, stepName: string): void {
  const data: FormStepData = {
    step_number: stepNumber,
    step_name: stepName,
    completed: true,
    timestamp: new Date().toISOString()
  };
  
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.STEP_COMPLETED, 
    properties: data 
  });
}

export function trackFormComplete(score: number): void {
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.COMPLETED, 
    properties: { 
      final_score: score,
      completion_time: new Date().toISOString()
    } 
  });
}

export function trackDetailedAnalysisRequest(email: string): void {
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.DETAILED_ANALYSIS_REQUESTED, 
    properties: { 
      has_email: Boolean(email),
      request_time: new Date().toISOString()
    } 
  });
}