import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  icon: LucideIcon;
  delay?: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  maxScore, 
  icon: Icon,
  delay = 0 
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getColor = (percentage: number) => {
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg p-4 shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium">{title}</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{score} points</span>
          <span>{maxScore} max</span>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className={`h-full ${getColor(percentage)}`}
          />
        </div>
      </div>
    </motion.div>
  );
};