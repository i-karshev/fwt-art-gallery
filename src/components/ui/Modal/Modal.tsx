import React, { FC, memo, ReactNode, useEffect, useRef } from 'react';
import cn from 'classnames/bind';

import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const cx = cn.bind(styles);

interface ModalProps {
  children: ReactNode;
  isDarkTheme: boolean;
  isShowModal: boolean;
}

export const Modal: FC<ModalProps> = memo(({ children, isDarkTheme, isShowModal }) => {
  const bodyRef = useRef(document.body);
  const { offsetWidth, clientWidth } = document.documentElement;
  const scrollWidth = offsetWidth - clientWidth;

  useEffect(() => {
    if (isShowModal) {
      bodyRef.current.style.overflow = 'hidden';
      bodyRef.current.style.paddingRight = `${scrollWidth}`;
    }

    return () => {
      bodyRef.current.style.overflow = 'auto';
      bodyRef.current.style.paddingRight = '0';
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
