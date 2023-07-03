import React, { FC, HTMLAttributes, memo, useRef } from 'react';
import cn from 'classnames/bind';

import { useOnScreen } from '@/hooks/useOnScreen';

import { Preloader } from '@/components/ui/Preloader';

import styles from './Image.module.scss';

const cx = cn.bind(styles);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

interface ImageProps extends HTMLAttributes<HTMLPictureElement> {
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  alt: string;
  theme: string;
}

export const Image: FC<ImageProps> = memo(
  ({ webp, src, src2x, webp2x, alt, className, theme, ...other }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(ref);

    return (
      <div className={cx('image', className)} ref={ref}>
        <picture>
          {webp2x && (
            <source
              media="(min-width: 768px)"
              srcSet={`${API_BASE_URL}${webp2x}`}
              type="image/webp"
            />
          )}
          {src2x && (
            <source
              media="(min-width: 768px)"
              srcSet={`${API_BASE_URL}${src2x}`}
              type="image/jpeg"
            />
          )}
          {webp && <source srcSet={`${API_BASE_URL}${webp}`} type="image/webp" />}
          <img
            className={cx('image__img', { image__img_loaded: isLoaded && isVisible })}
            src={`${API_BASE_URL}${src}`}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            {...other}
          />
        </picture>

        {(!isLoaded || !isVisible) && (
          <div className={cx('image__preloader')}>
            <Preloader theme={theme} />
          </div>
        )}
      </div>
    );
  }
);
