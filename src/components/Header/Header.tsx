import React, { useContext, useState } from 'react';

import { ThemeContext } from '../../context/ThemeProvider';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import { ReactComponent as BurgerIcon } from '../../assets/svg/buger_icon.svg';

import styles from './Header.module.scss';
import { ThemeToggle } from '../ThemeToggle';

export const Header = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <header>
      <div className={styles.header__content}>
        <a href="/" className={styles.logo}>
          <LogoIcon />
        </a>
        <div
          className={!isOpenMenu ? styles.header__content__menu_open : styles.header__content__menu}
        >
          <nav className={styles.nav}>
            <ul>
              <li>Log In</li>
              <li>Sing Up</li>
            </ul>
            <ThemeToggle />
          </nav>
        </div>
        <div role="presentation" onClick={handleOpenMenu} className={styles.menu__btn}>
          <BurgerIcon />
        </div>
      </div>
    </header>
  );
};
