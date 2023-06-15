import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { IGenre } from '@/types/IGenre';
import { IArtistParams } from '@/types/IArtist';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { setStyleIsToggleModal } from '@/utils/setStyleIsToggleModal';

import { FilterSort, TSort } from '@/components/FilterSort';
import { FilterGenres } from '@/components/FilterGenres';
import { FilterAccordion } from '@/components/FilterAccordion';
import { Button } from '@/components/ui/Button';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './FilterSidebar.module.scss';

const cx = cn.bind(styles);

const artistsGenres = [
  {
    _id: '64761911c25ef9fb3e0cdad9',
    name: 'Realism',
  },
  {
    _id: '64761912c25ef9fb3e0cdaed',
    name: 'Modernism',
  },
  {
    _id: '64761912c25ef9fb3e0cdaef',
    name: 'Expressionism',
  },
  {
    _id: '64761912c25ef9fb3e0cdaf1',
    name: 'Cubism',
  },
  {
    _id: '64761912c25ef9fb3e0cdaf3',
    name: 'Art Deco',
  },
  {
    _id: '64761912c25ef9fb3e0cdaf5',
    name: 'Avant-garde',
  },
  {
    _id: '64761912c25ef9fb3e0cdaf7',
    name: 'Baroque',
  },
];

export type TFilter = IArtistParams & Record<string, string | string[]>;

export const defaultFilterValues: TFilter = {
  perPage: '6',
  pageNumber: '1',
};

interface FilterSidebarProps {
  isDarkTheme: boolean;
  isShowSidebar: boolean;
  onCloseSidebar: () => void;
  genres: IGenre[];
}

export const FilterSidebar: FC<FilterSidebarProps> = ({
  isDarkTheme,
  isShowSidebar,
  onCloseSidebar,
  genres,
}) => {
  const bodyRef = useRef(document.body);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [params, setParams] = useSearchParams({});

  const [selectedGenres, setSelectedGenres] = useState(params.get('genres')?.split(',') || []);
  const [selectedSort, setSelectedSort] = useState(params.get('orderBy') as TSort);

  const handleChangeGenres = useCallback((items: string[]) => setSelectedGenres(items), []);
  const handleChangeSort = useCallback((sort: TSort) => setSelectedSort(sort), []);

  const handleShowFilterResults = useCallback(() => {
    const filterGenres = selectedGenres.length && { genres: selectedGenres.toString() };
    const filterSort = selectedSort && { sortBy: 'name', orderBy: selectedSort };
    const filterValues = { ...defaultFilterValues, ...filterGenres, ...filterSort };

    setParams(filterValues);
    onCloseSidebar();
  }, [selectedGenres, selectedSort]);

  const handleClearFilter = useCallback(() => {
    setParams(defaultFilterValues);
    setSelectedGenres([]);
    setSelectedSort(null);
  }, []);

  // TODO: написать общий кастомный хук, для модалки и сайдбара в отдельном mr
  useEffect(() => {
    if (isShowSidebar) {
      const scrollWidth = window.innerWidth - document.documentElement.offsetWidth;
      setStyleIsToggleModal(bodyRef, 'hidden', `${scrollWidth}px`, isDarkTheme);
    }

    return () => {
      setStyleIsToggleModal(bodyRef, 'scroll', '', isDarkTheme);
    };
  }, [isShowSidebar]);

  useOutsideClick(sidebarRef, onCloseSidebar);

  return (
    <div
      ref={sidebarRef}
      className={cx('filter-sidebar', {
        'filter-sidebar_dark': isDarkTheme,
        'filter-sidebar_show': isShowSidebar,
      })}
    >
      <div className={cx('filter-sidebar__content')}>
        <FilterAccordion isDarkTheme={isDarkTheme} title="Genres">
          <FilterGenres
            isDarkTheme={isDarkTheme}
            genres={artistsGenres}
            selected={selectedGenres}
            onChange={handleChangeGenres}
          />
        </FilterAccordion>

        <FilterAccordion isDarkTheme={isDarkTheme} title="Sort by">
          <FilterSort
            isDarkTheme={isDarkTheme}
            selected={selectedSort}
            onChange={handleChangeSort}
          />
        </FilterAccordion>
      </div>

      <div className={cx('filter-sidebar__buttons')}>
        <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleShowFilterResults}>
          Show the results
        </Button>
        <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>

      <button type="button" className={cx('filter-sidebar__close-btn')} onClick={onCloseSidebar}>
        <CloseIcon />
      </button>
    </div>
  );
};
