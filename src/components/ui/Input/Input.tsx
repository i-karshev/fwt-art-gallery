import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme: boolean;
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({ isDarkTheme, label, error, className, ...other }) => (
  <div className={cx('input', { input_dark: isDarkTheme }, className)}>
    {!!label && <p className={cx('input__label')}>{label}</p>}
    <input className={cx('input__area', { input__area_error: !!error })} type="text" {...other} />
    {!!error && (
      <div className={cx('input__error-message')}>
        <ErrorIcon />
        <span>{error}</span>
      </div>
    )}
  </div>
);
