import { FC } from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';
import styles from './Card.module.scss';

const cx = cn.bind(styles);

export interface CardProps {
  title: string;
  subtitle: string;
  imgUrl: string;
  isDarkTheme: boolean;
  isScaleImageOnHover?: boolean;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  imgUrl,
  isDarkTheme,
  isScaleImageOnHover,
}) => (
  <div className={cx('card', { card_dark: isDarkTheme })}>
    <img
      className={cx('card__img', { card__img_scale: isScaleImageOnHover })}
      loading="lazy"
      src={`${API_BASE_URL}${imgUrl}`}
      alt={title}
    />
    <div className={cx('card__info')}>
      <p className={cx('card__title')}>{title}</p>
      <p className={cx('card__subtitle')}>{subtitle}</p>
      <div className={cx('card__arrow')}>
        <ArrowIcon />
      </div>
    </div>
  </div>
);
