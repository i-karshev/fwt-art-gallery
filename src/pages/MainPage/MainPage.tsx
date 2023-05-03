import React from 'react';
import cn from 'classnames/bind';

import { artistApi } from '@/api/artistApi';
import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { ArtistCard } from '@/components/ArtistCard';
import styles from './MianPage.module.scss';
import { Container } from '@/components/Container';

const cx = cn.bind(styles);

export const MainPage = () => {
  const { data: artists, isLoading, isFetching } = artistApi.useFetchArtistsStaticQuery(null);

  if (isLoading || isFetching) {
    return <p>Loading..</p>;
  }

  return (
    <main className={cx('content-wrapper')}>
      <Container>
        <CardGrid>
          {artists &&
            artists.map((artist) => (
              <ArtistCard
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
