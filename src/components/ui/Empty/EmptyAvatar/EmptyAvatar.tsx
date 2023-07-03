import { FC, memo } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as PhotoIcon } from '@/assets/svg/photo_icon.svg';
import styles from './EmptyAvatar.module.scss';

const cx = cn.bind(styles);

interface EmptyAvatarProps {
  theme: string;
  className?: string;
}

export const EmptyAvatar: FC<EmptyAvatarProps> = memo(({ theme, className }) => (
  <div className={cx('empty-avatar', `empty-avatar_${theme}`, className)}>
    <PhotoIcon className={cx('empty-avatar__icon')} />
    <p className={cx('empty-avatar__text')}>No Image uploaded</p>
  </div>
));
