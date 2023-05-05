import React, { FC } from 'react';
import cn from 'classnames/bind';

import styles from './Preloader.module.scss';

const cx = cn.bind(styles);

interface PreloaderProps {
  isDarkTheme: boolean;
}

export const Preloader: FC<PreloaderProps> = ({ isDarkTheme }) => (
  <div className={cx('preloader', { preloader_dark: isDarkTheme })}>
    <svg
      className={cx('preloader__spinner')}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={cx('preloader__ellipse-1')}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx('preloader__ellipse-2')}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx('preloader__ellipse-3')}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx('preloader__ellipse-4')}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
);
