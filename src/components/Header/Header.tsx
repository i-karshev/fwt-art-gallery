import React, { useCallback, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames/bind';

import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Container } from '@/components/Container';
import { Link } from '@/components/ui/Link';

import { ReactComponent as LogoIcon } from '@/assets/svg/logo.svg';
import { ReactComponent as BurgerIcon } from '@/assets/svg/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

export const Header = () => {
  const location = useLocation();
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth, onLogout } = useContext(AuthContext);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggleMenu = () => setIsOpenMenu((prev) => !prev);
  const handleLogout = useCallback(() => onLogout(), []);

  return (
    <header className={cx('header', { header_dark: isDarkTheme })}>
      <Container>
        <div className={cx('header__container')}>
          <div className="header__logo">
            <Link to="/" className={cx('header__logo')} isDarkTheme={isDarkTheme}>
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
                    <Link
                      className={cx('header__item')}
                      isDarkTheme={isDarkTheme}
                      to="/login"
                      state={{ background: location }}
                    >
                      Log In
                    </Link>

                    <Link
                      className={cx('header__item')}
                      isDarkTheme={isDarkTheme}
                      to="/register"
                      state={{ background: location }}
                    >
                      Sing Up
                    </Link>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};
