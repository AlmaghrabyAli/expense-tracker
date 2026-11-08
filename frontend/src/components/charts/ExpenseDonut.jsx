import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatMoney } from '../../utils/format';
import { getCategoryDisplayName } from '../../utils/categoryName';

export function ExpenseDonut({ data = [], total = 0, isLoading = false }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';

  const calculatedTotal =
    total || data.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);

  const chartData = (data || []).map((item) => ({
    ...item,
    displayName: getCategoryDisplayName(
      typeof item === 'object'
        ? { id: item.categoryId || item.id, name: item.categoryName || item.name, isDefault: item.isDefault }
        : item,
      lang
    ),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs font-sans text-start">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-bold">{item.displayName}</span>
          </div>
          <div className="text-slate-300 tabular-nums">
            {formatMoney(item.total, lang)}
          </div>
          <div className="text-emerald-400 font-bold mt-0.5">
            {Number(item.percentage || 0).toFixed(1)}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md h-full flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">
          {t('dashboard.categoryBreakdown')}
        </h3>
        <p className="text-xs text-slate-500">
          {t('dashboard.categorySubtitle')}
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-56 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      ) : !data || data.length === 0 || calculatedTotal === 0 ? (
        <div className="flex flex-col items-center justify-center h-56 text-center p-6 text-slate-400">
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center mb-3">
            <span className="text-xs font-bold text-slate-400">0%</span>
          </div>
          <p className="text-xs font-medium text-slate-500">{t('common.noData')}</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
          {/* Radial Donut Container */}
          <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="displayName"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={74}
                  paddingAngle={3}
                  cornerRadius={6}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#059669'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {t('dashboard.totalSpent')}
              </span>
              <span className="text-xs font-extrabold text-slate-900 mt-0.5 tabular-nums leading-tight">
                {formatMoney(calculatedTotal, lang)}
              </span>
            </div>
          </div>

          {/* Legend list */}
          <div className="flex-1 w-full flex flex-col gap-2 min-w-0">
            {chartData.slice(0, 5).map((item) => (
              <div
                key={item.categoryId || item.name}
                className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-slate-800 truncate">
                    {item.displayName}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 tabular-nums">
                  <span className="font-bold text-slate-900">
                    {formatMoney(item.total, lang)}
                  </span>
                  <span className="text-slate-400 font-medium text-[11px] min-w-[36px] text-end">
                    {Number(item.percentage || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseDonut;
