import React, { FC, ReactNode, useEffect, useRef } from 'react';
import cn from 'classnames/bind';

import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const cx = cn.bind(styles);

interface ModalProps {
  children: ReactNode;
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isDarkTheme, isShowModal, onCloseModal }) => {
  const bodyRef = useRef(document.body);

  useEffect(() => {
    if (isShowModal) {
      bodyRef.current.style.overflow = 'hidden';
    }

    return () => {
      bodyRef.current.style.overflow = 'auto';
    };
  }, [isShowModal]);

  if (!isShowModal) {
    return null;
  }

  return createPortal(
    <div className={cx('modal', { modal_dark: isDarkTheme })}>
      <div className={cx('modal__content')}>{children}</div>
      <button type="button" className={cx('modal__close-btn')} onClick={onCloseModal}>
        X
      </button>
    </div>,
    bodyRef.current
  );
};
