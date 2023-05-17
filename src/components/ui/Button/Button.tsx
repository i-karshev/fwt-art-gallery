import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Button.module.scss';

const cx = cn.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme: boolean;
  variant: 'default' | 'text' | 'icon';
}

export const Button: FC<ButtonProps> = memo(
  ({ variant, isDarkTheme, className, children, ...other }) => (
    <button
      className={cx('button', `button_${variant}`, { button_dark: isDarkTheme }, className)}
      type="button"
      {...other}
    >
      {children}
    </button>
  )
);
