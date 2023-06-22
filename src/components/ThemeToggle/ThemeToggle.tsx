import { FC, useContext } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '@/context/ThemeProvider';
import { ReactComponent as LightIcon } from '@/assets/svg/light_icon.svg';
import { ReactComponent as DarkIcon } from '@/assets/svg/dark_icon.svg';
import styles from './ThemeToggle.module.scss';

const cx = cn.bind(styles);

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={cx('theme-toggle', { 'theme-toggle_dark': isDarkTheme }, className)}
      onClick={toggleTheme}
    >
      <div className={cx('theme-toggle__icon')}>{isDarkTheme ? <LightIcon /> : <DarkIcon />}</div>
      <span className={cx('theme-toggle__text')}>{isDarkTheme ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
};
