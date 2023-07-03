import React, { FC, ReactNode, memo, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import { useToggleScroll } from '@/hooks/useToggleScroll';

import { Transition } from '@/components/ui/Transition/Transition';

import styles from './Modal.module.scss';

const cx = cn.bind(styles);

interface ModalProps {
  children: ReactNode;
  theme: string;
  isShowModal?: boolean;
  isTransition?: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = memo(
  ({ children, theme, isShowModal = true, isTransition = true, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const bodyRef = useRef(document.body);
    useToggleScroll(isShowModal, theme);

    const handleEnter = () => {
      const modal = modalRef.current;
      const modalContent = modal?.firstElementChild as HTMLDivElement;

      if (!modal || !modalContent) return;

      modal.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    };

    const modalJSX = (
      <Transition mount={isShowModal} duration={3000} onEnter={handleEnter}>
        <div
          className={cx('modal', `modal_${theme}`, { modal_transition: isTransition })}
          role="presentation"
          onClick={onClose}
          ref={modalRef}
        >
          <div
            className={cx('modal__content', { modal__content_transition: isTransition })}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </Transition>
    );

    return createPortal(isShowModal ? modalJSX : null, bodyRef.current);
  }
);
