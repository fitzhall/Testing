import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { RevenueSection } from '../forms/RevenueSection';
import { BusinessStructureSection } from '../forms/BusinessStructureSection';
import { ExpenseSection } from '../forms/ExpenseSection';
import { ProgressBar } from '../ProgressBar';
import { FormData } from '../../types/scoring';

interface AssessmentFormProps {
  formData: FormData;
  currentStep: number;
  errors: Record<string, string>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  totalSteps: number;
  onFieldTouch: (field: string) => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  formData,
  currentStep,
  errors,
  onSubmit,
  onChange,
  onNext,
  onPrevious,
  totalSteps,
  onFieldTouch,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="min-h-[400px]"
        >
          {currentStep === 1 && (
            <RevenueSection 
              formData={formData} 
              onChange={onChange}
              onNext={onNext}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <BusinessStructureSection 
              formData={formData} 
              onChange={onChange}
              onNext={onNext}
              errors={errors}
              onFieldTouch={onFieldTouch}
            />
          )}
          {currentStep === 3 && (
            <ExpenseSection 
              formData={formData} 
              onChange={onChange}
              errors={errors}
              onFieldTouch={onFieldTouch}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
        )}

        {currentStep === totalSteps && (
          <button
            type="submit"
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ml-auto"
          >
            Calculate Score
            <Send className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </form>
  );
};