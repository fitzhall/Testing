import { useCallback } from 'react';
import { trackButtonClick, trackFieldInteraction } from '../utils/analytics/trackers/interactionTracking';
import { trackFormStep } from '../utils/analytics/trackers/form-tracking';

interface AnalyticsConfig {
  currentStep?: number;
  stepName?: string;
  isComplete?: boolean;
  score?: number;
}

export const useAnalytics = (config: AnalyticsConfig = {}) => {
  const handleButtonClick = useCallback((buttonId: string, buttonText: string) => {
    trackButtonClick(buttonId, buttonText);
  }, []);

  const handleFieldInteraction = useCallback((fieldId: string, fieldType: string, action: 'focus' | 'complete') => {
    trackFieldInteraction(fieldId, fieldType, action);
  }, []);

  const handleFormStep = useCallback((stepNumber: number, stepName: string) => {
    trackFormStep(stepNumber, stepName);
  }, []);

  return {
    trackButtonClick: handleButtonClick,
    trackFieldInteraction: handleFieldInteraction,
    trackFormStep: handleFormStep
  };
};