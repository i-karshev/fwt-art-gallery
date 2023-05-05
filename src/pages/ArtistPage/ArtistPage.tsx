import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id = '' } = useParams();
  const { data: artist, isLoading, isFetching } = artistApi.useFetchArtistStaticByIdQuery(id);

  if (isLoading || isFetching) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('artist-page', { 'artist-page_dark': isDarkTheme })}>
      {artist && (
        <>
          <ArtistInfo artist={artist} isDarkTheme={isDarkTheme} />
          <Container>
            <div className={cx('artist-page__artworks')}>
              <p className={cx('artist-page__artworks-heading')}>Artworks</p>
              <CardGrid>
                {artist.paintings.map((painting) => (
                  <PaintingCard
                    key={painting._id}
                    id={painting._id}
                    name={painting.name}
                    yearOfCreation={painting.yearOfCreation}
                    imgUrl={painting.image.webp}
                    artist={painting.artist}
                  />
                ))}
              </CardGrid>
            </div>
          </Container>
        </>
      )}
    </main>
  );
};
