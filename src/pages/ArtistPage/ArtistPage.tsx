import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { useAppSelector } from '@/hooks/redux';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';
import { Slider } from '@/components/Slider';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id = '' } = useParams();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const fetchArtist = artistApi.useFetchArtistByIdQuery(id, { skip: !isAuth });
  const fetchArtistStatic = artistApi.useFetchArtistStaticByIdQuery(id, { skip: isAuth });
  const { data: artist, isLoading, isFetching } = isAuth ? fetchArtist : fetchArtistStatic;

  const [isShowSlider, setIsShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSlider = () => {
    setIsShowSlider(false);
  };

  const handleShowSlider = (index: number) => {
    setCurrentIndex(index);
    setIsShowSlider(true);
  };

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
                {artist.paintings.map((painting, index) => (
                  <PaintingCard
                    key={painting._id}
                    id={painting._id}
                    name={painting.name}
                    yearOfCreation={painting.yearOfCreation}
                    imgUrl={painting.image.webp}
                    artist={painting.artist}
                    data-index={index}
                    onClick={() => handleShowSlider(index)}
                  />
                ))}
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
