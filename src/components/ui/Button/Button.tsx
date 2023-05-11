import React, { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import styles from './Button.module.scss';

const cx = cn.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme: boolean;
  variable: 'default' | 'text' | 'icon' | 'icon-img' | 'top' | 'up-btn';
}

export const Button: FC<ButtonProps> = ({
  variable,
  isDarkTheme,
  className,
  children,
  ...other
}) => (
  <button
    className={cx('button', `button_${variable}`, { button_dark: isDarkTheme }, className)}
    type="button"
    {...other}
  >
    {children}
  </button>
);
