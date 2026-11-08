import React from 'react';
import { Check } from 'lucide-react';
import { PRESET_COLORS } from '../../utils/constants';

export function ColorPicker({
  value = '#059669',
  onChange,
  initial = 'C',
  error,
}) {
  const handleHexChange = (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) {
      val = `#${val}`;
    }
    onChange(val);
  };

  const isPresetSelected = (hex) => value.toLowerCase() === hex.toLowerCase();

  return (
    <div className="flex flex-col gap-2">
      {/* Preset Swatches */}
      <div className="flex items-center gap-1.5 flex-wrap p-2 bg-slate-50 border border-slate-200/80 rounded-xl">
        {PRESET_COLORS.map((hex) => {
          const selected = isPresetSelected(hex);
          return (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              aria-label={`Select color ${hex}`}
              style={{ backgroundColor: hex }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform cursor-pointer shadow-2xs ${
                selected ? 'scale-110 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-105'
              }`}
            >
              {selected && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
            </button>
          );
        })}
      </div>

      {/* Hex input + Live Initial Preview */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs">
          <div
            className="w-5 h-5 rounded-md shrink-0 shadow-2xs border border-black/10"
            style={{ backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#059669' }}
          />
          <input
            type="text"
            value={value}
            onChange={handleHexChange}
            maxLength={7}
            placeholder="#RRGGBB"
            className="w-full text-xs font-mono font-semibold uppercase text-slate-800 outline-none"
          />
        </div>

        {/* Live initial preview circle */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-2xs transition-colors"
            style={{ backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#059669' }}
          >
            {initial}
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Preview</span>
        </div>
      </div>

      {error && <p className="text-xs text-[#E11D48] mt-0.5">{error}</p>}
    </div>
  );
}

export default ColorPicker;
