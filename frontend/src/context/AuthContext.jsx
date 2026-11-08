import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { authApi } from '../api/auth';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { t } = useTranslation();
  const tRef = useRef(t);
  useEffect(() => { tRef.current = t; }, [t]);
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  const clearSession = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.EXPIRES);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
      // ignore
    }
    setUser(null);
    setToken(null);
    setExpiresAt(null);
    queryClient.clear();
  }, [queryClient]);

  const scheduleAutoLogout = useCallback((expirationTime) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!expirationTime) return;

    const timeUntilExpiry = new Date(expirationTime).getTime() - Date.now();
    if (timeUntilExpiry <= 0) {
      clearSession();
      toast.error(tRef.current('errors.sessionExpired'), { id: 'session-expired' });
      return;
    }

    timerRef.current = setTimeout(() => {
      clearSession();
      toast.error(tRef.current('errors.sessionExpired'), { id: 'session-expired' });
    }, timeUntilExpiry);
  }, [clearSession]);

  const saveSession = useCallback((newToken, newExpiresAt, newUser) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
      localStorage.setItem(STORAGE_KEYS.EXPIRES, newExpiresAt);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setToken(newToken);
    setExpiresAt(newExpiresAt);
    setUser(newUser);
    scheduleAutoLogout(newExpiresAt);
  }, [scheduleAutoLogout]);

  // Startup verification
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const savedExpires = localStorage.getItem(STORAGE_KEYS.EXPIRES);
        const savedUserRaw = localStorage.getItem(STORAGE_KEYS.USER);

        if (!savedToken || !savedExpires) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const isExpired = new Date(savedExpires).getTime() <= Date.now();
        if (isExpired) {
          clearSession();
          if (isMounted) setIsLoading(false);
          return;
        }

        // Verify with GET /api/auth/me
        try {
          const profile = await authApi.getMe();
          if (isMounted) {
            setToken(savedToken);
            setExpiresAt(savedExpires);
            setUser(profile);
            scheduleAutoLogout(savedExpires);
          }
        } catch {
          // If token invalid/expired, clear
          if (isMounted) {
            clearSession();
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [clearSession, scheduleAutoLogout]);

  // Listen for global session-expired event
  useEffect(() => {
    const handleExpired = () => {
      clearSession();
      toast.error(tRef.current('errors.sessionExpired'), { id: 'session-expired' });
    };

    window.addEventListener('et:session-expired', handleExpired);
    return () => window.removeEventListener('et:session-expired', handleExpired);
  }, [clearSession]);

  const login = async (firstArg, secondArg) => {
    const payload =
      typeof firstArg === 'string'
        ? { email: firstArg, password: secondArg }
        : firstArg;
    const data = await authApi.login(payload);
    saveSession(data.token, data.expiresAt, data.user);
    toast.success(t('toasts.loginSuccess'));
    return data;
  };

  const register = async (firstArg, secondArg, thirdArg) => {
    const payload =
      typeof firstArg === 'string'
        ? { fullName: firstArg, email: secondArg, password: thirdArg }
        : firstArg;
    const data = await authApi.register(payload);
    saveSession(data.token, data.expiresAt, data.user);
    toast.success(t('toasts.registerSuccess'));
    return data;
  };

  const logout = () => {
    clearSession();
    toast.success(t('toasts.loggedOut'));
  };

  const value = {
    user,
    token,
    expiresAt,
    isLoading,
    isInitializing: isLoading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
