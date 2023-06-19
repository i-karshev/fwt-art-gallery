import { FC, memo } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as PhotoIcon } from '@/assets/svg/photo_icon.svg';
import styles from './EmptyPainting.module.scss';

const cx = cn.bind(styles);

interface EmptyPaintingProps {
  isDarkTheme: boolean;
  className?: string;
}

export const EmptyPainting: FC<EmptyPaintingProps> = memo(({ isDarkTheme, className }) => (
  <div className={cx('empty-painting', { 'empty-painting_dark': isDarkTheme }, className)}>
    <PhotoIcon className={cx('empty-painting__icon')} />
  </div>
));
