import { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { authLocalStorage } from '@/utils/auth/authLocalStorage';

interface IAuthContext {
  isAuth: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!authLocalStorage.get().accessToken);

  const onLogin = useCallback(() => {
    setIsAuth(true);
  }, []);

  const onLogout = useCallback(() => {
    authLocalStorage.remove();
    setIsAuth(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuth,
      onLogin,
      onLogout,
    }),
    [isAuth, onLogin, onLogout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
