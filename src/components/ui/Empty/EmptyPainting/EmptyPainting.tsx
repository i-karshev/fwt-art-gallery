import { FC, memo } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as PhotoIcon } from '@/assets/svg/photo_icon.svg';
import styles from './EmptyPainting.module.scss';

const cx = cn.bind(styles);

interface EmptyPaintingProps {
  theme: string;
  className?: string;
}

export const EmptyPainting: FC<EmptyPaintingProps> = memo(({ theme, className }) => (
  <div className={cx('empty-painting', `empty-painting_${theme}`, className)}>
    <PhotoIcon className={cx('empty-painting__icon')} />
  </div>
));
