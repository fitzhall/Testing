export const ANALYTICS_EVENTS = {
  BUTTON: {
    CLICKED: 'button_clicked'
  },
  FIELD: {
    INTERACTION: 'field_interaction'
  },
  FORM: {
    STARTED: 'form_started',
    STEP_COMPLETED: 'form_step_completed',
    COMPLETED: 'form_completed',
    DETAILED_ANALYSIS_REQUESTED: 'detailed_analysis_requested'
  },
  ANALYSIS: {
    REQUESTED: 'analysis_requested',
    COMPLETED: 'analysis_completed',
    FAILED: 'analysis_failed'
  },
  ERROR: {
    OCCURRED: 'error_occurred'
  },
  USER: {
    SESSION_STARTED: 'session_started',
    SESSION_ENDED: 'session_ended',
    TIME_SPENT: 'time_spent'
  }
} as const;