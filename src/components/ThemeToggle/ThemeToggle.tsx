import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

import styles from './ThemeToggle.module.scss';
import { ReactComponent as LightIcon } from '../../assets/svg/light_icon.svg';
import { ReactComponent as DarkIcon } from '../../assets/svg/dark_icon.svg';

export const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      role="presentation"
      className={`${styles.themeToggle} ${
        isDarkTheme ? styles.themeToggle_dark : styles.themeToggle_light
      }`}
      onClick={toggleTheme}
    >
      {isDarkTheme ? <LightIcon /> : <DarkIcon />}
    </div>
  );
};
