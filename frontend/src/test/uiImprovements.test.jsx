import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { Plus } from 'lucide-react';

let currentLang = 'en';

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => {
        if (key === 'app.name') {
          return currentLang === 'ar' ? 'متابع المصاريف' : 'Expense Tracker';
        }
        if (key === 'auth.welcomeBack') return 'Welcome back';
        if (key === 'auth.loginSubtitle') return 'Enter credentials';
        if (key === 'auth.email') return 'Email address';
        if (key === 'auth.password') return 'Password';
        if (key === 'auth.signIn') return 'Sign in';
        if (key === 'auth.dontHaveAccount') return "Don't have an account?";
        if (key === 'auth.createOne') return 'Create one';
        if (typeof fallback === 'string') return fallback;
        return key;
      },
      i18n: {
        get language() {
          return currentLang;
        },
        dir: () => (currentLang === 'ar' ? 'rtl' : 'ltr'),
        changeLanguage: (lng) => {
          currentLang = lng;
        },
      },
    }),
  };
});

describe('UI Improvements - Logo, Button & Auth Suite', () => {
  describe('Logo Component', () => {
    it('renders with accessibility role and aria-label', () => {
      currentLang = 'en';
      render(<Logo variant="horizontal" />);
      const logoEl = screen.getByRole('img', { name: 'Expense Tracker' });
      expect(logoEl).toBeInTheDocument();
      expect(screen.getByText('Expense')).toBeInTheDocument();
      expect(screen.getByText('Tracker')).toBeInTheDocument();
    });

    it('shows Arabic wordmark when language is ar', () => {
      currentLang = 'ar';
      render(<Logo variant="horizontal" />);
      const logoEl = screen.getByRole('img', { name: 'متابع المصاريف' });
      expect(logoEl).toBeInTheDocument();
      expect(screen.getByText('متابع المصاريف')).toBeInTheDocument();
    });

    it('generates unique gradient IDs across multiple logo instances', () => {
      currentLang = 'en';
      const { container } = render(
        <div>
          <Logo variant="mark" />
          <Logo variant="mark" />
        </div>
      );
      const linearGradients = container.querySelectorAll('linearGradient[id^="et-logo-grad-"]');
      expect(linearGradients.length).toBe(2);
      expect(linearGradients[0].id).not.toBe(linearGradients[1].id);
    });
  });

  describe('Button Component', () => {
    it('renders label and icon with whitespace-nowrap and prevents wrapping', () => {
      render(
        <Button variant="primary" size="md" icon={Plus}>
          Add Transaction
        </Button>
      );
      const btn = screen.getByRole('button', { name: /add transaction/i });
      expect(btn).toHaveClass('whitespace-nowrap');
      expect(btn).toHaveClass('min-h-[44px]');
      expect(btn).toHaveClass('inline-flex');
      expect(btn).toHaveClass('items-center');

      const labelSpan = btn.querySelector('span');
      expect(labelSpan).toHaveClass('whitespace-nowrap');
    });
  });

  describe('Login Page Rendering', () => {
    it('renders all fields, buttons, and links properly in the single-column shell', () => {
      currentLang = 'en';
      const authValue = {
        login: vi.fn(),
        isAuthenticated: false,
        isInitializing: false,
        user: null,
      };

      render(
        <AuthContext.Provider value={authValue}>
          <MemoryRouter initialEntries={['/login']}>
            <Login />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      // Welcome header & card branding
      expect(screen.getByText('Welcome back')).toBeInTheDocument();

      // Form inputs
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();

      // Submit button
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

      // Navigation link to register
      const registerLink = screen.getByRole('link', { name: /create one/i });
      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });
});
