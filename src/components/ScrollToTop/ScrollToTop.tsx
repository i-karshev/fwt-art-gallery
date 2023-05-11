import React, { FC } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_small.svg';
import styles from './ScrollToTop.module.scss';

const cx = cn.bind(styles);

interface ScrollToTopProps {
  isDarkTheme: boolean;
}

export const ScrollToTop: FC<ScrollToTopProps> = ({ isDarkTheme }) => (
  <button type="button" className={cx('button', { button_dark: isDarkTheme })}>
    <ArrowIcon />
  </button>
);
