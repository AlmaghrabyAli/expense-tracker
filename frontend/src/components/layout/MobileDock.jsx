import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function MobileDock({ onAddClick }) {
  const { t } = useTranslation();

  return (
    <div className="md:hidden fixed bottom-3 start-3 end-3 z-30 pointer-events-none">
      <nav
        aria-label="Mobile Navigation"
        className="pointer-events-auto max-w-sm mx-auto bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-full px-3 py-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] flex items-center justify-around"
      >
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          aria-label={t('nav.dashboard')}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-full transition-colors min-w-[52px] ${
              isActive ? 'text-[#047857] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">{t('nav.dashboard')}</span>
        </NavLink>

        {/* Transactions */}
        <NavLink
          to="/transactions"
          aria-label={t('nav.transactions')}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-full transition-colors min-w-[52px] ${
              isActive ? 'text-[#047857] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Receipt className="w-5 h-5 shrink-0" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">{t('nav.transactions')}</span>
        </NavLink>

        {/* Center Round Add Button */}
        <div className="relative -top-3 px-1 shrink-0">
          <button
            type="button"
            onClick={onAddClick}
            aria-label={t('transactions.addTransaction')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#047857] to-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-[#047857]/35 hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
          >
            <Plus className="w-6 h-6 shrink-0" />
          </button>
        </div>

        {/* Categories */}
        <NavLink
          to="/categories"
          aria-label={t('nav.categories')}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-full transition-colors min-w-[52px] ${
              isActive ? 'text-[#047857] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <PieChart className="w-5 h-5 shrink-0" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">{t('nav.categories')}</span>
        </NavLink>
      </nav>
    </div>
  );
}
