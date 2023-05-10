import React, { useContext } from 'react';
import cn from 'classnames/bind';

import { artistApi } from '@/api/artistApi';
import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { ArtistCard } from '@/components/ArtistCard';
import { Container } from '@/components/Container';
import { Preloader } from '@/components/ui/Preloader';
import { ThemeContext } from '@/context/ThemeProvider';

import styles from './MianPage.module.scss';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { data: artists, isLoading, isFetching } = artistApi.useFetchArtistsStaticQuery(null);

  if (isLoading || isFetching) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('content-wrapper')}>
      <Container>
        <CardGrid>
          {artists &&
            artists.map((artist) => (
              <ArtistCard
                key={artist._id}
                id={artist._id}
                name={artist.name}
                yearsOfLife={artist.yearsOfLife}
                imgUrl={artist.mainPainting.image.webp}
              />
            ))}
        </CardGrid>
      </Container>
    </main>
  );
};
