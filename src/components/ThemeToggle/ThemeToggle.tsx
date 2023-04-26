import React, { useContext } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '../../context/ThemeProvider';
import { ReactComponent as LightIcon } from '../../assets/svg/light_icon.svg';
import { ReactComponent as DarkIcon } from '../../assets/svg/dark_icon.svg';
import styles from './ThemeToggle.module.scss';

const cx = cn.bind(styles);

export const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      role="presentation"
      className={cx('theme-toggle', { 'theme-toggle_dark': isDarkTheme })}
      onClick={toggleTheme}
    >
      {isDarkTheme ? (
        <>
          <div className={cx('theme-toggle__icon')}>
            <LightIcon />
          </div>
          <span className={cx('theme-toggle__text')}>Light mode</span>
        </>
      ) : (
        <>
          <div className={cx('theme-toggle__icon')}>
            <DarkIcon />
          </div>
          <span className={cx('theme-toggle__text')}>Dark mode</span>
        </>
      )}
    </div>
  );
};