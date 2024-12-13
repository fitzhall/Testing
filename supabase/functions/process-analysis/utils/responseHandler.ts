import { CORS_HEADERS } from '../constants.ts';
import type { AnalysisResponse } from '../types.ts';

export function createResponse(data: AnalysisResponse, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}

export function createErrorResponse(error: Error): Response {
  console.error('Error:', error);
  
  return createResponse({
    status: 'error',
    error: error.message,
  }, 500);
}

export function createOptionsResponse(): Response {
  return new Response('ok', { headers: CORS_HEADERS });
}