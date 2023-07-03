import React, { FC, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: string;
  label?: string;
  error?: string;
  renderAddon?: JSX.Element;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ theme, label, error, className, name = 'input', renderAddon, ...other }, ref) => (
    <div className={cx('input', `input_${theme}`, className)}>
      {label && (
        <label htmlFor={name} className={cx('input__label')}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        className={cx('input__area', { input__area_error: error })}
        type="text"
        {...other}
      />
      {error && (
        <div className={cx('input__error-message')}>
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}
      {renderAddon && renderAddon}
    </div>
  )
);
