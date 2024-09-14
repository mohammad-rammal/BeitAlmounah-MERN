// Modes.js

import React, { useState, useEffect } from 'react';
import '../../index.css';
import './styles.css';

const PanelModes = () => {
    const [customColors, setCustomColors] = useState(() => {
        const storedColors = localStorage.getItem('customColors');
        return storedColors ? JSON.parse(storedColors) : null;
    });

    const handleColorChange = (color, value) => {
        const updatedColors = { ...customColors, [color]: value };
        setCustomColors(updatedColors);
        localStorage.setItem('customColors', JSON.stringify(updatedColors));
    };

    useEffect(() => {
        applyCustomColors(customColors);
    }, [customColors]);

    const applyCustomColors = (colors) => {
        if (colors) {
            Object.entries(colors).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--${key}`, value);
            });
        }
    };

    return (
        <div className='panel'>
            <h1 className='clrpanel'> Color panel</h1>
            <ColorPicker className="bodyColor" color="main-color" label="Body " onChange={handleColorChange} />
            <ColorPicker className="headerColor" color="primary-color" label="Head " onChange={handleColorChange} />

        </div>
    );
};

const ColorPicker = ({ color, label, onChange }) => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(color) || '';
    });

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(color, newValue);
    };

    return (
        <div>
            <label htmlFor={color}>{label}</label>
            <input type="color" id={color} value={value} onChange={handleChange} />
        </div>
    );
};

export default PanelModes;
