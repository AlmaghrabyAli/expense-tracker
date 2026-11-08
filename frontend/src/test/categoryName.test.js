import { describe, it, expect } from 'vitest';
import { getCategoryDisplayName, getCategoryInitial } from '../utils/categoryName';

describe('utils/categoryName', () => {
  describe('Default Categories Localization', () => {
    it('keeps default categories in English when lang is en', () => {
      expect(getCategoryDisplayName('Food', 'en')).toBe('Food');
      expect(getCategoryDisplayName('Transport', 'en')).toBe('Transport');
      expect(getCategoryDisplayName('Salary', 'en')).toBe('Salary');
      expect(getCategoryDisplayName('Freelance', 'en')).toBe('Freelance');
      expect(getCategoryDisplayName('Other', 'en')).toBe('Other');
    });

    it('translates default categories to Arabic when lang is ar', () => {
      expect(getCategoryDisplayName('Food', 'ar')).toBe('الطعام');
      expect(getCategoryDisplayName('Transport', 'ar')).toBe('المواصلات');
      expect(getCategoryDisplayName('Bills', 'ar')).toBe('الفواتير');
      expect(getCategoryDisplayName('Shopping', 'ar')).toBe('التسوق');
      expect(getCategoryDisplayName('Health', 'ar')).toBe('الصحة');
      expect(getCategoryDisplayName('Entertainment', 'ar')).toBe('الترفيه');
      expect(getCategoryDisplayName('Education', 'ar')).toBe('التعليم');
      expect(getCategoryDisplayName('Salary', 'ar')).toBe('الراتب');
      expect(getCategoryDisplayName('Freelance', 'ar')).toBe('عمل حر');
      expect(getCategoryDisplayName('Gift', 'ar')).toBe('هدية');
    });

    it('translates Other to أخرى for both Expense and Income types', () => {
      // Expense "Other"
      const otherExpense = { id: 8, name: 'Other', type: 'Expense', isDefault: true };
      expect(getCategoryDisplayName(otherExpense, 'ar')).toBe('أخرى');
      expect(getCategoryDisplayName(otherExpense, 'en')).toBe('Other');

      // Income "Other"
      const otherIncome = { id: 12, name: 'Other', type: 'Income', isDefault: true };
      expect(getCategoryDisplayName(otherIncome, 'ar')).toBe('أخرى');
      expect(getCategoryDisplayName(otherIncome, 'en')).toBe('Other');

      // String "Other"
      expect(getCategoryDisplayName('Other', 'ar')).toBe('أخرى');
    });
  });

  describe('Custom Categories (isDefault: false)', () => {
    it('never translates custom categories regardless of language', () => {
      const customCat = { id: 101, name: 'Gym & Fitness', type: 'Expense', isDefault: false };
      expect(getCategoryDisplayName(customCat, 'en')).toBe('Gym & Fitness');
      expect(getCategoryDisplayName(customCat, 'ar')).toBe('Gym & Fitness');

      const customArabicTyped = { id: 102, name: 'صيانة السيارة', type: 'Expense', isDefault: false };
      expect(getCategoryDisplayName(customArabicTyped, 'en')).toBe('صيانة السيارة');
      expect(getCategoryDisplayName(customArabicTyped, 'ar')).toBe('صيانة السيارة');
    });
  });

  describe('Category Avatar Initial (getCategoryInitial)', () => {
    it('returns uppercase initial in English', () => {
      expect(getCategoryInitial('Food', 'en')).toBe('F');
      expect(getCategoryInitial({ name: 'Salary' }, 'en')).toBe('S');
      expect(getCategoryInitial('Gym & Fitness', 'en')).toBe('G');
    });

    it('returns Arabic initial for default categories in Arabic', () => {
      expect(getCategoryInitial('Salary', 'ar')).toBe('ا'); // الراتب
      expect(getCategoryInitial('Freelance', 'ar')).toBe('ع'); // عمل حر
      expect(getCategoryInitial('Gym & Fitness', 'ar')).toBe('G'); // Untranslated custom
    });
  });
});
