import React, { useCallback, useContext, useState } from 'react';
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
import { Slider } from '@/components/ui/Slider';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id = '' } = useParams();
  const { data: artist, isLoading, isFetching } = artistApi.useFetchArtistStaticByIdQuery(id);

  const [isShowSlider, setIsShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSlider = useCallback(() => {
    setIsShowSlider(false);
  }, [setIsShowSlider]);

  const handleShowSlider = useCallback(
    (index: number) => () => {
      setCurrentIndex(index);
      setIsShowSlider(true);
    },
    [setCurrentIndex, setIsShowSlider]
  );

  if (isLoading || isFetching) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('artist-page', { 'artist-page_dark': isDarkTheme })}>
      {artist && (
        <>
          <ArtistInfo
            name={artist.name}
            description={artist.description}
            yearsOfLife={artist.yearsOfLife}
            genres={artist.genres}
            avatar={artist.avatar}
            isDarkTheme={isDarkTheme}
          />
          <Container>
            <div className={cx('artist-page__artworks')}>
              <p className={cx('artist-page__artworks-heading')}>Artworks</p>
              <CardGrid>
                {artist.paintings.map(
                  (
                    { _id: paintingId, name, yearOfCreation, image, artist: paintingArtist },
                    index
                  ) => (
                    <PaintingCard
                      key={paintingId}
                      id={paintingId}
                      name={name}
                      yearOfCreation={yearOfCreation}
                      image={image}
                      artist={paintingArtist}
                      data-index={index}
                      onClick={handleShowSlider(index)}
                    />
                  )
                )}
              </CardGrid>
            </div>
          </Container>

          <Slider
            paintings={artist.paintings}
            currentIndex={currentIndex}
            isDarkTheme={isDarkTheme}
            isShowSlider={isShowSlider}
            onCloseSlider={handleCloseSlider}
          />
        </>
      )}
    </main>
  );
};
