import React, { FC, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import cn from 'classnames/bind';

import { Input, InputProps } from '@/components/ui/Input';
import { ReactComponent as ShowPasswordIcon } from '@/assets/svg/eye_icon.svg';
import { ReactComponent as HidePasswordIcon } from '@/assets/svg/eye-hide_icon.svg';

import styles from './InputPassword.module.scss';

const cx = cn.bind(styles);

interface InputPasswordProps extends InputProps {
  register?: UseFormRegisterReturn<string>;
}

export const InputPassword: FC<InputPasswordProps> = ({
  theme,
  label,
  error,
  className,
  register,
  ...other
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePassword = () => setIsShowPassword((prev) => !prev);

  const showPasswordButton = useMemo(
    () => (
      <div role="presentation" className={cx('input-password-btn')} onClick={handleTogglePassword}>
        {isShowPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
      </div>
    ),
    [handleTogglePassword, isShowPassword]
  );

  return (
    <Input
      theme={theme}
      label={label}
      {...register}
      style={{ paddingRight: '50px' }}
      type={isShowPassword ? 'text' : 'password'}
      error={error}
      renderAddon={showPasswordButton}
      {...other}
    />
  );
};
