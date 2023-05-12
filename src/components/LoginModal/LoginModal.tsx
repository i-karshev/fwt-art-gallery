import React, { ChangeEvent, FC, FormEvent, useCallback, useRef, useState } from 'react';
import cn from 'classnames/bind';

import styles from './LoginModal.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';
import loginImage from '@/assets/img/login-img.jpg';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import { Input } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';

const cx = cn.bind(styles);

interface LoginModalProps {
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isDarkTheme, isShowModal, onCloseModal }) => {
  const modalRef = useRef(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useOutsideClick(modalRef, onCloseModal);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChangeLogin = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value),
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
    [setPassword]
  );

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
      <div ref={modalRef} className={cx('login-modal', { 'login-modal_dark': isDarkTheme })}>
        <img className={cx('login-modal__img')} src={loginImage} alt="login" loading="lazy" />
        <div className={cx('login-modal__content')}>
          <p className={cx('login-modal__title')}>Welcome back</p>
          <form className={cx('login-modal__form')} onSubmit={handleSubmit}>
            <Input
              isDarkTheme={isDarkTheme}
              value={login}
              label="Email"
              onChange={handleChangeLogin}
            />
            <Input
              isDarkTheme={isDarkTheme}
              value={password}
              label="Password"
              onChange={handleChangePassword}
            />
            <Button
              className={cx('login-modal__form-btn')}
              isDarkTheme={isDarkTheme}
              variant="default"
              type="submit"
            >
              Log In
            </Button>
          </form>
          <p className={cx('login-modal__sing-up')}>
            If you don&apos;t have an account yet, please{' '}
            <Link isDarkTheme={isDarkTheme} to="/">
              sign up
            </Link>
          </p>
        </div>
        <button type="button" className={cx('login-modal__close-btn')} onClick={onCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};
