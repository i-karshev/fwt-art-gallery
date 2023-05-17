import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authApi } from '@/api/authApi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useFingerprint } from '@/hooks/useFingerprint';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';
import { InputPassword } from '@/components/ui/InputPassword';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import loginImage from '@/assets/img/login-img.jpg';

import styles from './LoginModal.module.scss';

const cx = cn.bind(styles);

const schema = yup.object({
  username: yup
    .string()
    .required('This field is required.')
    .min(4, 'Email length must be at least 4 characters.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address.'),
  password: yup
    .string()
    .required('This field is required.')
    .min(8, 'Password length must be at least 8 characters.'),
});

type FormData = yup.InferType<typeof schema>;

interface LoginModalProps {
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isDarkTheme, isShowModal, onCloseModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ criteriaMode: 'all', mode: 'onBlur', resolver: yupResolver(schema) });

  const loginModalRef = useRef(null);
  const fingerprint = useFingerprint();
  const [handleLogin, { isSuccess }] = authApi.useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    register('username');
    register('password');
  }, []);

  useOutsideClick(loginModalRef, onCloseModal);

  const onSubmit = handleSubmit(({ username, password }) => {
    // eslint-disable-next-line no-void
    void handleLogin({ username, password, fingerprint });
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as 'username' | 'password';
    setValue(name, event.target.value, { shouldValidate: true });
  };

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
      <div ref={loginModalRef} className={cx('login-modal', { 'login-modal_dark': isDarkTheme })}>
        <img className={cx('login-modal__img')} src={loginImage} alt="login" loading="lazy" />
        <div className={cx('login-modal__content')}>
          <p className={cx('login-modal__title')}>Welcome back</p>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className={cx('login-modal__form')} onSubmit={onSubmit}>
            <Input
              isDarkTheme={isDarkTheme}
              name="username"
              label="Email"
              onChange={handleChangeInput}
              error={errors.username?.message?.toString()}
            />
            <InputPassword
              isDarkTheme={isDarkTheme}
              name="password"
              label="Password"
              onChange={handleChangeInput}
              error={errors.password?.message?.toString()}
            />
            <Button
              className={cx('login-modal__form-btn')}
              isDarkTheme={isDarkTheme}
              variant="default"
              type="submit"
              disabled={!isValid}
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
