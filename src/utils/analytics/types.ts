export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export interface TimeTrackingData {
  page: string;
  duration_seconds: number;
}

export interface FormStepData {
  step_number: number;
  step_name: string;
  completed: boolean;
}