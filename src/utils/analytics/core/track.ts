import posthog from 'posthog-js';
import { AnalyticsEvent } from '../types';

export function trackEvent(event: AnalyticsEvent): void {
  if (!event.name) {
    console.error('Event name is required');
    return;
  }

  try {
    const eventData = {
      ...event.properties,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.DEV ? 'development' : 'production',
      url: window.location.href,
      path: window.location.pathname,
      session_id: sessionStorage.getItem('session_id')
    };

    posthog.capture(event.name, eventData);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}