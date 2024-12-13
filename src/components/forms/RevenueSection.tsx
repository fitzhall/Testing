import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevenueSourcesGroup } from './revenue/RevenueSourcesGroup';
import { RevenueAmountInput } from './revenue/RevenueAmountInput';
import { RevenueSources, RevenueAmounts, REVENUE_CATEGORIES } from '../../types/revenue';

interface RevenueSectionProps {
  formData: {
    revenueSources: RevenueSources;
    revenueAmounts: RevenueAmounts;
  };
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  errors?: Record<string, string>;
}

export const RevenueSection: React.FC<RevenueSectionProps> = ({ 
  formData, 
  onChange,
  onNext,
  errors = {} 
}) => {
  const [showAmountInput, setShowAmountInput] = React.useState(false);
  const hasActiveSources = Object.values(formData.revenueSources).some(value => value);

  const handleSourceToggle = (key: keyof RevenueSources) => {
    const newSources = {
      ...formData.revenueSources,
      [key]: !formData.revenueSources[key]
    };
    onChange('revenueSources', newSources);
  };

  const handleAmountChange = (value: number) => {
    onChange('revenueAmounts', {
      monthlyRevenue: value
    });
  };

  const handleContinue = () => {
    if (hasActiveSources) {
      setShowAmountInput(true);
    }
  };

  const handleNext = () => {
    if (formData.revenueAmounts.monthlyRevenue > 0) {
      onNext();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showAmountInput ? (
        <motion.div
          key="sources"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(REVENUE_CATEGORIES).map(([key, category]) => (
                <RevenueSourcesGroup
                  key={key}
                  title={category.title}
                  sources={category.sources}
                  selectedSources={formData.revenueSources}
                  onToggle={handleSourceToggle}
                />
              ))}
            </div>
            {errors.revenueSources && (
              <p className="mt-2 text-sm text-red-600">{errors.revenueSources}</p>
            )}
          </div>

          {hasActiveSources && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Continue →
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="amount"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <RevenueAmountInput
            value={formData.revenueAmounts.monthlyRevenue}
            onChange={handleAmountChange}
          />
          
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setShowAmountInput(false)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!formData.revenueAmounts.monthlyRevenue}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                formData.revenueAmounts.monthlyRevenue
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};