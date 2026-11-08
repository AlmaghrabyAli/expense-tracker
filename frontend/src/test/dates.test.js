import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatLocalDate,
  parseLocalDate,
  getDatePresetRanges,
  getPresetDates,
  getPreviousPeriodRange,
  getPreviousPeriodDates,
} from '../utils/dates';
import { DATE_PRESETS } from '../utils/constants';

describe('utils/dates', () => {
  beforeEach(() => {
    // Freeze time to 2026-11-08 at 23:59:50 near midnight local time
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 8, 23, 59, 50));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatLocalDate & parseLocalDate', () => {
    it('formats a Date object to yyyy-MM-dd without UTC date shift', () => {
      const d = new Date(2026, 10, 8); // November 8, 2026
      expect(formatLocalDate(d)).toBe('2026-11-08');
    });

    it('handles leap year date (Feb 29) accurately', () => {
      const leapDay = new Date(2024, 1, 29); // Feb 29, 2024
      expect(formatLocalDate(leapDay)).toBe('2024-02-29');

      const parsed = parseLocalDate('2024-02-29');
      expect(parsed.getFullYear()).toBe(2024);
      expect(parsed.getMonth()).toBe(1);
      expect(parsed.getDate()).toBe(29);
    });

    it('formats correctly near midnight (23:59:59)', () => {
      const lateNight = new Date(2026, 10, 8, 23, 59, 59);
      expect(formatLocalDate(lateNight)).toBe('2026-11-08');
    });
  });

  describe('Preset Ranges (This month, Last 30 days, This year)', () => {
    it('calculates This Month range from 1st to last day of current month', () => {
      const range = getDatePresetRanges(DATE_PRESETS.THIS_MONTH);
      expect(range.from).toBe('2026-11-01');
      expect(range.to).toBe('2026-11-30'); // November has 30 days
    });

    it('calculates Last 30 Days range inclusive of current date', () => {
      const range = getDatePresetRanges(DATE_PRESETS.LAST_30_DAYS);
      expect(range.to).toBe('2026-11-08');
      expect(range.from).toBe('2026-10-10'); // 30 days total inclusive
    });

    it('calculates This Year range from Jan 1 to Dec 31', () => {
      const range = getDatePresetRanges(DATE_PRESETS.THIS_YEAR);
      expect(range.from).toBe('2026-01-01');
      expect(range.to).toBe('2026-12-31');
    });

    it('handles leap year month boundaries (February in 2024)', () => {
      vi.setSystemTime(new Date(2024, 1, 15)); // Feb 15, 2024
      const range = getDatePresetRanges(DATE_PRESETS.THIS_MONTH);
      expect(range.from).toBe('2024-02-01');
      expect(range.to).toBe('2024-02-29');
    });

    it('getPresetDates returns both from/to and fromDate/toDate properties', () => {
      const dates = getPresetDates(DATE_PRESETS.THIS_MONTH);
      expect(dates.from).toBe('2026-11-01');
      expect(dates.to).toBe('2026-11-30');
      expect(dates.fromDate).toBe('2026-11-01');
      expect(dates.toDate).toBe('2026-11-30');
    });
  });

  describe('Previous Period Calculation', () => {
    it('calculates previous month for This Month preset', () => {
      const prev = getPreviousPeriodRange(DATE_PRESETS.THIS_MONTH, '2026-11-01', '2026-11-30');
      expect(prev.from).toBe('2026-10-01');
      expect(prev.to).toBe('2026-10-31'); // October has 31 days
    });

    it('calculates previous year for This Year preset', () => {
      const prev = getPreviousPeriodRange(DATE_PRESETS.THIS_YEAR, '2026-01-01', '2026-12-31');
      expect(prev.from).toBe('2025-01-01');
      expect(prev.to).toBe('2025-12-31');
    });

    it('calculates previous 30-day window for Last 30 Days preset', () => {
      const prev = getPreviousPeriodRange(DATE_PRESETS.LAST_30_DAYS, '2026-10-10', '2026-11-08');
      expect(prev.to).toBe('2026-10-09');
      expect(prev.from).toBe('2026-09-10');
    });

    it('getPreviousPeriodDates returns both naming variants', () => {
      const prev = getPreviousPeriodDates('2026-11-01', '2026-11-30', DATE_PRESETS.THIS_MONTH);
      expect(prev.fromDate).toBe('2026-10-01');
      expect(prev.toDate).toBe('2026-10-31');
    });

    it('THIS_MONTH with 2026-11-01..2026-11-30 gives 2026-10-01..2026-10-31', () => {
      const prev = getPreviousPeriodDates('2026-11-01', '2026-11-30', DATE_PRESETS.THIS_MONTH);
      expect(prev.fromDate).toBe('2026-10-01');
      expect(prev.toDate).toBe('2026-10-31');
    });

    it('THIS_YEAR gives the previous calendar year', () => {
      const prev = getPreviousPeriodDates('2026-01-01', '2026-12-31', DATE_PRESETS.THIS_YEAR);
      expect(prev.fromDate).toBe('2025-01-01');
      expect(prev.toDate).toBe('2025-12-31');
    });
  });
});
