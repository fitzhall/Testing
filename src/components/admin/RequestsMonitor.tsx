import React from 'react';
import { AnalysisStats } from '../../utils/analytics/admin/monitor';

interface RequestsMonitorProps {
  stats?: AnalysisStats;
}

export const RequestsMonitor: React.FC<RequestsMonitorProps> = ({ stats }) => {
  // Default values if stats are undefined
  const defaultStats = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    averageProcessingTime: 0
  };

  const safeStats = stats || defaultStats;
  const total = getTotalRequests(safeStats);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Status</h2>
      
      <div className="space-y-4">
        <StatusBar 
          label="Pending" 
          count={safeStats.pending} 
          total={total}
          color="bg-yellow-500"
        />
        <StatusBar 
          label="Processing" 
          count={safeStats.processing} 
          total={total}
          color="bg-blue-500"
        />
        <StatusBar 
          label="Completed" 
          count={safeStats.completed} 
          total={total}
          color="bg-green-500"
        />
        <StatusBar 
          label="Failed" 
          count={safeStats.failed} 
          total={total}
          color="bg-red-500"
        />
      </div>

      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-600">
          Average Processing Time: {(safeStats.averageProcessingTime || 0).toFixed(1)}s
        </p>
      </div>
    </div>
  );
};

interface StatusBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} rounded-full h-2 transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

function getTotalRequests(stats: AnalysisStats): number {
  return (stats.pending || 0) + 
         (stats.processing || 0) + 
         (stats.completed || 0) + 
         (stats.failed || 0);
}