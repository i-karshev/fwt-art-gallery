import { FC, useContext } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '@/context/ThemeProvider';
import { ReactComponent as LightIcon } from '@/assets/svg/light_icon.svg';
import { ReactComponent as DarkIcon } from '@/assets/svg/dark_icon.svg';
import styles from './ThemeToggle.module.scss';

const cx = cn.bind(styles);

const icons = {
  light: <DarkIcon />,
  dark: <LightIcon />,
};

const texts = {
  light: 'Dark mode',
  dark: 'Light mode',
};

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={cx('theme-toggle', `theme-toggle_${theme}`, className)}
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <div className={cx('theme-toggle__icon')}>{icons[theme]}</div>
      <span className={cx('theme-toggle__text')}>{texts[theme]}</span>
    </button>
  );
};
