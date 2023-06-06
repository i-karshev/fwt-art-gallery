import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import styles from './Image.module.scss';

const cx = cn.bind(styles);

interface ImageProps extends HTMLAttributes<HTMLPictureElement> {
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  alt: string;
}

export const Image: FC<ImageProps> = memo(
  ({ webp, src, src2x, webp2x, alt, className, ...other }) => (
    <picture className={className}>
      {webp2x && (
        <source media="(min-width: 768px)" srcSet={`${API_BASE_URL}${webp2x}`} type="image/webp" />
      )}
      {src2x && (
        <source media="(min-width: 768px)" srcSet={`${API_BASE_URL}${src2x}`} type="image/jpeg" />
      )}
      {webp && <source srcSet={`${API_BASE_URL}${webp}`} type="image/webp" />}
      <img
        className={cx('img')}
        src={`${API_BASE_URL}${src}`}
        alt={alt}
        loading="lazy"
        {...other}
      />
    </picture>
  )
);
