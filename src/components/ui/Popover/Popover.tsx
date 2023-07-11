import React, { FC, memo, ReactNode } from 'react';
import cn from 'classnames/bind';

import styles from './Popover.module.scss';

const cx = cn.bind(styles);

interface PopoverProps {
  theme: string;
  children: ReactNode;
}

export const Popover: FC<PopoverProps> = memo(({ theme, children }) => (
  <div className={cx('popover', `popover_${theme}`)}>
    <div className={cx('popover__arrow')} />
    <div className={cx('popover__content')}>{children}</div>
  </div>
));
