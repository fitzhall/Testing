import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';
import { FormStepData } from '../types';

export const trackFormStep = (stepNumber: number, stepName: string): void => {
  const data: FormStepData = {
    step_number: stepNumber,
    step_name: stepName,
    completed: true
  };
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.STEP_COMPLETED, 
    properties: data 
  });
};

export const trackFormComplete = (score: number): void => {
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.COMPLETED, 
    properties: { final_score: score } 
  });
};

export const trackDetailedAnalysisRequest = (email: string): void => {
  trackEvent({ 
    name: ANALYTICS_EVENTS.FORM.DETAILED_ANALYSIS_REQUESTED, 
    properties: { has_email: Boolean(email) } 
  });
};