import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames/bind';

import { defaultFilters, FilterContext, Filters } from '@/context/FilterProvider';
import { genreApi } from '@/api/features/genreApi';
import { artistApi } from '@/api/features/artistApi';

import { FilterSort, TSort } from '@/components/Filter/FilterSort';
import { FilterGenres } from '@/components/Filter/FilterGenres';
import { FilterAccordion } from '@/components/Filter/FilterAccordion';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/Button';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './FilterSidebar.module.scss';

const cx = cn.bind(styles);

interface FilterSidebarProps {
  theme: string;
  isShowSidebar: boolean;
  onCloseSidebar: () => void;
}

export const FilterSidebar: FC<FilterSidebarProps> = ({ theme, isShowSidebar, onCloseSidebar }) => {
  const { filters, changeFilters, clearFilters } = useContext(FilterContext);

  const [selectedGenres, setSelectedGenres] = useState(filters.genres?.split(',') || []);
  const [selectedSort, setSelectedSort] = useState(filters.orderBy as TSort);

  const handleChangeGenres = useCallback((items: string[]) => setSelectedGenres(items), []);
  const handleChangeSort = useCallback((sort: TSort) => setSelectedSort(sort), []);

  useEffect(() => {
    if (!filters.genres) setSelectedGenres([]);
    if (!filters.orderBy) setSelectedSort(null);
  }, [filters]);

  const handleShowFilterResults = useCallback(() => {
    changeFilters({
      ...defaultFilters,
      name: filters.name,
      genres: selectedGenres.toString(),
      sortBy: 'name',
      orderBy: selectedSort,
    } as Filters);

    onCloseSidebar();
  }, [selectedGenres, selectedSort, filters.name]);

  const handleClearFilter = useCallback(() => {
    clearFilters();
    setSelectedGenres([]);
    setSelectedSort(null);
  }, []);

  const { data: genresData = [] } = genreApi.useFetchGenresQuery(null);
  const { data: { data: artistsData = [] } = {} } = artistApi.useFetchArtistsQuery({
    isAuth: false,
    params: {},
  });

  const artistGenres = useMemo(() => {
    const genres = artistsData?.map((artist) => artist.genres).flat();
    return genresData.filter((genre) => genres?.includes(genre._id));
  }, [genresData, artistsData]);

  return (
    <Sidebar theme={theme} isShow={isShowSidebar} onClose={onCloseSidebar}>
      <div className={cx('filter-sidebar', `filter-sidebar_${theme}`)}>
        <div className={cx('filter-sidebar__content')}>
          <FilterAccordion theme={theme} title="Genres">
            <FilterGenres
              theme={theme}
              genres={artistGenres}
              selected={selectedGenres}
              onChange={handleChangeGenres}
            />
          </FilterAccordion>

          <FilterAccordion theme={theme} title="Sort by">
            <FilterSort theme={theme} selected={selectedSort} onChange={handleChangeSort} />
          </FilterAccordion>
        </div>

        <div className={cx('filter-sidebar__buttons')}>
          <Button theme={theme} variant="text" onClick={handleShowFilterResults}>
            Show the results
          </Button>
          <Button theme={theme} variant="text" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>

        <button type="button" className={cx('filter-sidebar__close-btn')} onClick={onCloseSidebar}>
          <CloseIcon />
        </button>
      </div>
    </Sidebar>
  );
};
