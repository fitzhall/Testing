import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { promptService } from '../../services/promptService';
import type { PromptTemplate } from '../../types/prompts';

export const PromptManagement: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<PromptTemplate>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await promptService.getTemplates();
      setTemplates(data);
      setError(null);
    } catch (err) {
      setError('Failed to load prompt templates');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      if (!editingTemplate.name || !editingTemplate.version || 
          !editingTemplate.system_prompt || !editingTemplate.user_prompt_template) {
        setError('All fields are required');
        return;
      }

      if (editingTemplate.id) {
        await promptService.updateTemplate(editingTemplate.id, editingTemplate);
      } else {
        await promptService.createTemplate(editingTemplate);
      }
      
      setIsEditing(false);
      setEditingTemplate({});
      await loadTemplates();
    } catch (err) {
      setError('Failed to save template');
    }
  }

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Prompt Templates</h2>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingTemplate({});
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            type="text"
            placeholder="Template Name"
            value={editingTemplate.name || ''}
            onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Version (e.g., 1.0.0)"
            value={editingTemplate.version || ''}
            onChange={(e) => setEditingTemplate(prev => ({ ...prev, version: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="System Prompt"
            value={editingTemplate.system_prompt || ''}
            onChange={(e) => setEditingTemplate(prev => ({ ...prev, system_prompt: e.target.value }))}
            className="w-full p-2 border rounded h-32"
          />
          <textarea
            placeholder="User Prompt Template"
            value={editingTemplate.user_prompt_template || ''}
            onChange={(e) => setEditingTemplate(prev => ({ ...prev, user_prompt_template: e.target.value }))}
            className="w-full p-2 border rounded h-48"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingTemplate({});
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Template
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {template.name} 
                    <span className="text-sm text-gray-500">v{template.version}</span>
                    {template.is_active && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(template.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditingTemplate(template);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
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
                    onClick={async () => {
                      try {
                        await promptService.setActiveTemplate(template.id);
                        await loadTemplates();
                      } catch (err) {
                        setError('Failed to set active template');
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Set as Active Template
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};