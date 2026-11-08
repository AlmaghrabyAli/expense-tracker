import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitch } from '../ui/LanguageSwitch';
import { Logo } from '../ui/Logo';

export function Sidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/transactions', label: t('nav.transactions'), icon: Receipt },
    { to: '/categories', label: t('nav.categories'), icon: PieChart },
  ];

  const userInitials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <aside className="hidden xl:flex fixed top-0 bottom-0 start-0 w-[280px] z-30 flex-col justify-between p-6 sidebar-gradient shadow-[4px_0_24px_rgba(15,23,42,0.03)]">
      {/* Top: Brand Header & Exactly 3 Nav Items */}
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="px-2">
          <Logo variant="horizontal" size="md" />
        </div>

        {/* Navigation Links (Exactly 3: Dashboard, Transactions, Categories) */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#047857] to-[#0F766E] text-white shadow-md shadow-[#047857]/25'
                      : 'text-[#1E293B] hover:text-[#0F172A] hover:bg-white/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Language Pill, User Info & Logout */}
      <div className="flex flex-col gap-4 pt-6 border-t border-slate-200/50">
        {/* Language switcher pill */}
        <div className="flex justify-center">
          <LanguageSwitch />
        </div>

        {/* User Card */}
        <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-2xs flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#047857] to-[#0F766E] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">
                {user?.fullName || 'User'}
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                {user?.email || ''}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title={t('nav.logout')}
            aria-label={t('nav.logout')}
            className="p-2 text-slate-400 hover:text-[#E11D48] hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
