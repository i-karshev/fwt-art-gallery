import React, { FC } from 'react';
import cn from 'classnames/bind';

import { ArtistCard } from '../ArtistCard';
import { IArtistStatic } from '@/src/types/IArtist';
import { Container } from '../Container';

import styles from './Gallery.module.scss';

const cx = cn.bind(styles);

interface ArtistListProps {
  artists: IArtistStatic[];
}

export const Gallery: FC<ArtistListProps> = ({ artists }) => (
  <Container>
    <div className={cx('gallery')}>
      <ul className={cx('gallery__list')}>
        {artists && // eslint-disable-next-line no-underscore-dangle
          artists.map((artist) => <ArtistCard key={artist._id} artist={artist} />)}
      </ul>
    </div>
  </Container>
);