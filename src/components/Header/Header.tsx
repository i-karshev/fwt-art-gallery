import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authActions } from '@/store/reducers/AuthSlice';
import { ThemeContext } from '@/context/ThemeProvider';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Container } from '@/components/Container';
import { LoginModal } from '@/components/LoginModal';
import { RegisterModal } from '@/components/RegisterModal';

import { ReactComponent as LogoIcon } from '@/assets/svg/logo.svg';
import { ReactComponent as BurgerIcon } from '@/assets/svg/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useContext(ThemeContext);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);

  const handleToggleMenu = () => setIsOpenMenu((prev) => !prev);
  const handleToggleLoginModal = () => setIsShowLoginModal((prev) => !prev);
  const handleToggleRegisterModal = () => setIsShowRegisterModal((prev) => !prev);
  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <header className={cx('header', { header_dark: isDarkTheme })}>
      <Container>
        <div className={cx('header__container')}>
          <div className="header__logo">
            <Link to="/" className={cx('header__logo')}>
              <LogoIcon />
            </Link>
          </div>
          <div className={cx('header__nav-wrapper')}>
            <div role="presentation" onClick={handleToggleMenu} className={cx('header__open-btn')}>
              <BurgerIcon />
            </div>
            <nav className={cx('header__nav', { header__nav_open: isOpenMenu })}>
              <div
                role="presentation"
                onClick={handleToggleMenu}
                className={cx('header__close-btn')}
              >
                <CloseIcon />
              </div>
              <ThemeToggle />

              <ul className={cx('header__list')}>
                {isAuth ? (
                  <li role="presentation" className={cx('header__item')} onClick={handleLogout}>
                    Log Out
                  </li>
                ) : (
                  <>
                    <li
                      role="presentation"
                      className={cx('header__item')}
                      onClick={handleToggleLoginModal}
                    >
                      Log In
                    </li>
                    <li
                      role="presentation"
                      className={cx('header__item')}
                      onClick={handleToggleRegisterModal}
                    >
                      Sing Up
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
      <LoginModal
        isDarkTheme={isDarkTheme}
        isShowModal={isShowLoginModal}
        onCloseModal={handleToggleLoginModal}
      />
      <RegisterModal
        isDarkTheme={isDarkTheme}
        isShowModal={isShowRegisterModal}
        onCloseModal={handleToggleRegisterModal}
      />
    </header>
  );
};
