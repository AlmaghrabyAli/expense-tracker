import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import Button from '../ui/Button';
import { formatMoney, formatPeriodChange } from '../../utils/format';

export default function HeroBalanceCard({
  balance = 0,
  income = 0,
  expense = 0,
  periodChange = null,
  isLoading = false,
  onAddIncome,
  onAddExpense,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const changeInfo = formatPeriodChange(periodChange);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 p-6 shadow-sm backdrop-blur-md">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -start-16 h-48 w-48 rounded-full bg-teal-200/20 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        {/* Left / Balance Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <Wallet className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.netLiquidBalance')}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            {isLoading ? (
              <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
            ) : (
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {formatMoney(balance, lang)}
              </h1>
            )}

            {!isLoading && changeInfo && (
              <div
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  changeInfo.isPositive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {changeInfo.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span>{changeInfo.text}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  {t('dashboard.vsPrevious')}
                </span>
              </div>
            )}
          </div>

          {/* Quick mini totals */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[#047857]">
                <ArrowUpRight className="h-2.5 w-2.5" />
              </span>
              <span>{t('dashboard.totalIncome')}:</span>
              <span className="font-semibold text-[#047857]">
                {isLoading ? '...' : formatMoney(income, lang)}
              </span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-100 text-[#E11D48]">
                <ArrowDownRight className="h-2.5 w-2.5" />
              </span>
              <span>{t('dashboard.totalExpenses')}:</span>
              <span className="font-semibold text-[#E11D48]">
                {isLoading ? '...' : formatMoney(expense, lang)}
              </span>
            </div>
          </div>
        </div>

        {/* Right / Actions Column: balanced equal-width pair, no label wrap */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center">
          <Button
            type="button"
            variant="secondary"
            size="md"
            icon={Plus}
            onClick={onAddIncome}
            className="w-full sm:w-auto sm:flex-1 justify-center border-emerald-300 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-400"
          >
            {t('dashboard.addIncome')}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onAddExpense}
            className="w-full sm:w-auto sm:flex-1 justify-center shadow-sm"
          >
            {t('dashboard.addExpense')}
          </Button>
        </div>
      </div>
    </div>
  );
}
