import React from 'react';
import { ErrorReport } from '../../utils/analytics/admin/errors';
import { AlertCircle } from 'lucide-react';

interface ErrorsPanelProps {
  errors: ErrorReport[];
}

export const ErrorsPanel: React.FC<ErrorsPanelProps> = ({ errors }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Errors</h2>
      </div>

      <div className="space-y-4">
        {errors.map((error, index) => (
          <div 
            key={index}
            className="p-4 bg-red-50 rounded-lg border border-red-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-red-800">
                  {error.message}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Last occurred: {new Date(error.lastOccurred).toLocaleString()}
                </p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                {error.count}×
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};