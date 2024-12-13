import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, ArrowRight } from 'lucide-react';
import { PriorityFix } from '../../types/recommendations';

interface QuickWinsProps {
  fixes: PriorityFix[];
  totalSavings: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const QuickWins: React.FC<QuickWinsProps> = ({ 
  fixes, 
  totalSavings, 
  riskLevel 
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (level: PriorityFix['level']) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-lg p-6 shadow-md space-y-6"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Priority Improvements
      </h3>

      <div className="flex items-center gap-3">
        <DollarSign className="w-10 h-10 text-green-500" />
        <div>
          <p className="text-sm text-gray-600">Potential Annual Savings</p>
          <p className="text-2xl font-bold">${totalSavings.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <ul className="space-y-4">
          {fixes.map((fix, index) => (
            <motion.li
              key={fix.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(fix.level)}`}>
                      {fix.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{fix.category}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{fix.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{fix.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                    <span>Impact:</span>
                    <span>{fix.impact}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <span className="text-sm">Overall Risk Level:</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
        </span>
      </div>
    </motion.div>
  );
};