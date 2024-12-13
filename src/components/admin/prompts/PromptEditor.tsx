import React from 'react';
import type { PromptTemplate } from '../../../types/prompts';

interface PromptEditorProps {
  template: Partial<PromptTemplate>;
  onChange: (updates: Partial<PromptTemplate>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  template,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <input
        type="text"
        placeholder="Template Name"
        value={template.name || ''}
        onChange={(e) => onChange({ ...template, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Version (e.g., 1.0.0)"
        value={template.version || ''}
        onChange={(e) => onChange({ ...template, version: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="System Prompt"
        value={template.system_prompt || ''}
        onChange={(e) => onChange({ ...template, system_prompt: e.target.value })}
        className="w-full p-2 border rounded h-32 font-mono"
      />
      <textarea
        placeholder="User Prompt Template"
        value={template.user_prompt_template || ''}
        onChange={(e) => onChange({ ...template, user_prompt_template: e.target.value })}
        className="w-full p-2 border rounded h-48 font-mono"
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};