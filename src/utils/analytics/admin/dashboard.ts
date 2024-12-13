import posthog from 'posthog-js';
import { ANALYTICS_EVENTS } from '../events';

export interface AnalyticsMetrics {
  totalRequests: number;
  completionRate: number;
  averageTime: number;
  errorRate: number;
}

export async function getAnalyticsMetrics(dateRange: string = '7d'): Promise<AnalyticsMetrics> {
  const insights = await posthog.query({
    events: [
      { id: ANALYTICS_EVENTS.ANALYSIS.REQUESTED, name: 'Analysis Requested' },
      { id: ANALYTICS_EVENTS.ANALYSIS.COMPLETED, name: 'Analysis Completed' },
      { id: ANALYTICS_EVENTS.ANALYSIS.FAILED, name: 'Analysis Failed' }
    ],
    dateRange,
    interval: 'day'
  });

  const metrics = {
    totalRequests: insights.results[0].total,
    completionRate: (insights.results[1].total / insights.results[0].total) * 100,
    averageTime: calculateAverageTime(insights.results),
    errorRate: (insights.results[2].total / insights.results[0].total) * 100
  };

  return metrics;
}

function calculateAverageTime(results: any[]): number {
  const completedEvents = results[1].data;
  const requestedEvents = results[0].data;
  
  let totalTime = 0;
  let count = 0;

  completedEvents.forEach((completed: any) => {
    const requested = requestedEvents.find((req: any) => 
      req.properties.session_id === completed.properties.session_id
    );
    
    if (requested) {
      const timeDiff = new Date(completed.timestamp).getTime() - 
                      new Date(requested.timestamp).getTime();
      totalTime += timeDiff;
      count++;
    }
  });

  return count > 0 ? totalTime / count / 1000 : 0; // Return average in seconds
}