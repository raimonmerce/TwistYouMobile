// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightColors, darkColors } from '../../styles/theme';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
