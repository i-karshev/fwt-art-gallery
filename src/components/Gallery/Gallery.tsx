import React, { FC } from 'react';
import cn from 'classnames/bind';

import { IArtistStatic } from '@/types/IArtist';
import { Container } from '@/components/Container';

import styles from './Gallery.module.scss';
import { ArtistCard } from '@/components/ArtistCard/ArtistCard';

const cx = cn.bind(styles);

interface ArtistListProps {
  artists: IArtistStatic[];
}

export const Gallery: FC<ArtistListProps> = ({ artists }) => (
  <Container>
    <div className={cx('gallery')}>
      <ul className={cx('gallery__list')}>
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
      </ul>
    </div>
  </Container>
);
