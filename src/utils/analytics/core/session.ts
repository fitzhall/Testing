import { nanoid } from 'nanoid';
import { trackEvent } from './track';
import { ANALYTICS_EVENTS } from '../events';

export function startSession(): void {
  const sessionId = nanoid();
  sessionStorage.setItem('session_id', sessionId);
  
  trackEvent({
    name: ANALYTICS_EVENTS.USER.SESSION_STARTED,
    properties: {
      session_id: sessionId,
      start_time: new Date().toISOString()
    }
  });
}

export function endSession(): void {
  const sessionId = sessionStorage.getItem('session_id');
  if (sessionId) {
    trackEvent({
      name: ANALYTICS_EVENTS.USER.SESSION_ENDED,
      properties: {
        session_id: sessionId,
        end_time: new Date().toISOString()
      }
    });
    sessionStorage.removeItem('session_id');
  }
}