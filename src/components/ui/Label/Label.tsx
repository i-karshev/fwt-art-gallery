import React, { FC, memo } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon_small.svg';
import styles from './Label.module.scss';

const cx = cn.bind(styles);

interface LabelProps {
  name: string;
  className?: string;
  onClose?: () => void;
  theme: string;
}

export const Label: FC<LabelProps> = memo(({ name, onClose, className, theme }) => (
  <div className={cx('label', `label_${theme}`, className)}>
    <span className={cx('label__text')}>{name}</span>
    {onClose && (
      <span role="presentation" className={cx('label__icon')} onClick={onClose}>
        <CloseIcon />
      </span>
    )}
  </div>
));
