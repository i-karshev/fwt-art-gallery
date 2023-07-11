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
import { DraggableCardGrid } from '@/components/ui/CardGrid/DraggableCardGrid';

import styles from './MianPage.module.scss';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  const { filters, changeFilters } = useContext(FilterContext);
  const params = { ...filters, genres: filters.genres?.split(',') };

  const {
    data: { data: artists = [], meta: { perPage, count } = {} as IArtistMetaResponse } = {},
    isLoading,
  } = artistApi.useFetchArtistsQuery({ isAuth, params });

  const isLoadMoreArtists = !!perPage && !!count && count > perPage;
  const isArtistNotFount = !artists?.length && (filters.genres || filters.name);

  const handleLoadMoreArtists = useCallback(
    () => changeFilters({ ...filters, perPage: String(isLoadMoreArtists ? perPage * 2 : perPage) }),
    [isLoadMoreArtists, perPage]
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const element = loaderRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && !isLoading && handleLoadMoreArtists(),
      { root: null, threshold: 0.5 }
    );

    observer.observe(element);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(element);
  }, [isLoadMoreArtists]);

  const artistCardGrid = artists?.length && (
    <DraggableCardGrid
      theme={theme}
      items={artists}
      renderItem={({ _id: id, name, yearsOfLife, mainPainting }) => (
        <ArtistCard
          key={id}
          id={id}
          name={name}
          yearsOfLife={yearsOfLife}
          image={mainPainting?.image}
        />
      )}
    />
  );

  const skeletonCardGrid = (
    <Container>
      <CardGrid>
        {Array.from({ length: 6 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={index} theme={theme} />
        ))}
      </CardGrid>
    </Container>
  );

  const cardGrid = artists?.length ? artistCardGrid : skeletonCardGrid;

  return (
    <main className={cx('main-page__content-wrapper')}>
      <Container>
        {isAuth && (
          <ActionBar
            className={cx('main-page__action-bar')}
            renderLeft={<ArtistAddButton theme={theme} />}
            renderRight={
              <>
                <Search theme={theme} className={cx('main-page__search')} />
                <FilterButton theme={theme} />
              </>
            }
          />
        )}

        {isArtistNotFount ? (
          <EmptySearchResult theme={theme} value={filters.name ? filters.name : 'genres'} />
        ) : (
          cardGrid
        )}

        {isLoadMoreArtists && <div ref={loaderRef} />}
      </Container>
    </main>
  );
};
