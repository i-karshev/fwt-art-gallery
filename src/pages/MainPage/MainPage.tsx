import React, { useCallback, useContext, useEffect, useRef } from 'react';
import cn from 'classnames/bind';

import { IArtistMetaResponse } from '@/types/IArtist';
import { artistApi } from '@/api/features/artistApi';

import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';
import { FilterContext } from '@/context/FilterProvider';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { ArtistCard } from '@/components/ArtistCard';
import { Container } from '@/components/Container';
import { ActionBar } from '@/components/ActionBar';
import { ArtistAddButton } from '@/components/ArtistAddButton';
import { FilterButton } from '@/components/Filter/FilterButton';
import { Search } from '@/components/Search';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptySearchResult } from '@/components/ui/Empty/EmptySearchResult';

import styles from './MianPage.module.scss';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  const { filters, changeFilters } = useContext(FilterContext);

  const {
    data: { data: artists, meta: { perPage, count } = {} as IArtistMetaResponse } = {},
    isLoading,
  } = artistApi.useFetchArtistsQuery({ isAuth, params: filters });

  const isLoadMoreArtists = !!perPage && !!count && count > perPage;
  const isArtistNotFount = filters.name && !artists?.length;

  const handleLoadMoreArtists = useCallback(
    () => changeFilters({ ...filters, perPage: String(isLoadMoreArtists ? perPage * 2 : perPage) }),
    [isLoadMoreArtists, perPage]
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        handleLoadMoreArtists();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [perPage, count, isLoading]);

  const artistList = artists?.map(({ _id: id, name, yearsOfLife, mainPainting }) => (
    <ArtistCard
      key={id}
      id={id}
      name={name}
      yearsOfLife={yearsOfLife}
      image={mainPainting?.image}
    />
  ));

  const skeletonList = Array.from({ length: 6 }).map((_, id) => (
    // eslint-disable-next-line react/no-array-index-key
    <Skeleton key={id} isDarkTheme={isDarkTheme} />
  ));

  return (
    <main className={cx('main-page__content-wrapper')}>
      <Container>
        {isAuth && (
          <ActionBar
            className={cx('main-page__action-bar')}
            renderLeft={<ArtistAddButton isDarkTheme={isDarkTheme} />}
            renderRight={
              <>
                <Search isDarkTheme={isDarkTheme} className={cx('main-page__search')} />
                <FilterButton isDarkTheme={isDarkTheme} />
              </>
            }
          />
        )}

        {isArtistNotFount ? (
          <EmptySearchResult isDarkTheme={isDarkTheme} value={filters.name as string} />
        ) : (
          <CardGrid>{artists?.length ? artistList : skeletonList}</CardGrid>
        )}

        {isLoadMoreArtists && <div ref={loaderRef} />}
      </Container>
    </main>
  );
};
