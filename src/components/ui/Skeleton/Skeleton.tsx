import { FC, memo } from 'react';
import cn from 'classnames/bind';

import styles from './Skeleton.module.scss';

const cx = cn.bind(styles);

interface SkeletonProps {
  isDarkTheme: boolean;
}

export const Skeleton: FC<SkeletonProps> = memo(({ isDarkTheme }) => (
  <div className={cx('skeleton', { skeleton_dark: isDarkTheme })}>
    <div className={cx('skeleton__info')}>
      <div className={cx('skeleton__title')} />
      <div className={cx('skeleton__subtitle')} />
    </div>
  </div>
));
