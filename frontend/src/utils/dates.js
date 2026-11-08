import { DATE_PRESETS } from './constants';

/**
 * Formats a Date object to 'yyyy-MM-dd' using LOCAL date parts.
 * Never use toISOString() as it uses UTC and shifts the day in Egypt time (UTC+2 / UTC+3).
 */
export function formatLocalDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses 'yyyy-MM-dd' as a local Date.
 */
export function parseLocalDate(str) {
  if (!str || typeof str !== 'string') return new Date();
  const parts = str.split('-');
  if (parts.length !== 3) return new Date();
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

/**
 * Calculates current preset dates: from, to (inclusive).
 */
export function getDatePresetRanges(preset = DATE_PRESETS.THIS_MONTH, customFrom = '', customTo = '') {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  if (preset === DATE_PRESETS.THIS_MONTH) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      from: formatLocalDate(firstDay),
      to: formatLocalDate(lastDay),
    };
  }

  if (preset === DATE_PRESETS.LAST_30_DAYS) {
    const toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const fromDate = new Date(toDate);
    fromDate.setDate(fromDate.getDate() - 29); // 30 days total inclusive
    return {
      from: formatLocalDate(fromDate),
      to: formatLocalDate(toDate),
    };
  }

  if (preset === DATE_PRESETS.THIS_YEAR) {
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    return {
      from: formatLocalDate(firstDay),
      to: formatLocalDate(lastDay),
    };
  }

  if (preset === DATE_PRESETS.CUSTOM) {
    return {
      from: customFrom || formatLocalDate(new Date(year, month, 1)),
      to: customTo || formatLocalDate(new Date(year, month + 1, 0)),
    };
  }

  return {
    from: formatLocalDate(new Date(year, month, 1)),
    to: formatLocalDate(new Date(year, month + 1, 0)),
  };
}

/**
 * Computes previous period of identical length immediately preceding the current range.
 * Used for comparing change % on the hero balance card.
 */
export function getPreviousPeriodRange(preset, fromStr, toStr) {
  if (preset === DATE_PRESETS.THIS_MONTH) {
    const currentFrom = parseLocalDate(fromStr);
    const prevMonthFirst = new Date(currentFrom.getFullYear(), currentFrom.getMonth() - 1, 1);
    const prevMonthLast = new Date(currentFrom.getFullYear(), currentFrom.getMonth(), 0);
    return {
      from: formatLocalDate(prevMonthFirst),
      to: formatLocalDate(prevMonthLast),
    };
  }

  if (preset === DATE_PRESETS.THIS_YEAR) {
    const currentFrom = parseLocalDate(fromStr);
    const prevYear = currentFrom.getFullYear() - 1;
    return {
      from: `${prevYear}-01-01`,
      to: `${prevYear}-12-31`,
    };
  }

  // For LAST_30_DAYS or CUSTOM: compute duration in days
  const fromDate = parseLocalDate(fromStr);
  const toDate = parseLocalDate(toStr);
  const diffTime = toDate.getTime() - fromDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const prevTo = new Date(fromDate);
  prevTo.setDate(prevTo.getDate() - 1);

  const prevFrom = new Date(prevTo);
  prevFrom.setDate(prevFrom.getDate() - (diffDays - 1));

  return {
    from: formatLocalDate(prevFrom),
    to: formatLocalDate(prevTo),
  };
}

/**
 * Returns preset dates with both { from, to } and { fromDate, toDate } properties.
 */
export function getPresetDates(preset, customFrom = '', customTo = '') {
  const range = getDatePresetRanges(preset, customFrom, customTo);
  return {
    from: range.from,
    to: range.to,
    fromDate: range.from,
    toDate: range.to,
  };
}

/**
 * Returns previous period dates with both { from, to } and { fromDate, toDate } properties.
 */
export function getPreviousPeriodDates(fromDate, toDate, preset) {
  const range = getPreviousPeriodRange(preset, fromDate, toDate);
  return {
    from: range.from,
    to: range.to,
    fromDate: range.from,
    toDate: range.to,
  };
}

