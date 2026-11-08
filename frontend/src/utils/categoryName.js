import { DEFAULT_CATEGORIES } from './constants';

/**
 * Returns the localized category display name.
 * Rule (Contract 8.1):
 * - Default categories (isDefault: true or matching default list by id) are translated to Arabic when lang === 'ar'.
 * - Custom categories (isDefault: false) are ALWAYS shown exactly as the user typed them in both languages.
 * Accepts:
 *   - a category object ({ id?, name?, categoryName?, isDefault? })
 *   - a raw string name
 *   - a numeric categoryId
 */
export function getCategoryDisplayName(category, lang = 'en') {
  if (!category) return '';

  // Numeric id passed directly
  if (typeof category === 'number') {
    const match = DEFAULT_CATEGORIES.find((dc) => dc.id === category);
    if (!match) return '';
    if (lang === 'ar' && match.arLabel) return match.arLabel;
    return match.name;
  }

  const rawName = typeof category === 'string'
    ? category
    : (category.name || category.categoryName || '');

  const isExplicitlyCustom = typeof category === 'object' && category.isDefault === false;

  if (lang === 'ar' && !isExplicitlyCustom) {
    // Try match by id first (most reliable)
    if (typeof category === 'object' && category.id) {
      const idMatch = DEFAULT_CATEGORIES.find((dc) => dc.id === category.id);
      if (idMatch?.arLabel) return idMatch.arLabel;
    }
    // Fallback: match by name
    const nameMatch = DEFAULT_CATEGORIES.find(
      (dc) => dc.name.toLowerCase() === rawName.toLowerCase()
    );
    if (nameMatch?.arLabel) return nameMatch.arLabel;
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
