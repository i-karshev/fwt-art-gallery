import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { authApi } from '@/api/features/authApi';
import { useFingerprint } from '@/hooks/useFingerprint';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Link } from '@/components/ui/Link';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import registerImage from '@/assets/img/register-img.jpg';

import styles from './RegisterModal.module.scss';
import { useAppSelector } from '@/hooks/redux';

const cx = cn.bind(styles);

const schema = yup.object({
  username: yup
    .string()
    .required('This field is required.')
    .min(4, 'Email length must be at least 4 characters.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
  password: yup
    .string()
    .required('This field is required.')
    .min(8, 'Password length must be at least 8 characters.'),
});

type FormData = yup.InferType<typeof schema>;

interface RegisterModalProps {
  isDarkTheme: boolean;
}

export const RegisterModal: FC<RegisterModalProps> = ({ isDarkTheme }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ criteriaMode: 'all', mode: 'onBlur', resolver: yupResolver(schema) });

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const registerModalRef = useRef(null);
  const fingerprint = useFingerprint();
  const [registerUser, { isSuccess }] = authApi.useRegisterMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => navigate(-1);

  const onSubmit = handleSubmit(({ username, password }) =>
    registerUser({ username, password, fingerprint })
  );

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as 'username' | 'password';
    setValue(name, event.target.value, { shouldValidate: true });
  }, []);

  useOutsideClick(registerModalRef, handleCloseModal);

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleCloseModal();
    }

    if (isAuth) {
      navigate('/');
    }
  }, [isSuccess, isAuth]);

  return (
    <Modal isDarkTheme={isDarkTheme}>
      <div
        ref={registerModalRef}
        className={cx('register-modal', { 'register-modal_dark': isDarkTheme })}
      >
        <img
          className={cx('register-modal__img')}
          src={registerImage}
          alt="register"
          loading="lazy"
        />
        <div className={cx('register-modal__content')}>
          <p className={cx('register-modal__title')}>Create your profile</p>
          <form className={cx('register-modal__form')} onSubmit={onSubmit}>
            <Input
              isDarkTheme={isDarkTheme}
              {...register('username')}
              label="Email"
              onChange={handleChangeInput}
              error={errors.username?.message?.toString()}
            />
            <InputPassword
              isDarkTheme={isDarkTheme}
              {...register('password')}
              label="Password"
              onChange={handleChangeInput}
              error={errors.password?.message?.toString()}
            />
            <Button
              className={cx('register-modal__form-btn')}
              isDarkTheme={isDarkTheme}
              variant="default"
              type="submit"
              disabled={!isValid}
            >
              Sign up
            </Button>
          </form>
          <p className={cx('register-modal__log-in')}>
            If you already have an account, please{' '}
            <Link isDarkTheme={isDarkTheme} to="/login" state={{ background: location }}>
              log in
            </Link>
          </p>
        </div>
        <button
          type="button"
          className={cx('register-modal__close-btn')}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};
