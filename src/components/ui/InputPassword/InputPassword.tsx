import React, { FC, useState } from 'react';
import cn from 'classnames/bind';

import { Input, InputProps } from '@/components/ui/Input';
import { ReactComponent as ShowPasswordIcon } from '@/assets/svg/eye_icon.svg';
import { ReactComponent as HidePasswordIcon } from '@/assets/svg/eye-hide_icon.svg';
import styles from './InputPassword.module.scss';

const cx = cn.bind(styles);

export const InputPassword: FC<InputProps> = ({ isDarkTheme, label, className, ...other }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePassword = () => setIsShowPassword((prev) => !prev);

  return (
    <div className={cx('input-password')}>
      <Input
        isDarkTheme={isDarkTheme}
        label={label}
        {...other}
        type={isShowPassword ? 'text' : 'password'}
        style={{ paddingRight: '50px' }}
      />

      {isShowPassword ? (
        <HidePasswordIcon className={cx('input-password__btn')} onClick={handleTogglePassword} />
      ) : (
        <ShowPasswordIcon className={cx('input-password__btn')} onClick={handleTogglePassword} />
      )}
    </div>
  );
};
