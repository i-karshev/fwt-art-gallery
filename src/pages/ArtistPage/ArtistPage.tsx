import { useContext, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';
import { usePaginationPageSize } from '@/hooks/usePaginationPageSize';

import { DraggableCardGrid } from '@/components/ui/CardGrid/DraggableCardGrid';
import { PaintingCard } from '@/components/PaintingCard';
import { Container } from '@/components/Container';
import { ArtistInfo } from '@/components/ArtistInfo/ArtistInfo';
import { Preloader } from '@/components/ui/Preloader';
import { Slider } from '@/components/ui/Slider';
import { ActionBar } from '@/components/ActionBar';
import { BackButton } from '@/components/BackButton';
import { ArtistEditButton } from '@/components/ArtistEditButton';
import { PaintingAddButton } from '@/components/PaintingAddButton';
import { ArtistDeleteButton } from '@/components/ArtistDeleteButton';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyPaintingList } from '@/components/ui/Empty';

import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

export const ArtistPage = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  const { id = '' } = useParams();

  const { data: artist } = artistApi.useFetchArtistByIdQuery({ id, isAuth });

  const pageSize = usePaginationPageSize();
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = Math.ceil(artist ? artist.paintings.length / pageSize : 0);

  const paintings = useMemo(
    () =>
      isAuth
        ? artist?.paintings.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
        : artist?.paintings,
    [isAuth, artist?.paintings, currentPage, pageSize]
  );
  const handleChangePage = useCallback((page: number) => setCurrentPage(page), [setCurrentPage]);

  const [isShowSlider, setIsShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseSlider = useCallback(() => setIsShowSlider(false), []);
  const handleShowSlider = useCallback(
    (index: number) => () => {
      setCurrentIndex(index);
      setIsShowSlider(true);
    },
    [setCurrentIndex, setIsShowSlider]
  );

  if (!artist) {
    return <Preloader theme={theme} />;
  }

  const paintingList = (
    <>
      {isAuth && (
        <ActionBar
          className={cx('artist-page__artworks-action-bar')}
          renderRight={<PaintingAddButton theme={theme} artistId={id} />}
        />
      )}

      {paintings?.length && (
        <DraggableCardGrid
          theme={theme}
          items={paintings}
          renderItem={(
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
              onClick={handleShowSlider(index as number)}
              isMainPainting={artist.mainPainting?._id === paintingId}
            />
          )}
        />
      )}

      {isAuth && (
        <Pagination
          className={cx('artist-page__pagination')}
          theme={theme}
          currentPage={currentPage}
          totalCount={totalCount}
          onChangePage={handleChangePage}
        />
      )}
    </>
  );

  return (
    <main className={cx('artist-page', `artist-page_${theme}`)}>
      <Container>
        <ActionBar
          className={cx('artist-page__action-bar')}
          renderLeft={<BackButton theme={theme} />}
          renderRight={
            isAuth && (
              <>
                <ArtistEditButton theme={theme} artist={artist} />
                <ArtistDeleteButton theme={theme} artistId={id} />
              </>
            )
          }
        />
      </Container>

      <ArtistInfo
        name={artist.name}
        description={artist.description}
        yearsOfLife={artist.yearsOfLife}
        genres={artist.genres}
        avatar={artist.avatar}
        theme={theme}
      />

      <Container>
        <div className={cx('artist-page__artworks')}>
          <p className={cx('artist-page__artworks-heading')}>Artworks</p>
          {paintings?.length ? paintingList : <EmptyPaintingList theme={theme} />}
        </div>
      </Container>

      <Slider
        paintings={artist.paintings}
        currentIndex={currentIndex}
        theme={theme}
        isShowSlider={isShowSlider}
        onCloseSlider={handleCloseSlider}
        mainPainting={artist.mainPainting?._id}
      />
    </main>
  );
};
