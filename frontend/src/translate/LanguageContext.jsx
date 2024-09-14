import React, { createContext, useState, useContext } from 'react';
import translations from './translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const translate = (key) => {
        return translations[language][key] || key; // Default to key if translation not found
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ translate, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslate = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslate must be used within a LanguageProvider');
    }
    return context.translate;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context.changeLanguage;
};
