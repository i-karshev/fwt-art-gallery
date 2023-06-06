import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import cn from 'classnames/bind';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

interface LinkUIProps extends LinkProps {
  isDarkTheme: boolean;
}

export const Link: FC<LinkUIProps> = ({ isDarkTheme, className, children, ...other }) => (
  <RouterLink className={cx('link', { link_dark: isDarkTheme }, className)} {...other}>
    {children}
  </RouterLink>
);
