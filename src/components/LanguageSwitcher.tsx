import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isGodMode = localStorage.getItem('godMode') === 'true';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors text-sm font-medium cursor-pointer ${
        isGodMode 
          ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
      }`}
      title={i18n.language === 'en' ? 'Switch to Bengali' : 'Switch to English'}
    >
      <Languages className={`size-4 ${isGodMode ? 'text-bright-green' : ''}`} />
      <span>{i18n.language === 'en' ? 'BN' : 'EN'}</span>
    </button>
  );
}
