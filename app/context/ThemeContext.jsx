"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  // Apply theme changes to HTML element and localStorage
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    
    // Update HTML class
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update CSS variables for theme colors
    if (isDark) {
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-start-rgb', '17, 24, 39');
      root.style.setProperty('--background-end-rgb', '11, 15, 25');
    } else {
      root.style.setProperty('--foreground-rgb', '17, 24, 39');
      root.style.setProperty('--background-start-rgb', '249, 250, 251');
      root.style.setProperty('--background-end-rgb', '243, 244, 246');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 