import { describe, it, expect } from 'vitest';
import { getPreviousPeriodRange } from '../utils/dates';
import { DATE_PRESETS } from '../utils/constants';

describe('getPreviousPeriodRange for custom ranges', () => {
  it('returns the single day before for a one-day range', () => {
    expect(getPreviousPeriodRange(DATE_PRESETS.CUSTOM, '2026-11-05', '2026-11-05')).toEqual({ from: '2026-11-04', to: '2026-11-04' });
  });
  it('keeps the same length for a 7-day range', () => {
    expect(getPreviousPeriodRange(DATE_PRESETS.CUSTOM, '2026-11-08', '2026-11-14')).toEqual({ from: '2026-11-01', to: '2026-11-07' });
  });
});
