import { describe, it, expect } from 'vitest';
import { normalizeApiError, getLocalizedErrorMessage } from '../utils/errors';

describe('utils/errors', () => {
  describe('normalizeApiError', () => {
    it('normalizes standard ProblemDetails RFC 7807 error', () => {
      const serverError = {
        response: {
          status: 409,
          data: {
            title: 'Conflict',
            status: 409,
            detail: 'This email is already registered.',
          },
        },
      };

      const normalized = normalizeApiError(serverError);
      expect(normalized.status).toBe(409);
      expect(normalized.title).toBe('Conflict');
      expect(normalized.detail).toBe('This email is already registered.');
      expect(normalized.fieldErrors).toEqual({});
    });

    it('strips $. prefix and normalizes field names to camelCase', () => {
      const validationError = {
        response: {
          status: 400,
          data: {
            title: 'One or more validation errors occurred.',
            status: 400,
            errors: {
              '$.Email': ['The Email field is not a valid e-mail address.'],
              'Password': ['The Password field is required.'],
              '$.FullName': ['FullName must be between 2 and 100 characters.'],
            },
          },
        },
      };

      const normalized = normalizeApiError(validationError);
      expect(normalized.status).toBe(400);
      expect(normalized.fieldErrors.email).toEqual(['The Email field is not a valid e-mail address.']);
      expect(normalized.fieldErrors.password).toEqual(['The Password field is required.']);
      expect(normalized.fieldErrors.fullName).toEqual(['FullName must be between 2 and 100 characters.']);
    });

    it('handles empty-body 401 error', () => {
      const empty401 = {
        response: {
          status: 401,
          data: '',
        },
      };

      const normalized = normalizeApiError(empty401);
      expect(normalized.status).toBe(401);
      expect(normalized.detail).toBe('');
      expect(normalized.fieldErrors).toEqual({});
    });

    it('handles network errors where response is undefined', () => {
      const networkError = new Error('Network Error');
      const normalized = normalizeApiError(networkError);
      expect(normalized.status).toBe(0);
      expect(normalized.detail).toBeTruthy();
      expect(normalized.fieldErrors).toEqual({});
    });
  });

  describe('getLocalizedErrorMessage', () => {
    it('maps 401 login failure to invalid credentials message', () => {
      const err = { response: { status: 401, data: '' } };
      expect(getLocalizedErrorMessage(err, 'en')).toBe('Incorrect email or password.');
      expect(getLocalizedErrorMessage(err, 'ar')).toBe('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    });

    it('maps 409 duplicate email to email already registered', () => {
      const err = {
        response: {
          status: 409,
          data: { detail: 'This email is already registered.' },
        },
      };
      expect(getLocalizedErrorMessage(err, 'en')).toBe('This email is already registered.');
      expect(getLocalizedErrorMessage(err, 'ar')).toBe('هذا البريد الإلكتروني مسجّل بالفعل.');
    });

    it('maps 409 category with transactions', () => {
      const err = {
        response: {
          status: 409,
          data: { detail: 'This category has transactions. Move or delete them first, then try again.' },
        },
      };
      expect(getLocalizedErrorMessage(err, 'en')).toBe('Cannot delete: this category has transactions. Move or delete them first.');
      expect(getLocalizedErrorMessage(err, 'ar')).toBe('لا يمكن الحذف لأن هذه الفئة بها معاملات. انقلها أو احذفها أولًا.');
    });

    it('maps 403 default category protected', () => {
      const err = {
        response: {
          status: 403,
          data: { detail: 'Default categories cannot be edited or deleted.' },
        },
      };
      expect(getLocalizedErrorMessage(err, 'en')).toBe('Default categories cannot be edited or deleted.');
      expect(getLocalizedErrorMessage(err, 'ar')).toBe('لا يمكن تعديل أو حذف الفئات الافتراضية.');
    });
  });
});
