import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronDown } from 'lucide-react';
import { PRESETS } from '../../utils/constants';
import { getPresetDates } from '../../utils/dates';

export default function DateRangeSelector({
  value = { preset: PRESETS.THIS_MONTH, fromDate: '', toDate: '' },
  onChange,
}) {
  const { t } = useTranslation();
  const [customOpen, setCustomOpen] = useState(value.preset === PRESETS.CUSTOM);
  const [customFrom, setCustomFrom] = useState(value.fromDate || '');
  const [customTo, setCustomTo] = useState(value.toDate || '');
  const [dateError, setDateError] = useState('');

  const options = [
    { key: PRESETS.THIS_MONTH, label: t('presets.thisMonth') },
    { key: PRESETS.LAST_30_DAYS, label: t('presets.last30Days') },
    { key: PRESETS.THIS_YEAR, label: t('presets.thisYear') },
    { key: PRESETS.CUSTOM, label: t('presets.custom') },
  ];

  const handleSelect = (key) => {
    if (key === PRESETS.CUSTOM) {
      setCustomOpen(true);
      const defaults = getPresetDates(PRESETS.THIS_MONTH);
      const nextFrom = customFrom || defaults.fromDate;
      const nextTo = customTo || defaults.toDate;
      setCustomFrom(nextFrom);
      setCustomTo(nextTo);
      onChange?.({
        preset: PRESETS.CUSTOM,
        fromDate: nextFrom,
        toDate: nextTo,
      });
      return;
    }

    setCustomOpen(false);
    setDateError('');
    const dates = getPresetDates(key);
    onChange?.({
      preset: key,
      fromDate: dates.fromDate,
      toDate: dates.toDate,
    });
  };

  const handleCustomApply = (e) => {
    e.preventDefault();
    if (customFrom && customTo && customFrom > customTo) {
      setDateError(t('validation.dateFromAfterTo', 'Start date cannot be after end date'));
      return;
    }
    setDateError('');
    onChange?.({
      preset: PRESETS.CUSTOM,
      fromDate: customFrom,
      toDate: customTo,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex flex-wrap items-center gap-1 rounded-xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-inner">
        {options.map((opt) => {
          const isActive = value.preset === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleSelect(opt.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {customOpen && (
        <form
          onSubmit={handleCustomApply}
          className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{t('presets.from')}:</span>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => {
                setCustomFrom(e.target.value);
                setDateError('');
              }}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>{t('presets.to')}:</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => {
                setCustomTo(e.target.value);
                setDateError('');
              }}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-800 transition whitespace-nowrap shrink-0"
          >
            {t('presets.apply')}
          </button>

          {dateError && (
            <p className="w-full text-xs text-rose-600 font-medium">{dateError}</p>
          )}
        </form>
      )}
    </div>
  );
}
