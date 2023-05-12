import React, { FC } from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { IArtistDetailStatic } from '@/types/IArtist';
import { Label } from '@/components/ui/Label';
import { ArtistAccordion } from '@/components/ArtistAccordion';
import styles from './ArtistInfo.module.scss';

const cx = cn.bind(styles);

interface ArtistInfoProps {
  artist: IArtistDetailStatic;
  isDarkTheme: boolean;
}

export const ArtistInfo: FC<ArtistInfoProps> = ({
  isDarkTheme,
  artist: { name, avatar, description, genres, yearsOfLife },
}) => (
  <div className={cx('artist', { artist_dark: isDarkTheme })}>
    <div className={cx('artist__container')}>
      <div className={cx('artist__content')}>
        <div className={cx('artist__info-wrapper')}>
          <img
            className={cx('artist__img')}
            src={`${API_BASE_URL}${avatar.webp}`}
            alt={name}
            loading="lazy"
          />
          <div className={cx('artist__info')}>
            <p className={cx('artist__years')}>{yearsOfLife}</p>
            <p className={cx('artist__name')}>{name}</p>
          </div>
        </div>

        <div className={cx('artist__info-detail')}>
          <ArtistAccordion description={description} isDarkTheme={isDarkTheme} />
          <div className={cx('artist__genres')}>
            {genres.map(({ _id: genreId, name: genreName }) => (
              <Label key={genreId} name={genreName} isDarkTheme={isDarkTheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
