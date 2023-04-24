import React, { useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../context/ThemeProvider';
import { ThemeToggle } from '../ThemeToggle';

import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import { ReactComponent as BurgerIcon } from '../../assets/svg/buger_icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close_icon.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const handleToggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (width > 1280 && isOpenMenu) {
      setIsOpenMenu(false);
    }
  }, [width, isOpenMenu]);

  return (
    <header className={`${styles.header} ${isDarkTheme ? styles.header_dark : ''}`}>
      <div className={styles.header__container}>
        <div className="header__logo">
          <LogoIcon />
        </div>
        <div className={`${styles.header__nav} ${isDarkTheme ? styles.nav_dark : ''}`}>
          <div role="presentation" onClick={handleToggleMenu} className={styles.openBtn}>
            <BurgerIcon />
          </div>
          <nav className={`${styles.nav} ${isOpenMenu ? styles.open : ''}`}>
            <div role="presentation" onClick={handleToggleMenu} className={styles.closeBtn}>
              <CloseIcon />
            </div>
            <ThemeToggle />
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>Log In</li>
              <li className={styles.nav__item}>Sing Up</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
