import { useEffect, RefObject } from 'react';

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  const handleClick = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchend', handleClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchend', handleClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref]);
};
