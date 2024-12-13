import React from 'react';
import { AnalyticsMetrics } from '../../utils/analytics/admin/dashboard';
import { BarChart2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface MetricsOverviewProps {
  metrics?: AnalyticsMetrics;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  // Default values if metrics are undefined
  const defaultMetrics = {
    totalRequests: 0,
    completionRate: 0,
    averageTime: 0,
    errorRate: 0
  };

  const safeMetrics = metrics || defaultMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Requests"
        value={safeMetrics.totalRequests}
        icon={BarChart2}
        color="blue"
      />
      <MetricCard
        title="Completion Rate"
        value={`${(safeMetrics.completionRate || 0).toFixed(1)}%`}
        icon={CheckCircle}
        color="green"
      />
      <MetricCard
        title="Average Time"
        value={`${(safeMetrics.averageTime || 0).toFixed(1)}s`}
        icon={Clock}
        color="purple"
      />
      <MetricCard
        title="Error Rate"
        value={`${(safeMetrics.errorRate || 0).toFixed(1)}%`}
        icon={AlertCircle}
        color="red"
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};