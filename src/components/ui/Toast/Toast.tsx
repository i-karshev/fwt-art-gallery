import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './Toast.module.scss';

const cx = cn.bind(styles);

interface ToastProps {
  theme: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: FC<ToastProps> = ({ theme, message, onClose, duration }) => {
  useEffect(() => {
    setTimeout(() => onClose(), duration);
  }, []);

  return (
    <div className={cx('toast', `toast_${theme}`)}>
      <div className={cx('toast__title')}>
        <ErrorIcon className={cx('toast__title-icon')} />
        <p className={cx('toast__title-text')}>Error!</p>
      </div>
      <p className={cx('toast__message')}>{message}</p>

      <button type="button" className={cx('toast__close-btn')} onClick={onClose}>
        <CloseIcon className={cx('toast__close-icon')} />
      </button>
    </div>
  );
};
