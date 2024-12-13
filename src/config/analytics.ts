import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;

if (!POSTHOG_KEY) {
  console.error('PostHog API key is missing');
} else {
  posthog.init(POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.debug();
      }
    },
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage'
  });
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!eventName) {
    console.error('Event name is required');
    return;
  }

  try {
    if (POSTHOG_KEY) {
      const eventData = {
        ...properties,
        timestamp: new Date().toISOString(),
        environment: import.meta.env.DEV ? 'development' : 'production',
        url: window.location.href,
        path: window.location.pathname
      };

      console.log(`[Analytics] Tracking: ${eventName}`, eventData);
      posthog.capture(eventName, eventData);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};