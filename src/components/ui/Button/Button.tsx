import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Button.module.scss';

const cx = cn.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: string;
  variant: 'default' | 'text' | 'icon';
}

export const Button: FC<ButtonProps> = memo(({ variant, theme, className, children, ...other }) => (
  <button
    className={cx('button', `button_${variant}`, `button_${theme}`, className)}
    type="button"
    {...other}
  >
    {children}
  </button>
));
