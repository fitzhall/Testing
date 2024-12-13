import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { RevenueSources } from '../../../types/revenue';

interface RevenueSourcesGroupProps {
  title: string;
  sources: Array<{ key: keyof RevenueSources; label: string }>;
  selectedSources: RevenueSources;
  onToggle: (key: keyof RevenueSources) => void;
}

export const RevenueSourcesGroup: React.FC<RevenueSourcesGroupProps> = ({
  title,
  sources,
  selectedSources,
  onToggle,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 gap-3">
        {sources.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {selectedSources[key] ? (
              <CheckSquare className="w-5 h-5 text-blue-500" />
            ) : (
              <Square className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};