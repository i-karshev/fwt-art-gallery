import React, { FC, ReactNode, memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import { useScrollWidth } from '@/hooks/useScrollWidth';

import styles from './Modal.module.scss';

const cx = cn.bind(styles);

interface ModalProps {
  children: ReactNode;
  isDarkTheme: boolean;
  isShowModal?: boolean;
}

export const Modal: FC<ModalProps> = memo(({ children, isDarkTheme, isShowModal }) => {
  const bodyRef = useRef(document.body);
  const scrollWidth = useScrollWidth();

  useEffect(() => {
    const body = bodyRef.current;

    if (isShowModal) {
      body.style.overflowY = 'hidden';
      body.style.paddingRight = `${scrollWidth}px`;
      body.style.backgroundColor = isDarkTheme ? '#121212' : '#ffffff';
    }

    return () => {
      body.style.overflowY = 'scroll';
      body.style.paddingRight = '';
      body.style.backgroundColor = '';
    };
  }, [isShowModal]);

  if (!isShowModal) {
    return null;
  }

  return createPortal(
    <div className={cx('modal', { modal_dark: isDarkTheme })}>
      <div className={cx('modal__content')}>{children}</div>
    </div>,
    bodyRef.current
  );
});
