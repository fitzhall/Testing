import React from 'react';
import { Check, Edit2 } from 'lucide-react';
import type { PromptTemplate } from '../../../types/prompts';

interface PromptListProps {
  templates: PromptTemplate[];
  onEdit: (template: PromptTemplate) => void;
  onSetActive: (id: string) => void;
}

export const PromptList: React.FC<PromptListProps> = ({ 
  templates, 
  onEdit, 
  onSetActive 
}) => {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div key={template.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {template.name} <span className="text-sm text-gray-500">v{template.version}</span>
              </h3>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(template.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {template.is_active && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Active
                </span>
              )}
              <button
                onClick={() => onEdit(template)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">System Prompt</h4>
              <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                {template.system_prompt}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">User Prompt Template</h4>
              <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                {template.user_prompt_template}
              </pre>
            </div>
          </div>

          {!template.is_active && (
            <div className="mt-4">
              <button
                onClick={() => onSetActive(template.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Set as Active Template
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};