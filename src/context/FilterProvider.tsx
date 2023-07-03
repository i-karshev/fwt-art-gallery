import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { IArtistParams } from '@/types/IArtist';
import { AuthContext } from '@/context/AuthProvider';
import { removeEmpty } from '@/utils/removeEmpty';

export type Filters = { genres?: string } & Omit<IArtistParams, 'genres'> &
  Record<string, string | string[]>;

export const defaultFilters: Filters = {
  perPage: '6',
  pageNumber: '1',
};

interface IFilterContext {
  filters: Filters;
  changeFilters: (newFilters: Filters) => void;
  clearFilters: () => void;
  clearSearch: () => void;
}

export const FilterContext = createContext({} as IFilterContext);

interface IFilterProvider {
  children: ReactNode;
}

export const FilterProvider: FC<IFilterProvider> = ({ children }) => {
  const isAuth = useContext(AuthContext);
  const [params, setParams] = useSearchParams({});
  const filters = useMemo(() => Object.fromEntries(params), [params]);

  useLayoutEffect(() => {
    if (isAuth && !params.toString() && window.location.pathname === '/') {
      setParams(defaultFilters);
    }
  });

  const changeFilters = useCallback(
    (newFilters: Filters) => setParams(removeEmpty(newFilters)),
    [setParams]
  );
  const clearFilters = useCallback(() => setParams(defaultFilters), [setParams]);
  const clearSearch = useCallback(() => {
    params.delete('name');
    setParams(params);
  }, [setParams]);

  const contextValue = useMemo(
    () =>
      ({
        filters,
        changeFilters,
        clearFilters,
        clearSearch,
      } as IFilterContext),
    [filters, changeFilters, clearFilters, clearSearch]
  );

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
};
