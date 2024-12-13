import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { promptService } from '../../../services/promptService';
import { PromptHeader } from './PromptHeader';
import { PromptList } from './PromptList';
import { PromptEditor } from './PromptEditor';
import type { PromptTemplate } from '../../../types/prompts';

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
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setError(null);
      
      // Validate required fields
      if (!editingTemplate.name?.trim()) {
        setError('Template name is required');
        return;
      }
      if (!editingTemplate.version?.trim()) {
        setError('Version is required');
        return;
      }
      if (!editingTemplate.system_prompt?.trim()) {
        setError('System prompt is required');
        return;
      }
      if (!editingTemplate.user_prompt_template?.trim()) {
        setError('User prompt template is required');
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
      setError(err instanceof Error ? err.message : 'Failed to save template');
      console.error('Error saving template:', err);
    }
  }

  async function handleSetActive(id: string) {
    try {
      setError(null);
      await promptService.setActiveTemplate(id);
      await loadTemplates();
    } catch (err) {
      setError('Failed to set active template');
      console.error('Error setting active template:', err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PromptHeader 
        onNewTemplate={() => {
          setError(null);
          setIsEditing(true);
          setEditingTemplate({});
        }} 
      />

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {isEditing ? (
        <PromptEditor
          template={editingTemplate}
          onChange={setEditingTemplate}
          onSave={handleSave}
          onCancel={() => {
            setError(null);
            setIsEditing(false);
            setEditingTemplate({});
          }}
        />
      ) : (
        <PromptList
          templates={templates}
          onEdit={(template) => {
            setError(null);
            setIsEditing(true);
            setEditingTemplate(template);
          }}
          onSetActive={handleSetActive}
        />
      )}
    </div>
  );
};