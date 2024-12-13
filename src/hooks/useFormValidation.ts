import { useState, useCallback } from 'react';
import { FormData } from '../types/scoring';

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (initialData: FormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const validate = useCallback((formData: FormData & { currentStep: number }) => {
    const newErrors: ValidationErrors = {};
    const currentStep = formData.currentStep || 1;

    // Only validate fields for the current step
    if (currentStep === 1) {
      const hasActiveRevenueSources = Object.values(formData.revenueSources || {}).some(value => value);
      if (!hasActiveRevenueSources) {
        newErrors.revenueSources = 'Please select at least one revenue source';
      }
      if (!formData.revenueAmounts?.monthlyRevenue) {
        newErrors.monthlyRevenue = 'Please enter monthly revenue';
      }
    }

    if (currentStep === 2) {
      if (!formData.businessStructure) {
        newErrors.businessStructure = 'Please select business structure';
      }
      if (!formData.businessAge) {
        newErrors.businessAge = 'Please select business age';
      }
      if (!formData.employees) {
        newErrors.employees = 'Please select number of employees';
      }
    }

    if (currentStep === 3) {
      if (!formData.monthlyExpenses) {
        newErrors.monthlyExpenses = 'Please select monthly expenses range';
      }
      if (!formData.expenseCategories?.length) {
        newErrors.expenseCategories = 'Please select at least one expense category';
      }
      if (!formData.taxPlanning) {
        newErrors.taxPlanning = 'Please select a tax planning approach';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { errors, validate, markFieldAsTouched };
};