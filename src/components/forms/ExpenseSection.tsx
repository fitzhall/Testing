import React from 'react';

interface ExpenseSectionProps {
  formData: {
    monthlyExpenses: string;
    expenseCategories: string[];
    taxPlanning: string;
  };
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
  onFieldTouch?: (field: string) => void;
}

const expenseCategories = [
  'Inventory',
  'Marketing',
  'Software',
  'Shipping',
  'Staff',
  'Office Space',
  'Equipment',
  'Other',
];

export const ExpenseSection: React.FC<ExpenseSectionProps> = ({ 
  formData, 
  onChange,
  errors = {},
  onFieldTouch
}) => {
  const toggleCategory = (category: string) => {
    const newCategories = formData.expenseCategories.includes(category)
      ? formData.expenseCategories.filter(c => c !== category)
      : [...formData.expenseCategories, category];
    onChange('expenseCategories', newCategories);
    onFieldTouch?.('expenseCategories');
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Monthly Expenses
        </label>
        <select
          value={formData.monthlyExpenses}
          onChange={(e) => {
            onChange('monthlyExpenses', e.target.value);
            onFieldTouch?.('monthlyExpenses');
          }}
          className="w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          <option value="">Select range...</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1001-5000">$1,001 - $5,000</option>
          <option value="5001-10000">$5,001 - $10,000</option>
          <option value="10001-50000">$10,001 - $50,000</option>
          <option value="50001+">$50,001+</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Main Expense Categories
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenseCategories.map((category) => (
            <label
              key={category}
              className="flex items-center p-4 space-x-3 cursor-pointer bg-white rounded-xl border-2 hover:border-blue-500 transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.expenseCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-lg">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Tax Planning Approach
        </label>
        <select
          value={formData.taxPlanning}
          onChange={(e) => {
            onChange('taxPlanning', e.target.value);
            onFieldTouch?.('taxPlanning');
          }}
          className="w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          <option value="">Select approach...</option>
          <option value="none">No formal tax planning</option>
          <option value="annual">Annual tax planning</option>
          <option value="quarterly">Quarterly tax planning</option>
          <option value="monthly">Monthly tax planning</option>
          <option value="professional">Professional tax advisor</option>
        </select>
        {errors.taxPlanning && (
          <p className="mt-2 text-sm text-red-600">{errors.taxPlanning}</p>
        )}
      </div>
    </div>
  );
};