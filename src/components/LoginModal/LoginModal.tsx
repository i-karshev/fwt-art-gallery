import React, { FC, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authApi } from '@/api/features/authApi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useFingerprint } from '@/hooks/useFingerprint';
import { AuthContext } from '@/context/AuthProvider';
import { schema } from '@/schemas/authSchema';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Link } from '@/components/ui/Link';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import loginImage from '@/assets/img/login-img.jpg';

import styles from './LoginModal.module.scss';

const cx = cn.bind(styles);

type FormData = yup.InferType<typeof schema>;

interface LoginModalProps {
  isDarkTheme: boolean;
}

export const LoginModal: FC<LoginModalProps> = ({ isDarkTheme }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ criteriaMode: 'all', mode: 'onBlur', resolver: yupResolver(schema) });

  const loginModalRef = useRef(null);
  const fingerprint = useFingerprint();
  const [login, { isSuccess }] = authApi.useLoginMutation();
  const { isAuth, onLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => navigate(-1);

  const onSubmit = handleSubmit(({ username, password }) => {
    login({ username, password, fingerprint });
  });

  useOutsideClick(loginModalRef, handleCloseModal);

  useEffect(() => {
    if (isSuccess) {
      onLogin();
      reset();
    }

    if (isAuth) {
      handleCloseModal();
    }
  }, [isSuccess, isAuth]);

  return (
    <Modal isDarkTheme={isDarkTheme}>
      <div ref={loginModalRef} className={cx('login-modal', { 'login-modal_dark': isDarkTheme })}>
        <img className={cx('login-modal__img')} src={loginImage} alt="login" loading="lazy" />
        <div className={cx('login-modal__content')}>
          <p className={cx('login-modal__title')}>Welcome back</p>
          <form className={cx('login-modal__form')} onSubmit={onSubmit}>
            <Input
              isDarkTheme={isDarkTheme}
              {...register('username')}
              label="Email"
              error={errors.username?.message?.toString()}
            />
            <InputPassword
              isDarkTheme={isDarkTheme}
              register={register('password')}
              label="Password"
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
            <Link isDarkTheme={isDarkTheme} to="/register" state={{ background: location }}>
              sign up
            </Link>
          </p>
        </div>
        <button type="button" className={cx('login-modal__close-btn')} onClick={handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};
