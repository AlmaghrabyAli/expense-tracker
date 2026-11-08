import i18n from '../i18n';

/**
 * Normalizes an error object into a predictable structure:
 * { status, detail, title, fieldErrors: { [field]: [message, ...] } }
 */
export function normalizeApiError(error) {
  if (!error) {
    return {
      status: 500,
      detail: i18n.t('errors.generic'),
      fieldErrors: {},
    };
  }

  // If already normalized
  if (error.status && error.detail !== undefined) {
    return error;
  }

  const response = error.response;
  if (!response) {
    return {
      status: 0,
      detail: i18n.t('errors.generic'),
      fieldErrors: {},
    };
  }

  const status = response.status || 500;
  const data = response.data || {};

  const detail = typeof data === 'string' ? data : data.detail || data.title || '';
  const title = data.title || '';
  const fieldErrors = {};

  if (data.errors && typeof data.errors === 'object') {
    Object.entries(data.errors).forEach(([rawKey, messages]) => {
      // Strip '$.' prefix and normalize to camelCase
      const cleanKey = rawKey.replace(/^\$\./, '');
      const camelKey = cleanKey.length > 0 ? cleanKey.charAt(0).toLowerCase() + cleanKey.slice(1) : cleanKey;
      fieldErrors[camelKey] = Array.isArray(messages) ? messages : [String(messages)];
    });
  }

  return {
    status,
    title,
    detail,
    fieldErrors,
  };
}

/**
 * Maps known server error details and status codes to translated messages (Contract Section 8.2).
 * Supports passing either a translation function `t` or a language string `lang`.
 */
export function getLocalizedErrorMessage(apiError, tOrLang) {
  const translate =
    typeof tOrLang === 'function'
      ? tOrLang
      : (key, options) =>
          i18n.t(
            key,
            typeof tOrLang === 'string' ? { lng: tOrLang, ...options } : options
          );

  const normalized = normalizeApiError(apiError);
  const { status, detail } = normalized;
  const lowerDetail = (detail || '').toLowerCase();

  // 401 Login
  if (status === 401 && (lowerDetail.includes('invalid') || lowerDetail.includes('credentials') || !lowerDetail)) {
    return translate('errors.invalidCredentials');
  }

  // 409 Register Duplicate Email
  if (status === 409 && lowerDetail.includes('already registered')) {
    return translate('errors.emailAlreadyRegistered');
  }

  // 409 Category Name Conflict
  if (status === 409 && lowerDetail.includes('already exists')) {
    return translate('errors.categoryAlreadyExists');
  }

  // 409 Category Has Transactions
  if (status === 409 && (lowerDetail.includes('has transactions') || lowerDetail.includes('transactions'))) {
    return translate('errors.categoryHasTransactions');
  }

  // 403 Default Categories Protected
  if (status === 403) {
    return translate('errors.defaultCategoryProtected');
  }

  // 404 Item not found
  if (status === 404) {
    return translate('errors.itemNotFound');
  }

  // 400 Category not found
  if (status === 400 && lowerDetail.includes('category not found')) {
    return translate('errors.invalidCategory');
  }

  // 400 Category type mismatch
  if (status === 400 && lowerDetail.includes('cannot be used for an')) {
    return translate('errors.categoryTypeMismatch');
  }

  // 400 'from' must not be later than 'to'
  if (status === 400 && lowerDetail.includes('must not be later than')) {
    return translate('errors.dateRangeInvalid');
  }

  // 401 Session expired on protected call
  if (status === 401) {
    return translate('errors.sessionExpired');
  }

  // General 400
  if (status === 400) {
    return translate('errors.checkFields');
  }

  // 500 / Network
  return translate('errors.generic');
}

export const getApiErrorMessage = getLocalizedErrorMessage;
