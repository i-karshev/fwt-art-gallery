import { FC, memo } from 'react';
import cn from 'classnames/bind';

import { IImage } from '@/types/IImage';
import { Image } from '@/components/ui/Image';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';

import styles from './Card.module.scss';

const cx = cn.bind(styles);

export interface CardProps {
  title: string;
  subtitle: string;
  image: IImage;
  isDarkTheme: boolean;
  isScaleImageOnHover?: boolean;
  onClick?: () => void;
}

export const Card: FC<CardProps> = memo(
  ({ title, subtitle, image, isDarkTheme, isScaleImageOnHover, onClick }) => (
    <div className={cx('card', { card_dark: isDarkTheme })}  onClick={onClick} role="presentation">
      <Image
        className={cx('card__img', { card__img_scale: isScaleImageOnHover })}
        src={image.src}
        src2x={image.src2x}
        webp={image.webp}
        webp2x={image.webp2x}
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
  )
);
