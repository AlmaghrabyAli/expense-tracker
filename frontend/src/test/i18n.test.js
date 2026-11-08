import { describe, it, expect } from 'vitest';
import en from '../i18n/locales/en.json';
import ar from '../i18n/locales/ar.json';

function getDeepKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getDeepKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe('i18n Catalogs Symmetry', () => {
  const enKeys = getDeepKeys(en);
  const arKeys = getDeepKeys(ar);

  it('en.json and ar.json have the exact same count of translation keys', () => {
    expect(enKeys.length).toBe(arKeys.length);
  });

  it('no keys in en.json are missing in ar.json', () => {
    const missingInAr = enKeys.filter((k) => !arKeys.includes(k));
    expect(missingInAr).toEqual([]);
  });

  it('no keys in ar.json are missing in en.json', () => {
    const missingInEn = arKeys.filter((k) => !enKeys.includes(k));
    expect(missingInEn).toEqual([]);
  });

  it('every translation key in both languages has non-empty string content', () => {
    const getValue = (obj, path) =>
      path.split('.').reduce((acc, part) => acc?.[part], obj);

    for (const key of enKeys) {
      const enVal = getValue(en, key);
      const arVal = getValue(ar, key);

      expect(typeof enVal).toBe('string');
      expect(enVal.trim().length).toBeGreaterThan(0);

      expect(typeof arVal).toBe('string');
      expect(arVal.trim().length).toBeGreaterThan(0);
    }
  });
});
