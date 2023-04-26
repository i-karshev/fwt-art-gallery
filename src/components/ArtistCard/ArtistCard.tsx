import React, { FC, useContext } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '../../context/ThemeProvider';
import { IArtistStatic } from '../../types/IArtist';
import { API_BASE_URL } from '../../constans';
import { ReactComponent as ArrowIcon } from '../../assets/svg/arrow_icon_v2.svg';
import styles from './ArtistCard.module.scss';

const cx = cn.bind(styles);

interface ArtistCardProps {
  artist: IArtistStatic;
}

const convertYearsDate = (date: string) =>
  date
    .split(' – ')
    .map((el) => new Date(el).getFullYear())
    .join(' – ');

export const ArtistCard: FC<ArtistCardProps> = ({
  artist: { _id: id, name, yearsOfLife, mainPainting },
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const years = convertYearsDate(yearsOfLife);

  return (
    <li className={cx('artist', { artist_dark: isDarkTheme })}>
      <img
        className={cx('artist__img')}
        loading="lazy"
        src={`${API_BASE_URL}${mainPainting.image.webp}`}
        alt={name}
      />
      <div className={cx('artist__info')}>
        <div className={cx('artist__text')}>
          <p className={cx('artist__name')}>{name}</p>
          <p className={cx('artist__yearsOfLife')}>{years}</p>
        </div>
        <div className={cx('artist__btn')}>
          <ArrowIcon />
        </div>
      </div>
    </li>
  );
};