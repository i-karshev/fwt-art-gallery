import React, { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames/bind';

import { AuthContext } from '@/context/AuthProvider';

import { Sidebar } from '@/components/ui/Sidebar';
import { MenuItem } from '@/components/ui/MenuItem';
import { ThemeToggle } from '@/components/ThemeToggle';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';
import styles from './MenuSidebar.module.scss';

const cx = cn.bind(styles);

interface MenuSidebarProps {
  theme: string;
  isShow: boolean;
  onClose: () => void;
}

export const MenuSidebar: FC<MenuSidebarProps> = ({ theme, isShow, onClose }) => {
  const { isAuth, onLogout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Sidebar theme={theme} isShow={isShow} onClose={onClose} className={cx('menu-sidebar_hide')}>
      <div className={cx('menu-sidebar', `menu-sidebar_${theme}`)}>
        <div className={cx('menu-sidebar__wrapper')}>
          <ThemeToggle />
          <ul className={cx('menu-sidebar__menu')}>
            {isAuth ? (
              <li>
                <MenuItem
                  className={cx('menu-sidebar__menu-item')}
                  theme={theme}
                  text="Logout"
                  onClick={onLogout}
                />
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    state={{ background: location }}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem
                      className={cx('menu-sidebar__menu-item')}
                      theme={theme}
                      text="Log In"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    state={{ background: location }}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem
                      className={cx('menu-sidebar__menu-item')}
                      theme={theme}
                      text="Sing up"
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <button type="button" className={cx('menu-sidebar__close-btn')} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </Sidebar>
  );
};
