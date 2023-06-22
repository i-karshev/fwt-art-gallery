import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames/bind';

import styles from './MenuItem.module.scss';

const cx = cn.bind(styles);

interface MenuItemProps extends HTMLAttributes<HTMLParagraphElement> {
  isDarkTheme: boolean;
  text: string;
}

export const MenuItem: FC<MenuItemProps> = memo(({ isDarkTheme, text, className, ...other }) => (
  <p className={cx('menu-item', { 'menu-item_dark': isDarkTheme }, className)} {...other}>
    {text}
  </p>
));
