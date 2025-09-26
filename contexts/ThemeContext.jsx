'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        // Load theme from localStorage on mount
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('theme', theme)
        
        // Apply theme to document root
        if (theme === 'light') {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isLight: theme === 'light',
        isDark: theme === 'dark'
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
