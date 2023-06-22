import { useEffect, useRef } from 'react';
import { setStyleIsToggleScroll } from '@/utils/setStyleIsToggleScroll';

export const useToggleScroll = (isShow: boolean, isDarkTheme: boolean) => {
  const bodyRef = useRef(document.body);
  const scrollWidth = window.innerWidth - document.documentElement.offsetWidth;

  useEffect(() => {
    if (isShow) {
      setStyleIsToggleScroll(bodyRef.current, 'hidden', `${scrollWidth}px`, isDarkTheme);
    }

    return () => {
      if (bodyRef.current.children.length > 2) return;
      setStyleIsToggleScroll(bodyRef.current, 'scroll', '', isDarkTheme);
    };
  }, [isShow]);
};
