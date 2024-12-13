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

export const trackEvent = (event: { name: string; properties?: Record<string, any> }): void => {
  if (!event.name) {
    console.error('Event name is required');
    return;
  }

  try {
    const eventProperties = {
      ...event.properties,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.DEV ? 'development' : 'production',
      url: window.location.href,
      path: window.location.pathname
    };

    console.log(`[PostHog] Tracking event: ${event.name}`, eventProperties);
    posthog.capture(event.name, eventProperties);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};