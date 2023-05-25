import React, { FC } from 'react';
import cn from 'classnames/bind';

import { IImage } from '@/types/IImage';
import { IGenre } from '@/types/IGenre';
import { Image } from '@/components/ui/Image';
import { Label } from '@/components/ui/Label';
import { ArtistAccordion } from '@/components/ArtistAccordion';

import styles from './ArtistInfo.module.scss';

const cx = cn.bind(styles);

interface ArtistInfoProps {
  name: string;
  description: string;
  yearsOfLife: string;
  genres: IGenre[];
  avatar: IImage;
  isDarkTheme: boolean;
}

export const ArtistInfo: FC<ArtistInfoProps> = ({
  name,
  description,
  yearsOfLife,
  genres,
  avatar,
  isDarkTheme,
}) => (
  <div className={cx('artist', { artist_dark: isDarkTheme })}>
    <div className={cx('artist__container')}>
      <div className={cx('artist__content')}>
        <div className={cx('artist__info-wrapper')}>
          <Image
            className={cx('artist__img')}
            src={avatar.src}
            src2x={avatar.src2x}
            webp={avatar.webp}
            webp2x={avatar.webp2x}
            alt={name}
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
