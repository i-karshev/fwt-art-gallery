import React, { FC, forwardRef, useState } from 'react';
import cn from 'classnames/bind';

import { InputProps } from '@/components/ui/Input';
import { ReactComponent as ShowPasswordIcon } from '@/assets/svg/eye_icon.svg';
import { ReactComponent as HidePasswordIcon } from '@/assets/svg/eye-hide_icon.svg';
import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';

import styles from './InputPassword.module.scss';
import inputStyles from '@/components/ui/Input/Input.module.scss';

const cx = cn.bind({ ...styles, ...inputStyles });

export const InputPassword: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ isDarkTheme, label, error, className, name = 'input', ...other }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleTogglePassword = () => setIsShowPassword((prev) => !prev);

    return (
      <div className={cx('input', 'input-password', { input_dark: isDarkTheme }, className)}>
        {!!label && (
          <label htmlFor={name} className={cx('input__label')}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          className={cx('input__area', { input__area_error: !!error })}
          type={isShowPassword ? 'text' : 'password'}
          style={{ paddingRight: '50px' }}
          {...other}
        />
        {!!error && (
          <div className={cx('input__error-message')}>
            <ErrorIcon />
            <span>{error}</span>
          </div>
        )}
        {isShowPassword ? (
          <HidePasswordIcon className={cx('input-password__btn')} onClick={handleTogglePassword} />
        ) : (
          <ShowPasswordIcon className={cx('input-password__btn')} onClick={handleTogglePassword} />
        )}
      </div>
    );
  }
);
