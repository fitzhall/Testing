import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';

export const trackButtonClick = (buttonId: string, buttonText: string): void => {
  trackEvent({
    name: ANALYTICS_EVENTS.BUTTON.CLICKED,
    properties: { button_id: buttonId, button_text: buttonText }
  });
};

export const trackFieldInteraction = (
  fieldId: string, 
  fieldType: string, 
  action: 'focus' | 'complete'
): void => {
  trackEvent({
    name: ANALYTICS_EVENTS.FIELD.INTERACTION,
    properties: { field_id: fieldId, field_type: fieldType, action }
  });
};