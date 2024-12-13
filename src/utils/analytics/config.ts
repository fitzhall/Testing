import { PostHogConfig } from './types';

export const POSTHOG_CONFIG: PostHogConfig = {
  api_host: 'https://app.posthog.com',
  autocapture: {
    element_attributes: ['data-ph-capture'],
    css_selector_allowlist: ['button', 'input', 'select', 'form'],
  },
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
  persistence: 'localStorage',
  bootstrap: {
    distinctID: 'anonymous-user',
    isIdentified: false,
  }
};