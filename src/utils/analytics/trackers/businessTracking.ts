import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';

export const trackBusinessStructure = (structure: string) => {
  trackEvent({
    name: ANALYTICS_EVENTS.BUSINESS.STRUCTURE_SELECTED,
    properties: {
      structure,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackBusinessAge = (age: string) => {
  trackEvent({
    name: ANALYTICS_EVENTS.BUSINESS.AGE_SELECTED,
    properties: {
      age,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackBusinessSize = (size: string) => {
  trackEvent({
    name: ANALYTICS_EVENTS.BUSINESS.SIZE_SELECTED,
    properties: {
      size,
      timestamp: new Date().toISOString()
    }
  });
};