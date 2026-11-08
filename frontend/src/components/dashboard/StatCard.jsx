import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Percent } from 'lucide-react';
import { formatMoney, formatPeriodChange } from '../../utils/format';

export default function StatCard({
  type = 'income', // 'income' | 'expense' | 'burnRate'
  title,
  value,
  subtext,
  periodChange = null,
  isLoading = false,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const isIncome = type === 'income';
  const isExpense = type === 'expense';

  const changeInfo = formatPeriodChange(periodChange);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          {isLoading ? (
            <div className="h-7 w-28 animate-pulse rounded bg-slate-200 mt-1" />
          ) : (
            <div
              className="text-2xl font-bold tracking-tight"
              style={{
                color: isIncome ? '#047857' : isExpense ? '#E11D48' : '#0F172A',
              }}
            >
              {typeof value === 'number' ? formatMoney(value, lang) : value}
            </div>
          )}
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isIncome
              ? 'bg-emerald-50 text-emerald-700'
              : isExpense
              ? 'bg-rose-50 text-rose-700'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : isExpense ? (
            <ArrowDownRight className="h-5 w-5" />
          ) : (
            <Percent className="h-5 w-5" />
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        {changeInfo ? (
          <div
            className={`flex items-center gap-1 font-semibold ${
              changeInfo.isPositive
                ? isIncome
                  ? 'text-emerald-700'
                  : 'text-rose-700'
                : isIncome
                ? 'text-rose-700'
                : 'text-emerald-700'
            }`}
          >
            {changeInfo.isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{changeInfo.text}</span>
            <span className="text-[11px] font-normal text-slate-400">
              {t('dashboard.vsPrevious')}
            </span>
          </div>
        ) : (
          <span className="text-slate-500">{subtext || ''}</span>
        )}
      </div>
    </div>
  );
}
