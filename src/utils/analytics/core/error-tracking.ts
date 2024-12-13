import { trackEvent } from './track';
import { ANALYTICS_EVENTS } from '../events';

export function trackError(error: unknown, context: string): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  trackEvent({
    name: ANALYTICS_EVENTS.ERROR.OCCURRED,
    properties: {
      error_message: errorMessage,
      error_context: context,
      error_type: error instanceof Error ? error.constructor.name : 'Unknown',
      stack_trace: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }
  });
}