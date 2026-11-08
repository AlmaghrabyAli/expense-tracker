import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeft, Receipt, Plus } from 'lucide-react';
import { formatMoney, formatDate } from '../../utils/format';
import { getCategoryDisplayName, getCategoryInitial } from '../../utils/categoryName';

export default function RecentTransactions({
  transactions = [],
  isLoading = false,
  onAddTransaction,
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = i18n.language;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {t('dashboard.recentTransactions')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('dashboard.recentSubtitle')}
          </p>
        </div>

        <Link
          to="/transactions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition"
        >
          <span>{t('dashboard.viewAll')}</span>
          {isRTL ? (
            <ArrowLeft className="h-3.5 w-3.5" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" />
          )}
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                <div className="space-y-1">
                  <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))
        ) : !transactions || transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-2">
              <Receipt className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold text-slate-700">
              {t('transactions.emptyAllTitle')}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
              {t('transactions.emptyAllSubtitle')}
            </p>
            {onAddTransaction && (
              <button
                type="button"
                onClick={onAddTransaction}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#047857] to-[#0F766E] px-3.5 py-2 text-xs font-semibold text-white shadow hover:shadow-md transition whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{t('transactions.addTransaction')}</span>
              </button>
            )}
          </div>
        ) : (
          transactions.slice(0, 5).map((tx) => {
            const isIncome = tx.type === 'Income';
            const catObj = { id: tx.categoryId, name: tx.categoryName, isDefault: tx.categoryIsDefault };
            const catName = getCategoryDisplayName(catObj, lang);
            const initial = getCategoryInitial(catObj, lang);
            const color = tx.categoryColor || '#10B981';

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 transition hover:bg-slate-50/60 rounded-lg px-2 -mx-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Category visual: circle tinted with category color containing first letter */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                      border: `1.5px solid ${color}40`,
                    }}
                  >
                    {initial}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-800">
                      {tx.note || catName}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{catName}</span>
                      <span>•</span>
                      <span>{formatDate(tx.date, lang)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-end shrink-0 ps-3">
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: isIncome ? '#047857' : '#E11D48',
                    }}
                  >
                    {isIncome ? '+' : '-'} {formatMoney(tx.amount, lang)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
