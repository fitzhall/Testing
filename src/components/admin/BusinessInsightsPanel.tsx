import React from 'react';
import { Building2, TrendingUp, Users } from 'lucide-react';

interface BusinessInsights {
  commonStructures: Record<string, number>;
  structureByRevenue: Record<string, number>;
  industryComparisons: Record<string, number>;
}

interface BusinessInsightsPanelProps {
  insights: BusinessInsights;
}

export const BusinessInsightsPanel: React.FC<BusinessInsightsPanelProps> = ({ insights }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Structure Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Common Structures */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Building2 className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-600">Common Structures</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(insights.commonStructures)
              .sort(([, a], [, b]) => b - a)
              .map(([structure, count]) => (
                <div key={structure} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{structure}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Structure by Revenue */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-sm font-medium text-green-600">Revenue by Structure</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(insights.structureByRevenue)
              .sort(([, a], [, b]) => b - a)
              .map(([structure, revenue]) => (
                <div key={structure} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{structure}</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${revenue.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Industry Comparisons */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-sm font-medium text-purple-600">Industry Comparison</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(insights.industryComparisons)
              .sort(([, a], [, b]) => b - a)
              .map(([metric, percentile]) => (
                <div key={metric} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{metric}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {(percentile * 100).toFixed(0)}th percentile
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};