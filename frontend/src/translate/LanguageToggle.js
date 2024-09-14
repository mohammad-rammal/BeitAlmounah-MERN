import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { FaLanguage } from 'react-icons/fa';
import arabicFlag from './arabic-language.png';
import englishFlag from './english-language.png';
import frenchFlag from './french-language.png';

const LanguageToggle = () => {
  const changeLanguage = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, []); // Run only once on component mount to load the saved language

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
    setIsOpen(false); // Close the language options after selection
    localStorage.setItem('language', lang); // Save the selected language in localStorage
  };

  return (
    <div className="flex justify-right mt-1">
      <div className="relative">
        <button
          className="flex items-center px-4 py-1 bg-green-400 text-white rounded hover:bg-green-600 focus:outline-none absolute z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaLanguage className="mr-2" /> Language
        </button>
        {isOpen && (
          <ul className=" bg-white border border-gray-200 py-1 mt-8 rounded w-32 absolute z-10">
            <li>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 focus:outline-none"
                onClick={() => handleChangeLanguage('en')}
              >
                <img style={{ width: "20px" }} src={englishFlag} alt="English" className="mr-2" /> English
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 focus:outline-none"
                onClick={() => handleChangeLanguage('fr')}
              >
                <img style={{ width: "20px" }} src={frenchFlag} alt="French" className="mr-2" /> French
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 focus:outline-none"
                onClick={() => handleChangeLanguage('ar')}
              >
                <img style={{ width: "20px" }} src={arabicFlag} alt="Arabic" className="mr-2" /> Arabic
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageToggle;
