import { useEffect, useRef } from 'react';
import { setStyleIsToggleScroll } from '@/utils/setStyleIsToggleScroll';

export const useToggleScroll = (isShow: boolean, theme: string) => {
  const bodyRef = useRef(document.body);
  const scrollWidth = window.innerWidth - document.documentElement.offsetWidth;

  useEffect(() => {
    if (isShow) {
      setStyleIsToggleScroll(bodyRef.current, 'hidden', `${scrollWidth}px`, theme);
    }

    return () => {
      if (bodyRef.current.children.length > 2) return;
      setStyleIsToggleScroll(bodyRef.current, 'scroll', '', theme);
    };
  }, [isShow]);
};
