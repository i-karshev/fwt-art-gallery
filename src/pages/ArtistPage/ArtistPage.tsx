import React, { useContext, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';
import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';
import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const { data: artist } = artistApi.useFetchArtistByIdQuery({ id, isAuth });

  const [isShowSlider, setIsShowSlider] = useState(false);
  const [isShowPaintingModal, setIsShowPaintingModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSlider = useCallback(() => setIsShowSlider(false), []);

  const handleShowSlider = useCallback(
    (index: number) => () => {
      setCurrentIndex(index);
      setIsShowSlider(true);
    },
    [setCurrentIndex, setIsShowSlider]
  );

  const handleBackButton = () => navigate(-1);

  const handleTogglePaintingModal = useCallback(
    () => setIsShowPaintingModal((prev) => !prev),
    [isShowPaintingModal]
  );

  if (!artist) {
    return <Preloader isDarkTheme={isDarkTheme} />;
  }

  return (
    <main className={cx('artist-page', { 'artist-page_dark': isDarkTheme })}>
      <Container>
        <div className={cx('artist-page__action-bar')}>
          <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleBackButton}>
            <ArrowIcon style={{ rotate: '180deg' }} />
            <p>Back</p>
          </Button>

          {isAuth && (
            <div className={cx('artist-page__action-bar-right')}>
              <Button isDarkTheme={isDarkTheme} variant="icon">
                <EditIcon />
              </Button>
              <Button isDarkTheme={isDarkTheme} variant="icon">
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      </Container>

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

          {isAuth && (
            <div className={cx('artist-page__artworks-action-bar')}>
              <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleTogglePaintingModal}>
                <PlusIcon />
                <p>Add picture</p>
              </Button>
            </div>
          )}

          <CardGrid>
            {artist.paintings.map(
              ({ _id: paintingId, name, yearOfCreation, image, artist: paintingArtist }, index) => (
                <PaintingCard
                  key={paintingId}
                  id={paintingId}
                  name={name}
                  yearOfCreation={yearOfCreation}
                  image={image}
                  artist={paintingArtist}
                  data-index={index}
                  onClick={handleShowSlider(index)}
                  isMainPainting={artist.mainPainting?._id === paintingId}
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
        mainPainting={artist.mainPainting?._id}
      />
      <PaintingModal
        isDarkTheme={isDarkTheme}
        artistId={id}
        isShowModal={isShowPaintingModal}
        onCloseModal={handleTogglePaintingModal}
      />
    </main>
  );
};
