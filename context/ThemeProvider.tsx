"use client"; // since this is a provider we will make it client component

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
    mode: string,
    // a function which accepts the mode as string and returns void
    setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState('');

    const handleThemeChange = () => {
        if (mode === 'dark') {
            setMode('light');
            document.documentElement.classList.add('light');
        } else {
            setMode('dark');
            document.documentElement.classList.add('dark');
        }
    };
    useEffect(() => {
        handleThemeChange();
    }, [mode])

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}