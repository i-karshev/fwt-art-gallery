import { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';

interface IThemeContext {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';

  const themeContextProviderValue = useMemo(
    () => ({
      isDarkTheme,
      toggleTheme,
    }),
    [isDarkTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextProviderValue}>{children}</ThemeContext.Provider>
  );
};
