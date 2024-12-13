import { FormData } from '../../../types/scoring';
import { PriorityFix, BusinessAssessment } from '../types';

export function generateOperationalFixes(formData: FormData, assessment: BusinessAssessment): PriorityFix[] {
  const fixes: PriorityFix[] = [];

  if (assessment.hasTeamMembers && !assessment.contractorProcesses) {
    fixes.push({
      id: 'ops-001',
      level: 'critical',
      category: 'operations',
      title: 'Team Documentation Gaps',
      description: 'Missing contractor agreements and documentation',
      impact: 'Avoid potential penalties and protect business relationship'
    });
  }

  if (assessment.hasDigitalProducts && !assessment.intellectualProperty) {
    fixes.push({
      id: 'ops-002',
      level: 'high',
      category: 'operations',
      title: 'Digital Assets Need Protection',
      description: 'Intellectual property lacks proper protection',
      impact: 'Secure revenue streams and prevent unauthorized use'
    });
  }

  return fixes;
}