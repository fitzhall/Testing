import React from 'react';
import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

interface RevenueMetrics {
  averageRevenue: number;
  revenueDistribution: Record<string, number>;
  monthlyTrend: number[];
}

interface RevenueAnalysisProps {
  metrics: RevenueMetrics;
}

export const RevenueAnalysis: React.FC<RevenueAnalysisProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Average Revenue */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg">
          <DollarSign className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-600">Average Revenue</p>
            <p className="text-2xl font-semibold text-green-900">
              ${metrics.averageRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <BarChart2 className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">Revenue Sources</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(metrics.revenueDistribution)
              .sort(([, a], [, b]) => b - a)
              .map(([source, amount]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{source}</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${amount.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-600">Monthly Trend</h3>
          </div>
          <div className="h-20 flex items-end space-x-2">
            {metrics.monthlyTrend.map((value, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t w-full"
                style={{
                  height: `${(value / Math.max(...metrics.monthlyTrend)) * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};