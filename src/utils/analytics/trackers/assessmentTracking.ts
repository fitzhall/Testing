import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';

export const trackAssessmentStart = () => {
  trackEvent({
    name: ANALYTICS_EVENTS.ASSESSMENT.STARTED,
    properties: {
      timestamp: new Date().toISOString(),
      source: window.location.href
    }
  });
};

export const trackStepView = (stepNumber: number, stepName: string) => {
  trackEvent({
    name: ANALYTICS_EVENTS.ASSESSMENT.STEP_VIEWED,
    properties: {
      step_number: stepNumber,
      step_name: stepName,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackStepComplete = (
  stepNumber: number, 
  stepName: string, 
  timeSpent: number
) => {
  trackEvent({
    name: ANALYTICS_EVENTS.ASSESSMENT.STEP_COMPLETED,
    properties: {
      step_number: stepNumber,
      step_name: stepName,
      time_spent_seconds: timeSpent
    }
  });
};

export const trackAssessmentComplete = (score: number, totalTime: number) => {
  trackEvent({
    name: ANALYTICS_EVENTS.ASSESSMENT.COMPLETED,
    properties: {
      final_score: score,
      total_time_seconds: totalTime,
      completion_date: new Date().toISOString()
    }
  });
};