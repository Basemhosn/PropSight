import { useState, useEffect } from 'react';

const THEMES = {
  dark: {
    bg: '#060E1A',
    bgAlt: '#070E1B',
    surface: '#0D1929',
    surfaceElevated: '#0F1F35',
    border: 'rgba(255,255,255,0.08)',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textFaint: '#1E3A5F',
    accent: '#38BDF8',
  },
  light: {
    bg: '#F8FAFC',
    bgAlt: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F9',
    border: 'rgba(15,23,42,0.08)',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textFaint: '#CBD5E1',
    accent: '#0284C7',
  },
};

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const colors = THEMES[theme] || THEMES.dark;

  return { theme, toggleTheme, colors };
}
