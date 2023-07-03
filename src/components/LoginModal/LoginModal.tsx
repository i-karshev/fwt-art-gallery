import React, { FC, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authApi } from '@/api/features/authApi';
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
  theme: string;
}

export const LoginModal: FC<LoginModalProps> = ({ theme }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ criteriaMode: 'all', mode: 'onBlur', resolver: yupResolver(schema) });

  const fingerprint = useFingerprint();
  const [login, { isSuccess }] = authApi.useLoginMutation();
  const { isAuth, onLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => navigate(-1);

  const onSubmit = handleSubmit(({ username, password }) => {
    login({ username, password, fingerprint });
  });

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
    <Modal theme={theme} onClose={handleCloseModal}>
      <div className={cx('login-modal', `login-modal_${theme}`)}>
        <img className={cx('login-modal__img')} src={loginImage} alt="login" loading="lazy" />
        <div className={cx('login-modal__content')}>
          <p className={cx('login-modal__title')}>Welcome back</p>
          <form className={cx('login-modal__form')} onSubmit={onSubmit}>
            <Input
              theme={theme}
              {...register('username')}
              label="Email"
              error={errors.username?.message?.toString()}
            />
            <InputPassword
              theme={theme}
              register={register('password')}
              label="Password"
              error={errors.password?.message?.toString()}
            />
            <Button
              className={cx('login-modal__form-btn')}
              theme={theme}
              variant="default"
              type="submit"
              disabled={!isValid}
            >
              Log In
            </Button>
          </form>
          <p className={cx('login-modal__sing-up')}>
            If you don&apos;t have an account yet, please{' '}
            <Link theme={theme} to="/register" state={{ background: location }}>
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
