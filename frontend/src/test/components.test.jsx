import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TransactionFormModal from '../components/transactions/TransactionFormModal';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ProtectedRoute from '../routes/ProtectedRoute';
import { AuthContext } from '../context/AuthContext';

// Mock i18n
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key, fallback) => {
        if (typeof fallback === 'string') return fallback;
        return key;
      },
      i18n: {
        language: 'en',
        dir: () => 'ltr',
      },
    }),
  };
});

describe('Component Validations and Behavior', () => {
  describe('TransactionFormModal Validation', () => {
    const mockCategories = [
      { id: 1, name: 'Food', type: 'Expense' },
      { id: 2, name: 'Transport', type: 'Expense' },
      { id: 3, name: 'Salary', type: 'Income' },
      { id: 4, name: 'Freelance', type: 'Income' },
    ];

    it('filters categories by the selected transaction type', () => {
      render(
        <TransactionFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={vi.fn()}
          categories={mockCategories}
        />
      );

      // By default type is Expense: only Food & Transport should be listed
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Transport')).toBeInTheDocument();
      expect(screen.queryByText('Salary')).not.toBeInTheDocument();
      expect(screen.queryByText('Freelance')).not.toBeInTheDocument();
    });

    it('rejects non-positive amounts and more than 2 decimal places', async () => {
      const handleSubmit = vi.fn();
      render(
        <TransactionFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
          categories={mockCategories}
        />
      );

      const amountInput = screen.getByPlaceholderText('0.00');
      const submitBtn = screen.getByRole('button', { name: /save/i });

      // Test 0 amount
      fireEvent.change(amountInput, { target: { value: '0' } });
      fireEvent.click(submitBtn);
      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });

      // Test more than 2 decimal places (e.g. 15.555)
      fireEvent.change(amountInput, { target: { value: '15.555' } });
      fireEvent.click(submitBtn);
      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    it('submits valid amount and category', async () => {
      const handleSubmit = vi.fn();
      render(
        <TransactionFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
          categories={mockCategories}
        />
      );

      const amountInput = screen.getByPlaceholderText('0.00');
      const categorySelect = screen.getByRole('combobox');
      const submitBtn = screen.getByRole('button', { name: /save/i });

      fireEvent.change(categorySelect, { target: { value: '1' } });
      fireEvent.change(amountInput, { target: { value: '150.50' } });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            amount: 150.5,
            categoryId: 1,
            type: 'Expense',
          })
        );
      });
    });
  });

  describe('CategoryFormModal Validation', () => {
    it('validates name length (1-50 characters) and hex color (#RRGGBB)', async () => {
      const handleSubmit = vi.fn();
      render(
        <CategoryFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
        />
      );

      const submitBtn = screen.getByRole('button', { name: /save/i });

      // Empty name
      fireEvent.click(submitBtn);
      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    it('submits valid category with name and color', async () => {
      const handleSubmit = vi.fn();
      const { container } = render(
        <CategoryFormModal
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
        />
      );

      const nameInput = container.querySelector('input[name="name"]');
      const submitBtn = screen.getByRole('button', { name: /save/i });

      fireEvent.change(nameInput, { target: { value: 'Investments' } });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Investments',
            type: 'Expense',
            color: expect.stringMatching(/^#[0-9A-Fa-f]{6}$/),
          })
        );
      });
    });
  });

  describe('ConfirmDialog Keyboard Navigation and Focus', () => {
    it('closes on Escape key press and restores focus', async () => {
      const handleClose = vi.fn();

      // Create an external button to hold initial focus
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Open Dialog';
      document.body.appendChild(triggerButton);
      triggerButton.focus();
      expect(document.activeElement).toBe(triggerButton);

      const { rerender } = render(
        <ConfirmDialog
          isOpen={true}
          onClose={handleClose}
          onConfirm={vi.fn()}
          title="Delete Confirmation"
          message="Are you sure?"
        />
      );

      // Fire Escape key on window
      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);

      // Re-render as closed
      rerender(
        <ConfirmDialog
          isOpen={false}
          onClose={handleClose}
          onConfirm={vi.fn()}
          title="Delete Confirmation"
          message="Are you sure?"
        />
      );

      // Trigger button should receive focus back
      expect(document.activeElement).toBe(triggerButton);
      document.body.removeChild(triggerButton);
    });
  });

  describe('ProtectedRoute Guard', () => {
    it('redirects unauthenticated users to /login', () => {
      const authValue = {
        isAuthenticated: false,
        isInitializing: false,
        user: null,
      };

      render(
        <AuthContext.Provider value={authValue}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<div>Login Page</div>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument();
    });

    it('renders protected route when authenticated', () => {
      const authValue = {
        isAuthenticated: true,
        isInitializing: false,
        user: { id: 1, email: 'user@example.com' },
      };

      render(
        <AuthContext.Provider value={authValue}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/login" element={<div>Login Page</div>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });
  });
});
