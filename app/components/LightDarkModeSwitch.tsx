"use client";

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import {useTheme} from "next-themes";

function LightDarkModeSwitch() {
    const { setTheme, theme } = useTheme()
    const [isDarkMode, setDarkMode] = useState(theme === "dark");
    

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