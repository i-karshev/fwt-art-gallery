import React, { FC, memo, forwardRef, TextareaHTMLAttributes } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';
import styles from './TextArea.module.scss';

const cx = cn.bind(styles);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDarkTheme: boolean;
  label?: string;
  error?: string;
}

const forwardTextArea: FC<TextAreaProps> = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ isDarkTheme, label, error, name = 'textarea', className, ...other }, ref) => (
    <div className={cx('textarea', { textarea_dark: isDarkTheme }, className)}>
      {label && (
        <label className={cx('textarea__label')} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        className={cx('textarea__area', { textarea__area_error: !!error })}
        {...other}
        ref={ref}
      />
      {error && (
        <div className={cx('textarea__error')}>
          <ErrorIcon />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
);

export const TextArea = memo(forwardTextArea);
