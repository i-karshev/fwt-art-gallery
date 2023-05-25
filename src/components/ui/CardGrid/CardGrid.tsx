import React, { FC, memo, ReactNode } from 'react';
import cn from 'classnames/bind';

import styles from './CardGrid.module.scss';

const cx = cn.bind(styles);

interface GridCardProps {
  children: ReactNode;
}

export const CardGrid: FC<GridCardProps> = memo(({ children }) => (
  <ul className={cx('card-grid')}>{children}</ul>
));
