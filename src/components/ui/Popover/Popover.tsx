import React, { FC, memo, ReactNode } from 'react';
import cn from 'classnames/bind';

import styles from './Popover.module.scss';

const cx = cn.bind(styles);

interface PopoverProps {
  isDarkTheme: boolean;
  isShow: boolean;
  children: ReactNode;
}

export const Popover: FC<PopoverProps> = memo(({ isDarkTheme, children, isShow }) => {
  if (!isShow) {
    return null;
  }

  return (
    <div className={cx('popover', { popover_dark: isDarkTheme })}>
      <div className={cx('popover__arrow')} />
      <div className={cx('popover__content')}>{children}</div>
    </div>
  );
});
