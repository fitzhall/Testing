import React from 'react';
import { Plus } from 'lucide-react';

interface PromptHeaderProps {
  onNewTemplate: () => void;
}

export const PromptHeader: React.FC<PromptHeaderProps> = ({ onNewTemplate }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Prompt Templates</h2>
      <button
        onClick={onNewTemplate}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Template
      </button>
    </div>
  );
};