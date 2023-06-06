import React, { FC, ReactNode, memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import { setStyleIsToggleModal } from '@/utils/setStyleIsToggleModal';

import styles from './Modal.module.scss';

const cx = cn.bind(styles);

interface ModalProps {
  children: ReactNode;
  isDarkTheme: boolean;
  isShowModal?: boolean;
}

export const Modal: FC<ModalProps> = memo(({ children, isDarkTheme, isShowModal = true }) => {
  const bodyRef = useRef(document.body);

  useEffect(() => {
    if (isShowModal) {
      const scrollWidth = window.innerWidth - document.documentElement.offsetWidth;
      setStyleIsToggleModal(bodyRef, 'hidden', `${scrollWidth}px`, isDarkTheme);
    }

    return () => {
      setStyleIsToggleModal(bodyRef, 'scroll', '', isDarkTheme);
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
