import React, { useContext, useRef, useState } from 'react';
import cn from 'classnames/bind';

import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search } from '@/components/Search';
import { MenuItem } from '@/components/ui/MenuItem';
import { MenuButton } from '@/components/menu/MenuButton';

import { ReactComponent as LogoIcon } from '@/assets/svg/logo.svg';
import { ReactComponent as SearchIcon } from '@/assets/svg/search_icon.svg';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

export const Header = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuth, onLogout } = useContext(AuthContext);
  const location = useLocation();

  const searchRef = useRef<HTMLDivElement | null>(null);
  const [isShowSearch, setIsShowSearch] = useState(false);
  useOutsideClick(searchRef, () => setIsShowSearch(false));

  return (
    <header className={cx('header', { header_dark: isDarkTheme })}>
      <Container>
        <div className={cx('header__wrapper')}>
          <div className={cx('header__logo', { header__logo_hide: isShowSearch })}>
            <Link to="/" style={{ color: 'inherit' }}>
              <LogoIcon />
            </Link>
          </div>

          <div className={cx('header__search-wrapper')} ref={searchRef}>
            <button
              type="button"
              className={cx('header__search-btn', { 'header__search-btn_hide': isShowSearch })}
              onClick={() => setIsShowSearch(true)}
            >
              <SearchIcon />
            </button>

            <Search
              isDarkTheme={isDarkTheme}
              className={cx('header__search', { header__search_show: isShowSearch })}
            />
          </div>

          <div className={cx('header__menu-wrapper')}>
            <ul className={cx('header__menu')}>
              {isAuth ? (
                <li>
                  <MenuItem isDarkTheme={isDarkTheme} text="Logout" onClick={onLogout} />
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      state={{ background: location }}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuItem isDarkTheme={isDarkTheme} text="Log In" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/register"
                      state={{ background: location }}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuItem isDarkTheme={isDarkTheme} text="Sing up" />
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <MenuButton isDarkTheme={isDarkTheme} />
            <ThemeToggle className={cx('header__theme')} />
          </div>
        </div>
      </Container>
    </header>
  );
};
