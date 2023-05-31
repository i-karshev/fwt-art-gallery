import React, { useContext } from 'react';
import cn from 'classnames/bind';

import { IArtistMainResponse } from '@/types/IArtist';
import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAppSelector } from '@/hooks/redux';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { ArtistCard } from '@/components/ArtistCard';
import { Container } from '@/components/Container';
import { Preloader } from '@/components/ui/Preloader';

import styles from './MianPage.module.scss';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const fetchArtists = artistApi.useFetchArtistsQuery({}, { skip: !isAuth });
  const fetchArtistsStatic = artistApi.useFetchArtistsStaticQuery(null, { skip: isAuth });
  const { data = [], isLoading, isFetching } = isAuth ? fetchArtists : fetchArtistsStatic;
  const { data: artists } = data as IArtistMainResponse;

  if (isLoading || isFetching) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('content-wrapper')}>
      <Container>
        <CardGrid>
          {artists &&
            artists.map(({ id, name, yearsOfLife, image }) => (
              <ArtistCard key={id} id={id} name={name} yearsOfLife={yearsOfLife} image={image} />
            ))}
        </CardGrid>
      </Container>
    </main>
  );
};
