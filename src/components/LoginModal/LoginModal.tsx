import React, { FC } from 'react';
import cn from 'classnames/bind';

import styles from './LoginModal.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';

const cx = cn.bind(styles);

interface LoginModalProps {
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isDarkTheme, isShowModal, onCloseModal }) => (
  <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal} onCloseModal={onCloseModal}>
    <div className={cx('login-modal')} />
  </Modal>
);
