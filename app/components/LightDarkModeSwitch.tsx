"use client";

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import {useTheme} from "next-themes";
import { IconButton } from '@radix-ui/themes';

function LightDarkModeSwitch() {
    const { setTheme, theme } = useTheme()
    const [isDarkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        setDarkMode(theme == "dark")
    }, [])

    const toggleDarkMode = () => {
        if (isDarkMode) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <IconButton onClick={toggleDarkMode} variant={theme == "dark" ? "solid" : "ghost"}>
            {isDarkMode ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
        </IconButton>
    );
}

export default LightDarkModeSwitch