import React from 'react';
import { Users, Clock, TrendingDown } from 'lucide-react';

interface UserJourneyMetrics {
  averageTimeToComplete: number;
  dropOffPoints: Record<string, number>;
  completionRate: number;
}

interface UserJourneyPanelProps {
  metrics: UserJourneyMetrics;
}

export const UserJourneyPanel: React.FC<UserJourneyPanelProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">User Journey Analysis</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Completion Rate */}
        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <Users className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-blue-600">Completion Rate</p>
            <p className="text-2xl font-semibold text-blue-900">
              {(metrics.completionRate * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Average Time */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg">
          <Clock className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-600">Average Time</p>
            <p className="text-2xl font-semibold text-green-900">
              {metrics.averageTimeToComplete.toFixed(1)}m
            </p>
          </div>
        </div>

        {/* Drop-off Points */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <TrendingDown className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">Drop-off Points</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(metrics.dropOffPoints)
              .sort(([, a], [, b]) => b - a)
              .map(([step, rate]) => (
                <div key={step} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{step}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {(rate * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};