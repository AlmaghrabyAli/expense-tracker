import { parseLocalDate } from './dates';

/**
 * Normalizes Eastern Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) and Arabic decimal separators (٫) to Western digits.
 */
export function normalizeArabicDigits(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/٫/g, '.');
}

/**
 * Formats a money amount in EGP with 2 decimal places and Western digits 0-9.
 * English: EGP 14,519.50
 * Arabic:  14,519.50 ج.م
 */
export function formatMoney(amount, lang = 'en') {
  const num = typeof amount === 'number' ? amount : parseFloat(normalizeArabicDigits(amount)) || 0;
  const absNum = Math.abs(num);
  const formattedNumber = absNum.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = num < 0 ? '-' : '';

  if (lang === 'ar') {
    return `${sign}${formattedNumber} ج.م`;
  }
  return `${sign}EGP ${formattedNumber}`;
}

/**
 * Formats a date string (yyyy-MM-dd) to friendly localized text with Western digits.
 * English: 03 Nov 2026
 * Arabic:  03 نوفمبر 2026
 */
export function formatDate(dateStr, lang = 'en') {
  if (!dateStr) return '';
  const date = parseLocalDate(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  if (lang === 'ar') {
    return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date);
  const day = parts.find((p) => p.type === 'day')?.value || '';
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const year = parts.find((p) => p.type === 'year')?.value || '';
  return `${day} ${month} ${year}`;
}

/**
 * Computes change percentage between current and previous period: (current - previous) / abs(previous) * 100
 * If previous is 0, returns null as specified in the contract.
 */
export function calculatePeriodChange(current, previous) {
  if (previous === 0 || previous === null || previous === undefined || isNaN(previous)) {
    return null;
  }
  const curr = Number(current) || 0;
  const prev = Number(previous);
  const percent = ((curr - prev) / Math.abs(prev)) * 100;
  const isPositive = percent >= 0;
  const formatted = `${isPositive ? '+' : ''}${percent.toFixed(1)}%`;
  return {
    value: percent,
    isPositive,
    formatted,
  };
}

/**
 * Formats period change info for badges and chips.
 */
export function formatPeriodChange(change) {
  if (change === null || change === undefined) return null;
  if (typeof change === 'object') {
    return {
      value: change.value,
      isPositive: change.isPositive,
      text: change.formatted || `${change.isPositive ? '+' : ''}${Number(change.value).toFixed(1)}%`,
    };
  }
  const num = Number(change);
  if (isNaN(num)) return null;
  const isPositive = num >= 0;
  return {
    value: num,
    isPositive,
    text: `${isPositive ? '+' : ''}${num.toFixed(1)}%`,
  };
}

