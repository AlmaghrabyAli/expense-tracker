import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { formatMoney } from '../../utils/format';

/**
 * Custom Tooltip for Monthly Cashflow
 */
function CustomTooltip({ active, payload, label, language }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md">
      <div className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </div>
      <div className="space-y-1.5 text-xs">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span
              className="font-semibold"
              style={{
                color: item.dataKey === 'income' ? '#047857' : '#E11D48',
              }}
            >
              {formatMoney(item.value, language)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MonthlyBars({ data = [], year = new Date().getFullYear(), isLoading = false }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const chartData = React.useMemo(() => {
    // Fill all 12 months if partial
    const map = new Map();
    (data || []).forEach((item) => {
      map.set(Number(item.month), item);
    });

    const months = [];
    for (let m = 1; m <= 12; m++) {
      const entry = map.get(m) || { month: m, income: 0, expense: 0 };
      months.push({
        month: m,
        name: t(`months.${m}`, String(m)),
        income: Number(entry.income) || 0,
        expense: Number(entry.expense) || 0,
      });
    }
    return months;
  }, [data, t]);

  const hasAnyData = React.useMemo(() => {
    return chartData.some((d) => d.income > 0 || d.expense > 0);
  }, [chartData]);

  return (
    <div className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {t('dashboard.cashflowTrend')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('dashboard.cashflowSubtitle', { year })}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#10B981]" />
            {t('dashboard.income')}
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#F43F5E]" />
            {t('dashboard.expense')}
          </span>
        </div>
      </div>

      <div className="relative h-64 w-full">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
        ) : !hasAnyData ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-slate-500">
              {t('common.noData')}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {t('dashboard.subtitle')}
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barGap={3}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                tickFormatter={(val) => {
                  if (val >= 1000) return `${Math.round(val / 1000)}k`;
                  return val;
                }}
                orientation={isRTL ? 'right' : 'left'}
              />
              <Tooltip
                content={<CustomTooltip language={i18n.language} />}
                cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
              />
              <Bar
                dataKey="income"
                name={t('dashboard.income')}
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                maxBarSize={16}
              />
              <Bar
                dataKey="expense"
                name={t('dashboard.expense')}
                fill="#F43F5E"
                radius={[4, 4, 0, 0]}
                maxBarSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
