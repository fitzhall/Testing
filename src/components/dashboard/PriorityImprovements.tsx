import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';
import { PriorityImprovement } from '../../types/priority';

interface PriorityImprovementsProps {
  improvements: PriorityImprovement[];
  annualSavings: number;
  score: number;
}

export const PriorityImprovements: React.FC<PriorityImprovementsProps> = ({
  improvements,
  annualSavings,
  score
}) => {
  const getRiskLevel = (score: number) => {
    if (score < 40) return { level: 'high', color: 'bg-red-100 text-red-800' };
    if (score < 70) return { level: 'medium', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'low', color: 'bg-green-100 text-green-800' };
  };

  const { level, color } = getRiskLevel(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          <p className="text-2xl font-bold">${annualSavings.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {improvements.map((improvement, index) => (
          <motion.div
            key={improvement.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    improvement.level === 'critical' ? 'bg-red-100 text-red-800' :
                    improvement.level === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {improvement.level.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{improvement.category}</span>
                </div>
                <h4 className="font-medium text-gray-900">{improvement.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{improvement.description}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                  <span>Impact:</span>
                  <span>{improvement.impact}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <span className="text-sm">Overall Risk Level:</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>
    </motion.div>
  );
};