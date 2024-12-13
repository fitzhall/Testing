import posthog from 'posthog-js';
import { POSTHOG_CONFIG } from '../config/posthog-config';
import { ANALYTICS_EVENTS } from '../events';

export function initializeAnalytics(): void {
  const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;

  if (!POSTHOG_KEY) {
    console.error('PostHog API key is missing');
    return;
  }

  try {
    posthog.init(POSTHOG_KEY, {
      ...POSTHOG_CONFIG,
      api_host: 'https://app.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          posthog.debug();
        }
      }
    });

    // Track session start
    posthog.capture(ANALYTICS_EVENTS.USER.SESSION_STARTED, {
      timestamp: new Date().toISOString(),
      url: window.location.href
    });

    // Track session end on window close
    window.addEventListener('beforeunload', () => {
      posthog.capture(ANALYTICS_EVENTS.USER.SESSION_ENDED, {
        timestamp: new Date().toISOString(),
        duration: Date.now() - performance.now()
      });
    });

    console.log('[Analytics] PostHog initialized successfully');
  } catch (error) {
    console.error('Failed to initialize PostHog:', error);
  }
}