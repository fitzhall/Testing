import { RecommendationLevel } from '../../types/recommendations';

export const recommendationTemplates = {
  revenue: {
    low: [
      'Implement basic revenue tracking across all platforms',
      'Set up separate business banking account',
      'Create basic pricing strategy for services',
      'Start monthly revenue reporting'
    ],
    medium: [
      'Optimize top-performing revenue streams',
      'Diversify income sources across platforms',
      'Implement advanced pricing strategies',
      'Develop revenue forecasting system'
    ],
    high: [
      'Scale successful revenue channels',
      'Explore international market opportunities',
      'Implement advanced revenue analytics',
      'Develop strategic platform partnerships'
    ]
  },
  tax: {
    low: [
      'Set up basic expense tracking system',
      'Separate personal and business finances',
      'Implement receipt management system',
      'Schedule quarterly tax reviews'
    ],
    medium: [
      'Optimize business structure for tax benefits',
      'Implement tax planning calendar',
      'Review deduction opportunities',
      'Set up profit-first accounting'
    ],
    high: [
      'Develop comprehensive tax strategy',
      'Implement international tax planning',
      'Optimize entity structure',
      'Create advanced tax forecasting'
    ]
  },
  growth: {
    low: [
      'Create basic business processes',
      'Set up performance metrics',
      'Develop content calendar',
      'Start audience analytics'
    ],
    medium: [
      'Scale successful operations',
      'Implement automation tools',
      'Develop team processes',
      'Create growth forecasting'
    ],
    high: [
      'Explore market expansion',
      'Develop strategic partnerships',
      'Implement advanced automation',
      'Create international strategy'
    ]
  }
} as const;