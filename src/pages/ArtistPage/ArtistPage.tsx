import React, { useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';
import { Slider } from '@/components/Slider';
import { Button } from '@/components/ui/Button';

import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';
import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const fetchArtistQuery = artistApi.useFetchArtistByIdQuery(id, { skip: !isAuth });
  const fetchArtistStaticQuery = artistApi.useFetchArtistStaticByIdQuery(id, { skip: isAuth });
  const { data: artist } = isAuth ? fetchArtistQuery : fetchArtistStaticQuery;

  const [isShowSlider, setIsShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSlider = () => {
    setIsShowSlider(false);
  };

  const handleShowSlider = (index: number) => {
    setCurrentIndex(index);
    setIsShowSlider(true);
  };

  const handleBackButton = () => navigate(-1);

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

      <ArtistInfo artist={artist} isDarkTheme={isDarkTheme} />

      <Container>
        <div className={cx('artist-page__artworks')}>
          <p className={cx('artist-page__artworks-heading')}>Artworks</p>
          <CardGrid>
            {artist.paintings?.map((painting, index) => (
              <PaintingCard
                key={painting._id}
                id={painting._id}
                name={painting.name}
                yearOfCreation={painting.yearOfCreation}
                imgUrl={painting.image.webp}
                onClick={() => handleShowSlider(index)}
                isMainPainting={artist.mainPainting?._id === painting._id}
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
        mainPainting={artist.mainPainting?._id}
      />
    </main>
  );
};
