export const STORAGE_KEYS = {
  TOKEN: 'et_token',
  EXPIRES: 'et_expires',
  USER: 'et_user',
  LANG: 'et_lang',
};

export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Food', type: 'Expense', color: '#F97316', isDefault: true, arLabel: 'الطعام' },
  { id: 2, name: 'Transport', type: 'Expense', color: '#3B82F6', isDefault: true, arLabel: 'المواصلات' },
  { id: 3, name: 'Bills', type: 'Expense', color: '#EF4444', isDefault: true, arLabel: 'الفواتير' },
  { id: 4, name: 'Shopping', type: 'Expense', color: '#EC4899', isDefault: true, arLabel: 'التسوق' },
  { id: 5, name: 'Health', type: 'Expense', color: '#10B981', isDefault: true, arLabel: 'الصحة' },
  { id: 6, name: 'Entertainment', type: 'Expense', color: '#8B5CF6', isDefault: true, arLabel: 'الترفيه' },
  { id: 7, name: 'Education', type: 'Expense', color: '#06B6D4', isDefault: true, arLabel: 'التعليم' },
  { id: 8, name: 'Other', type: 'Expense', color: '#64748B', isDefault: true, arLabel: 'أخرى' },
  { id: 9, name: 'Salary', type: 'Income', color: '#22C55E', isDefault: true, arLabel: 'الراتب' },
  { id: 10, name: 'Freelance', type: 'Income', color: '#14B8A6', isDefault: true, arLabel: 'عمل حر' },
  { id: 11, name: 'Gift', type: 'Income', color: '#F59E0B', isDefault: true, arLabel: 'هدية' },
  { id: 12, name: 'Other', type: 'Income', color: '#64748B', isDefault: true, arLabel: 'أخرى' },
];

export const PRESET_COLORS = [
  '#059669', // Emerald
  '#0D9488', // Teal
  '#2563EB', // Blue
  '#4F46E5', // Indigo
  '#7C3AED', // Purple
  '#DB2777', // Pink
  '#F43F5E', // Rose
  '#EA580C', // Orange
  '#D97706', // Amber
  '#475569', // Slate
];

export const DATE_PRESETS = {
  THIS_MONTH: 'this_month',
  LAST_30_DAYS: 'last_30_days',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
};

export const PRESETS = DATE_PRESETS;
export const DEFAULT_PRESET_COLORS = PRESET_COLORS;

