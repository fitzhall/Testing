import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';
import { TimeTrackingData } from '../types';

let startTime: number;

export const startTimeTracking = (): void => {
  startTime = Date.now();
};

export const trackTimeSpent = (pageName: string): void => {
  if (startTime) {
    const data: TimeTrackingData = {
      page: pageName,
      duration_seconds: Math.floor((Date.now() - startTime) / 1000)
    };
    trackEvent({ 
      name: ANALYTICS_EVENTS.USER.TIME_SPENT, 
      properties: data 
    });
  }
};