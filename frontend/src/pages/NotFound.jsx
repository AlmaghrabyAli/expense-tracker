import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <PublicLayout>
      <div className="w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white/85 p-6 sm:p-9 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5 backdrop-blur-xl animate-auth-fade-up">
        <div className="mb-4 inline-flex items-center justify-center">
          <span className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t('errors.pageNotFound')}
        </h1>

        <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          {t('errors.pageNotFoundDesc')}
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#047857] to-[#0F766E] hover:from-[#065F46] hover:to-[#115E59] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#047857]/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 w-full transition whitespace-nowrap min-h-[44px]"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">{t('errors.backToDashboard')}</span>
            {isRTL ? (
              <ArrowLeft className="h-4 w-4 shrink-0" />
            ) : (
              <ArrowRight className="h-4 w-4 shrink-0" />
            )}
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
