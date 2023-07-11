import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames/bind';

import styles from './MenuItem.module.scss';

const cx = cn.bind(styles);

interface MenuItemProps extends HTMLAttributes<HTMLParagraphElement> {
  theme: string;
  text: string;
}

export const MenuItem: FC<MenuItemProps> = memo(({ theme, text, className, ...other }) => (
  <p className={cx('menu-item', `menu-item_${theme}`, className)} {...other}>
    {text}
  </p>
));
