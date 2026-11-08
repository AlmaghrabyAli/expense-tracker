import { DEFAULT_CATEGORIES } from './constants';

/**
 * Returns the localized category display name.
 * Rule (Contract 8.1):
 * - Default categories (isDefault: true or matching default list) are translated to Arabic when lang === 'ar'.
 * - Custom categories (isDefault: false) are ALWAYS shown exactly as the user typed them in both languages.
 * Accepts either a category object ({ name, isDefault, type }) or a raw string name.
 */
export function getCategoryDisplayName(category, lang = 'en') {
  if (!category) return '';
  const rawName = typeof category === 'string' ? category : (category.name || category.categoryName || '');
  const isExplicitlyCustom = typeof category === 'object' && category.isDefault === false;

  if (lang === 'ar' && !isExplicitlyCustom) {
    const match = DEFAULT_CATEGORIES.find(
      (dc) => dc.name.toLowerCase() === rawName.toLowerCase()
    );
    if (match && match.arLabel) {
      return match.arLabel;
    }
  }

  return rawName;
}

/**
 * Returns the first letter initial for the category avatar circle.
 * In Arabic, extracts the first character of the localized display name.
 */
export function getCategoryInitial(category, lang = 'en') {
  const displayName = getCategoryDisplayName(category, lang);
  if (!displayName || typeof displayName !== 'string') return '?';
  const trimmed = displayName.trim();
  if (!trimmed) return '?';
  return trimmed.charAt(0).toUpperCase();
}
