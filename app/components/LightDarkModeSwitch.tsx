"use client";

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import {useTheme} from "next-themes";

function LightDarkModeSwitch() {
    const [isDarkMode, setDarkMode] = useState(false);
    const { theme, setTheme } = useTheme()

    const toggleDarkMode = () => {
        if (isDarkMode) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <button onClick={toggleDarkMode}>
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </button>
    );
}

export default LightDarkModeSwitch