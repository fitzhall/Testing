import React from 'react';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface RevenueAmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const RevenueAmountInput: React.FC<RevenueAmountInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Monthly Revenue
        </h3>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <DollarSign className="h-8 w-8 text-blue-500" />
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className="block w-full pl-14 pr-4 py-5 text-3xl font-bold text-gray-900 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
          placeholder="0"
          min="0"
          step="100"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {[1000, 5000, 10000, 25000, 50000].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(amount)}
            className="px-4 py-2 text-sm font-medium bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-200"
          >
            ${amount.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          This helps us calculate your potential tax savings and growth opportunities
        </p>
      </div>
    </motion.div>
  );
};