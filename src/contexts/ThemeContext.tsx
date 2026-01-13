import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorTheme = 'green' | 'blue' | 'purple' | 'orange' | 'pink';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ColorTheme, {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
  healthcareTeal: string;
  healthcareTealLight: string;
  healthcareGreen: string;
  gradientCalm: string;
  shadowSoft: string;
}> = {
  green: {
    primary: '116 97% 62%',
    secondary: '116 90% 75%',
    accent: '116 85% 85%',
    muted: '116 15% 95%',
    border: '116 20% 90%',
    healthcareTeal: '116 97% 62%',
    healthcareTealLight: '116 90% 75%',
    healthcareGreen: '116 85% 60%',
    gradientCalm: 'linear-gradient(135deg, hsl(116 97% 62% / 0.25), hsl(116 90% 75% / 0.18))',
    shadowSoft: '0 4px 20px -2px hsl(116 97% 62% / 0.2)',
  },
  blue: {
    primary: '210 95% 58%',
    secondary: '210 90% 70%',
    accent: '210 85% 85%',
    muted: '210 15% 95%',
    border: '210 20% 90%',
    healthcareTeal: '210 95% 58%',
    healthcareTealLight: '210 90% 70%',
    healthcareGreen: '210 85% 60%',
    gradientCalm: 'linear-gradient(135deg, hsl(210 95% 58% / 0.25), hsl(210 90% 70% / 0.18))',
    shadowSoft: '0 4px 20px -2px hsl(210 95% 58% / 0.2)',
  },
  purple: {
    primary: '270 95% 65%',
    secondary: '270 90% 75%',
    accent: '270 85% 85%',
    muted: '270 15% 95%',
    border: '270 20% 90%',
    healthcareTeal: '270 95% 65%',
    healthcareTealLight: '270 90% 75%',
    healthcareGreen: '270 85% 60%',
    gradientCalm: 'linear-gradient(135deg, hsl(270 95% 65% / 0.25), hsl(270 90% 75% / 0.18))',
    shadowSoft: '0 4px 20px -2px hsl(270 95% 65% / 0.2)',
  },
  orange: {
    primary: '30 95% 58%',
    secondary: '30 90% 70%',
    accent: '30 85% 85%',
    muted: '30 15% 95%',
    border: '30 20% 90%',
    healthcareTeal: '30 95% 58%',
    healthcareTealLight: '30 90% 70%',
    healthcareGreen: '30 85% 60%',
    gradientCalm: 'linear-gradient(135deg, hsl(30 95% 58% / 0.25), hsl(30 90% 70% / 0.18))',
    shadowSoft: '0 4px 20px -2px hsl(30 95% 58% / 0.2)',
  },
  pink: {
    primary: '330 95% 65%',
    secondary: '330 90% 75%',
    accent: '330 85% 85%',
    muted: '330 15% 95%',
    border: '330 20% 90%',
    healthcareTeal: '330 95% 65%',
    healthcareTealLight: '330 90% 75%',
    healthcareGreen: '330 85% 60%',
    gradientCalm: 'linear-gradient(135deg, hsl(330 95% 65% / 0.25), hsl(330 90% 75% / 0.18))',
    shadowSoft: '0 4px 20px -2px hsl(330 95% 65% / 0.2)',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('colorTheme');
    return (saved as ColorTheme) || 'green';
  });

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    
    const colors = themeColors[colorTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--input', colors.border);
    root.style.setProperty('--ring', colors.primary);
    root.style.setProperty('--healthcare-teal', colors.healthcareTeal);
    root.style.setProperty('--healthcare-teal-light', colors.healthcareTealLight);
    root.style.setProperty('--healthcare-green', colors.healthcareGreen);
    root.style.setProperty('--gradient-calm', colors.gradientCalm);
    root.style.setProperty('--shadow-soft', colors.shadowSoft);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
