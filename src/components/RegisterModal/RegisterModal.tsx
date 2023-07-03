import React, { FC, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
import registerImage from '@/assets/img/register-img.jpg';

import styles from './RegisterModal.module.scss';

const cx = cn.bind(styles);

type FormData = yup.InferType<typeof schema>;

interface RegisterModalProps {
  theme: string;
}

export const RegisterModal: FC<RegisterModalProps> = ({ theme }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ criteriaMode: 'all', mode: 'onBlur', resolver: yupResolver(schema) });

  const fingerprint = useFingerprint();
  const [registerUser, { isSuccess }] = authApi.useRegisterMutation();
  const { isAuth, onLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => navigate(-1);

  const onSubmit = handleSubmit(({ username, password }) =>
    registerUser({ username, password, fingerprint })
  );

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
      <div className={cx('register-modal', `register-modal_${theme}`)}>
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
              className={cx('register-modal__form-btn')}
              theme={theme}
              variant="default"
              type="submit"
              disabled={!isValid}
            >
              Sign up
            </Button>
          </form>
          <p className={cx('register-modal__log-in')}>
            If you already have an account, please{' '}
            <Link theme={theme} to="/login" state={{ background: location }}>
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
