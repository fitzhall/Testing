import React from 'react';

interface BusinessStructureSectionProps {
  formData: {
    businessStructure: string;
    businessAge: string;
    employees: string;
  };
  onChange: (field: string, value: string) => void;
  onNext?: () => void;
  errors?: Record<string, string>;
  onFieldTouch?: (field: string) => void;
}

export const BusinessStructureSection: React.FC<BusinessStructureSectionProps> = ({
  formData,
  onChange,
  onNext,
  errors = {},
  onFieldTouch
}) => {
  const handleFieldChange = (field: string, value: string) => {
    onChange(field, value);
    onFieldTouch?.(field);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Business Structure
        </label>
        <select
          value={formData.businessStructure}
          onChange={(e) => handleFieldChange('businessStructure', e.target.value)}
          className="w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          <option value="">Select structure...</option>
          <option value="sole-proprietorship">Sole Proprietorship</option>
          <option value="llc">LLC</option>
          <option value="s-corporation">S Corporation</option>
          <option value="corporation">C Corporation</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Business Age
        </label>
        <select
          value={formData.businessAge}
          onChange={(e) => handleFieldChange('businessAge', e.target.value)}
          className="w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          <option value="">Select age...</option>
          <option value="0-1">Less than 1 year</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Number of Employees
        </label>
        <select
          value={formData.employees}
          onChange={(e) => handleFieldChange('employees', e.target.value)}
          className="w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          <option value="">Select range...</option>
          <option value="1">Just me</option>
          <option value="2-5">2-5</option>
          <option value="6-10">6-10</option>
          <option value="11+">11+</option>
        </select>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="button"
          onClick={onNext}
          className="w-full md:w-auto px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          Next →
        </button>
      </div>
    </div>
  );
};