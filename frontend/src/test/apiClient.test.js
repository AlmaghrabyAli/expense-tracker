import { describe, it, expect, beforeEach, vi } from 'vitest';
import apiClient from '../api/client';
import { STORAGE_KEYS } from '../utils/constants';

describe('api/client', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('attaches the Bearer token from localStorage to outgoing requests', async () => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'my-test-token-123');

    // Create a mock adapter for this test only
    let capturedHeaders = null;
    apiClient.defaults.adapter = async (config) => {
      capturedHeaders = config.headers;
      return {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };

    await apiClient.get('/api/test-endpoint');
    expect(capturedHeaders.Authorization).toBe('Bearer my-test-token-123');
  });

  it('clears session and dispatches session-expired event on 401 from protected endpoint', async () => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'active-token');
    localStorage.setItem(STORAGE_KEYS.EXPIRES, '2026-11-08T12:00:00Z');
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ id: 1 }));

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    apiClient.defaults.adapter = async (config) => {
      const err = new Error('Unauthorized');
      err.response = {
        status: 401,
        data: '',
        headers: {},
        config,
      };
      return Promise.reject(err);
    };

    await expect(apiClient.get('/api/transactions')).rejects.toMatchObject({
      status: 401,
    });

    expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.EXPIRES)).toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.USER)).toBeNull();

    expect(dispatchSpy).toHaveBeenCalled();
    const event = dispatchSpy.mock.calls.find(
      ([ev]) => ev.type === 'et:session-expired'
    );
    expect(event).toBeDefined();
  });

  it('does NOT clear session or dispatch session-expired on 401 from /api/auth/login', async () => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'existing-token');
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    apiClient.defaults.adapter = async (config) => {
      const err = new Error('Unauthorized');
      err.config = config;
      err.response = {
        status: 401,
        data: '',
        headers: {},
        config,
      };
      return Promise.reject(err);
    };

    await expect(
      apiClient.post('/api/auth/login', { email: 'test@example.com', password: 'bad' })
    ).rejects.toMatchObject({
      status: 401,
    });

    // Token must NOT be cleared by a failed login attempt
    expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBe('existing-token');
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'et:session-expired' })
    );
  });

  it('does NOT clear session or dispatch session-expired on 401 from /api/auth/register', async () => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'existing-token');
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    apiClient.defaults.adapter = async (config) => {
      const err = new Error('Unauthorized');
      err.config = config;
      err.response = {
        status: 401,
        data: '',
        headers: {},
        config,
      };
      return Promise.reject(err);
    };

    await expect(
      apiClient.post('/api/auth/register', { email: 'test@example.com' })
    ).rejects.toMatchObject({
      status: 401,
    });

    expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBe('existing-token');
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'et:session-expired' })
    );
  });
});
