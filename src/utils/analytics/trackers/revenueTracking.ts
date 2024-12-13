import { trackEvent } from '../posthog';
import { ANALYTICS_EVENTS } from '../events';
import { RevenueSources } from '../../../types/revenue';

export const trackRevenueSourceSelection = (
  source: keyof RevenueSources,
  selected: boolean
) => {
  trackEvent({
    name: ANALYTICS_EVENTS.REVENUE.SOURCE_SELECTED,
    properties: {
      source,
      selected,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackRevenueAmount = (amount: number) => {
  trackEvent({
    name: ANALYTICS_EVENTS.REVENUE.AMOUNT_ENTERED,
    properties: {
      amount,
      revenue_tier: getRevenueTier(amount),
      timestamp: new Date().toISOString()
    }
  });
};

function getRevenueTier(amount: number): string {
  if (amount <= 1000) return 'starter';
  if (amount <= 5000) return 'growing';
  if (amount <= 20000) return 'scaling';
  return 'established';
}