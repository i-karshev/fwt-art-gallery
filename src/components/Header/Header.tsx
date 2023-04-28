import React, { useContext, useState } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '@/context/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Container } from '@/components/Container';

import { ReactComponent as LogoIcon } from '@/assets/svg/logo.svg';
import { ReactComponent as BurgerIcon } from '@/assets/svg/buger_icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

export const Header = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggleMenu = () => setIsOpenMenu((prev) => !prev);

  return (
    <header className={cx('header', { header_dark: isDarkTheme })}>
      <Container>
        <div className={cx('header__container')}>
          <div className="header__logo">
            <LogoIcon />
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
                <li className={cx('header__item')}>Log In</li>
                <li className={cx('header__item')}>Sing Up</li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};
