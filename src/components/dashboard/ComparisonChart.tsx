import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface ComparisonData {
  category: string;
  userScore: number;
  industryAvg: number;
  topPerformers: number;
}

interface ComparisonChartProps {
  data: ComparisonData[];
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="userScore" fill="#3B82F6" name="Your Score" />
            <Bar dataKey="industryAvg" fill="#9CA3AF" name="Industry Average" />
            <Bar dataKey="topPerformers" fill="#10B981" name="Top Performers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span>Your Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded" />
          <span>Industry Average</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Top Performers</span>
        </div>
      </div>
    </motion.div>
  );
};