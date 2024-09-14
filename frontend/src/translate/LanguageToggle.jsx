import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageToggle = () => {
  const { switchLanguage } = useLanguage();

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>English</button>
      <button onClick={() => switchLanguage('fr')}>Français</button>
      <button onClick={() => switchLanguage('ar')}>العربية</button>
    </div>
  );
};

export default LanguageToggle;