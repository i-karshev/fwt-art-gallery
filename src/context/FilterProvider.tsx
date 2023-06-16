import { createContext, FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IArtistParams } from '@/types/IArtist';
import { useAppSelector } from '@/hooks/redux';

type Filters = IArtistParams & Record<string, string | string[]>;

interface IFilterContext {
  filters: Filters;
  changeFilters: (newFilters: Filters) => void;
  clearFilters: () => void;
  clearSearch: () => void;
}

interface IFilterProvider {
  children: ReactNode;
}

export const defaultFilters: Filters = {
  perPage: '6',
  pageNumber: '1',
};

export const FilterContext = createContext({} as IFilterContext);

export const FilterProvider: FC<IFilterProvider> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const [params, setParams] = useSearchParams({});
  const filters = useMemo(() => Object.fromEntries(params), [params]);

  useEffect(() => {
    if (isAuth && !params.toString() && window.location.pathname === '/') {
      setParams(defaultFilters);
    }
  });

  const changeFilters = useCallback((newFilters: Filters) => setParams(newFilters), [setParams]);
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
