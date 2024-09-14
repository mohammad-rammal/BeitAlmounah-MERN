// Modes.js

import React, { useState, useEffect } from 'react';
import '../../index.css';
import './styles.css'; 
import { useTranslate } from "../../translate/LanguageContext";


const Modes = () => {

    const translate = useTranslate();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;

            localStorage.setItem('darkMode', JSON.stringify(newMode));

            return newMode;
        });

        document.documentElement.classList.toggle('dark-mode');
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <div>
            <button className="dark-mode-button" onClick={toggleDarkMode}>
                {isDarkMode ? translate('light_mode') : translate('dark_mode')}
            </button>
        </div>
    );
    
};

export default Modes;
