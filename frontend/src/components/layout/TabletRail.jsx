import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitch } from '../ui/LanguageSwitch';
import { Logo } from '../ui/Logo';

export function TabletRail() {
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
    <aside className="hidden md:flex xl:hidden fixed top-0 bottom-0 start-0 w-[80px] z-30 flex-col justify-between items-center py-6 sidebar-gradient shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
      {/* Brand Icon */}
      <div className="flex flex-col items-center gap-6">
        <Logo variant="mark" size={38} />

        {/* Exactly 3 Navigation Icons */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                title={item.label}
                aria-label={item.label}
                className={({ isActive }) =>
                  `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#047857] to-[#0F766E] text-white shadow-md shadow-[#047857]/25'
                      : 'text-[#1E293B] hover:text-[#0F172A] hover:bg-white/60'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Icons: Language & User */}
      <div className="flex flex-col items-center gap-4">
        <LanguageSwitch className="scale-90" />

        <div
          title={user?.fullName || 'User'}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#047857] to-[#0F766E] text-white font-bold text-xs flex items-center justify-center shadow-xs"
        >
          {userInitials}
        </div>

        <button
          type="button"
          onClick={logout}
          title={t('nav.logout')}
          aria-label={t('nav.logout')}
          className="p-2.5 text-slate-400 hover:text-[#E11D48] hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
