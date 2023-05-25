import React, { useContext, useMemo } from 'react';
import cn from 'classnames/bind';

import { IArtist, IArtistResponse, IArtistStatic } from '@/types/IArtist';
import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { ArtistCard } from '@/components/ArtistCard';
import { Container } from '@/components/Container';
import { Preloader } from '@/components/ui/Preloader';

import styles from './MianPage.module.scss';
import { AuthContext } from '@/context/AuthProvider';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);

  const fetchArtistsQuery = isAuth
    ? artistApi.useFetchArtistsQuery({})
    : artistApi.useFetchArtistsStaticQuery(null);

  const { data = [] } = fetchArtistsQuery;

  const transformData = useMemo(
    () => (artists: (IArtist | IArtistStatic)[]) =>
      artists?.map((artist) => ({
        id: artist._id,
        name: artist.name,
        yearsOfLife: artist.yearsOfLife,
        image: (artist as IArtist).avatar || (artist as IArtistStatic).mainPainting?.image,
      })),
    [data]
  );

  const artists = isAuth
    ? transformData((data as IArtistResponse).data)
    : transformData(data as IArtistStatic[]);

  if (!artists) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('content-wrapper')}>
      <Container>
        <CardGrid>
          {artists?.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              yearsOfLife={artist.yearsOfLife}
              imgUrl={artist.image?.webp}
            />
          ))}
        </CardGrid>
      </Container>
    </main>
  );
};
