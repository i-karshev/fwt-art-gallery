import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme: boolean;
  label?: string;
  placeholder?: string;
  onChange: () => void;
  errorMessage?: string;
}

export const Input: FC<InputProps> = ({
  isDarkTheme,
  label,
  placeholder,
  onChange,
  errorMessage,
  className,
  ...other
}) => (
  <div className={cx('input', { input_dark: isDarkTheme }, className)}>
    {!!label && <p className={cx('input__label')}>{label}</p>}
    <input
      className={cx('input__area', { input__area_error: !!errorMessage })}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      {...other}
    />
    {!!errorMessage && (
      <div className={cx('input__error-message')}>
        <ErrorIcon />
        <span>{errorMessage}</span>
      </div>
    )}
  </div>
);
