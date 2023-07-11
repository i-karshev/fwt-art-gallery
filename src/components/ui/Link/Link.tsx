import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import cn from 'classnames/bind';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

interface LinkUIProps extends LinkProps {
  theme: string;
}

export const Link: FC<LinkUIProps> = ({ theme, className, children, ...other }) => (
  <RouterLink className={cx('link', `link_${theme}`, className)} {...other}>
    {children}
  </RouterLink>
);
