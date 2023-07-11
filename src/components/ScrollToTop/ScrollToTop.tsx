import React, { useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames/bind';

import { ThemeContext } from '@/context/ThemeProvider';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_small.svg';
import styles from './ScrollToTop.module.scss';

const cx = cn.bind(styles);

export const ScrollToTop = () => {
  const { theme } = useContext(ThemeContext);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement;
      setIsShow(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isShow) {
    return null;
  }

  return (
    <button
      type="button"
      className={cx('button', `button_${theme}`)}
      aria-label="Scroll to up"
      onClick={handleScrollToTop}
    >
      <ArrowIcon />
    </button>
  );
};
