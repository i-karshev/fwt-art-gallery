import React, { ChangeEvent, FC, FormEvent, useCallback, useRef, useState } from 'react';
import cn from 'classnames/bind';

import { Link } from 'react-router-dom';
import styles from './RegisterModal.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';
import registerImage from '@/assets/img/register-img.jpg';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

const cx = cn.bind(styles);

interface RegisterModalProps {
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({
  isDarkTheme,
  isShowModal,
  onCloseModal,
}) => {
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
      <div ref={modalRef} className={cx('register-modal', { 'register-modal_dark': isDarkTheme })}>
        <img
          className={cx('register-modal__img')}
          src={registerImage}
          alt="register"
          loading="lazy"
        />
        <div className={cx('register-modal__content')}>
          <p className={cx('register-modal__title')}>Create your profile</p>
          <form className={cx('register-modal__form')} onSubmit={handleSubmit}>
            <input type="text" onChange={handleChangeLogin} value={login} />
            <input type="text" onChange={handleChangePassword} value={password} />
            <Button
              className={cx('register-modal__form-btn')}
              isDarkTheme={isDarkTheme}
              variant="default"
              type="submit"
            >
              Sign up
            </Button>
          </form>
          <p className={cx('register-modal__log-in')}>
            If you already have an account, please <Link to="/">log in</Link>
          </p>
        </div>
        <button type="button" className={cx('register-modal__close-btn')} onClick={onCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};
