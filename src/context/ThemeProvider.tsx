import { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const localTheme = localStorage.getItem('theme') || 'light';
  const [theme, setIsDarkTheme] = useState(localTheme as Theme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setIsDarkTheme(newTheme as Theme);
    localStorage.setItem('theme', newTheme);
  }, [setIsDarkTheme, theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
