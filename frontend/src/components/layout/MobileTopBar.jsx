import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitch } from '../ui/LanguageSwitch';
import { Logo } from '../ui/Logo';

export function MobileTopBar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const userInitials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <header className="md:hidden fixed top-0 start-0 end-0 h-16 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 px-4 flex items-center justify-between shadow-2xs">
      {/* Brand logo & name */}
      <div className="flex items-center">
        <Logo variant="horizontal" size="sm" />
      </div>

      {/* Language Switcher & Avatar Menu */}
      <div className="flex items-center gap-2">
        <LanguageSwitch />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="User menu"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#047857] to-[#0F766E] text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-2xs"
          >
            {userInitials}
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute end-0 top-10 z-50 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 text-start">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.fullName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                  }}
                  className="w-full mt-1 px-3 py-2 text-xs font-semibold text-[#E11D48] hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
