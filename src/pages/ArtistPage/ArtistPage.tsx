import React, { useCallback, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAppSelector } from '@/hooks/redux';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';
import { Slider } from '@/components/ui/Slider';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id = '' } = useParams();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const { data: artist, isLoading, isFetching } = artistApi.useFetchArtistByIdQuery({ id, isAuth });

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
