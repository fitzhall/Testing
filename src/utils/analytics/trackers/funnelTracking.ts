import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';

export const trackFunnelStart = (): void => {
  trackEvent({ 
    name: ANALYTICS_EVENTS.FUNNEL.STARTED,
    properties: {
      entry_point: window.location.pathname,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackFunnelStep = (
  stepNumber: number, 
  stepName: string, 
  timeSpent: number
): void => {
  trackEvent({
    name: ANALYTICS_EVENTS.FUNNEL.STEP_REACHED,
    properties: {
      step_number: stepNumber,
      step_name: stepName,
      time_spent_seconds: timeSpent,
      cumulative_time: timeSpent
    }
  });
};

export const trackFunnelAbandonment = (
  lastStep: number,
  lastStepName: string,
  totalTimeSpent: number
): void => {
  trackEvent({
    name: ANALYTICS_EVENTS.FUNNEL.ABANDONED,
    properties: {
      exit_step: lastStep,
      exit_step_name: lastStepName,
      total_time_spent: totalTimeSpent,
      completed_percentage: (lastStep / 7) * 100
    }
  });
};

export const trackFunnelCompletion = (
  totalTimeSpent: number,
  score: number
): void => {
  trackEvent({
    name: ANALYTICS_EVENTS.FUNNEL.COMPLETED,
    properties: {
      total_time_spent: totalTimeSpent,
      final_score: score,
      completion_date: new Date().toISOString()
    }
  });
};