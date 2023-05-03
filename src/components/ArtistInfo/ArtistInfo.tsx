import React, { FC } from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { Label } from '@/components/ui/Label';
import { IArtistDetailStatic } from '@/types/IArtist';
import styles from './ArtistInfo.module.scss';

const cx = cn.bind(styles);

const sliceDescr = (str: string) => `${str.slice(0, 265)}..`;

interface ArtistInfoProps {
  artist: IArtistDetailStatic;
  isDarkTheme: boolean;
}

export const ArtistInfo: FC<ArtistInfoProps> = ({ artist, isDarkTheme }) => (
  <div className={cx('artist', { artist_dark: isDarkTheme })}>
    <div className={cx('artist__container')}>
      <div className={cx('artist__content')}>
        <div className={cx('artist__info-wrapper')}>
          <img
            className={cx('artist__img')}
            src={`${API_BASE_URL}${artist.avatar.webp}`}
            alt={artist.name}
          />
          <div className={cx('artist__info')}>
            <p className={cx('artist__years')}>{artist.yearsOfLife}</p>
            <p className={cx('artist__name')}>{artist.name}</p>
          </div>
        </div>

        <div className={cx('artist__info-detail')}>
          <div className={cx('artist__biography')}>{sliceDescr(artist.description)}</div>
          <div className={cx('artist__genres')}>
            {artist.genres.map((genre) => (
              <Label key={genre._id} name={genre.name} isDarkTheme={isDarkTheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
