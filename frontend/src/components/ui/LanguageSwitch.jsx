import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitch({ className = '' }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ar') ? 'ar' : 'en';

  const toggleLanguage = (newLang) => {
    if (newLang !== currentLang) {
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80 shadow-2xs select-none shrink-0 whitespace-nowrap ${className}`}
    >
      <button
        type="button"
        onClick={() => toggleLanguage('en')}
        aria-pressed={currentLang === 'en'}
        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-white text-[#047857] shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => toggleLanguage('ar')}
        aria-pressed={currentLang === 'ar'}
        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
          currentLang === 'ar'
            ? 'bg-white text-[#047857] shadow-xs'
            : 'text-slate-800 hover:text-slate-950 font-bold'
        }`}
      >
        عربي
      </button>
    </div>
  );
}

export default LanguageSwitch;
