import { describe, it, expect } from 'vitest';
import {
  formatMoney,
  formatDate,
  normalizeArabicDigits,
  calculatePeriodChange,
  formatPeriodChange,
} from '../utils/format';

describe('utils/format', () => {
  describe('formatMoney', () => {
    it('formats in English with EGP prefix and thousands separators', () => {
      expect(formatMoney(14519.5, 'en')).toBe('EGP 14,519.50');
      expect(formatMoney(0, 'en')).toBe('EGP 0.00');
      expect(formatMoney(1000000, 'en')).toBe('EGP 1,000,000.00');
    });

    it('formats in Arabic with Western digits and ج.م suffix', () => {
      expect(formatMoney(14519.5, 'ar')).toBe('14,519.50 ج.م');
      expect(formatMoney(0, 'ar')).toBe('0.00 ج.م');
      expect(formatMoney(746, 'ar')).toBe('746.00 ج.م');
    });

    it('handles negative numbers cleanly', () => {
      expect(formatMoney(-500.25, 'en')).toBe('-EGP 500.25');
      expect(formatMoney(-500.25, 'ar')).toBe('-500.25 ج.م');
    });

    it('handles string amounts gracefully', () => {
      expect(formatMoney('150.5', 'en')).toBe('EGP 150.50');
      expect(formatMoney('150.5', 'ar')).toBe('150.50 ج.م');
    });
  });

  describe('formatDate', () => {
    it('formats date in English as dd MMM yyyy', () => {
      expect(formatDate('2026-11-03', 'en')).toBe('03 Nov 2026');
      expect(formatDate('2026-01-15', 'en')).toBe('15 Jan 2026');
      expect(formatDate('2026-09-03', 'en')).toBe('03 Sep 2026');
    });

    it('formats date in Arabic with Arabic month names and Western digits', () => {
      const formatted = formatDate('2026-11-03', 'ar');
      expect(formatted).toContain('03');
      expect(formatted).toContain('نوفمبر');
      expect(formatted).toContain('2026');
      // Ensure digits are strictly Western (0-9)
      expect(/^[0-9\s\u0600-\u06FF]+$/.test(formatted)).toBe(true);
      expect(/[٠-٩]/.test(formatted)).toBe(false);
    });
  });

  describe('normalizeArabicDigits', () => {
    it('converts Eastern Arabic-Indic numerals (٠-٩) to Western ASCII digits (0-9)', () => {
      expect(normalizeArabicDigits('١٢٣٤٥')).toBe('12345');
      expect(normalizeArabicDigits('١٤٥١٩.٥٠')).toBe('14519.50');
      expect(normalizeArabicDigits('١٤٥١٩٫٥٠')).toBe('14519.50'); // Arabic decimal comma
      expect(normalizeArabicDigits('123.45')).toBe('123.45');
    });

    it('handles empty or non-string inputs safely', () => {
      expect(normalizeArabicDigits('')).toBe('');
      expect(normalizeArabicDigits(null)).toBe('');
      expect(normalizeArabicDigits(undefined)).toBe('');
      expect(normalizeArabicDigits(1234)).toBe('1234');
    });
  });

  describe('calculatePeriodChange & formatPeriodChange', () => {
    it('calculates percentage change correctly', () => {
      const change1 = calculatePeriodChange(100, 50);
      expect(change1.value).toBe(100);
      expect(change1.isPositive).toBe(true);
      expect(change1.formatted).toBe('+100.0%');

      const change2 = calculatePeriodChange(50, 100);
      expect(change2.value).toBe(-50);
      expect(change2.isPositive).toBe(false);
      expect(change2.formatted).toBe('-50.0%');

      // Contract: if previous is 0, return null
      expect(calculatePeriodChange(100, 0)).toBeNull();
    });

    it('formats period change with correct prefix direction', () => {
      const positive = formatPeriodChange(7.8);
      expect(positive.isPositive).toBe(true);
      expect(positive.text).toBe('+7.8%');

      const negative = formatPeriodChange(-57.4);
      expect(negative.isPositive).toBe(false);
      expect(negative.text).toBe('-57.4%');

      const neutral = formatPeriodChange(0);
      expect(neutral.text).toBe('+0.0%');
    });
  });
});
