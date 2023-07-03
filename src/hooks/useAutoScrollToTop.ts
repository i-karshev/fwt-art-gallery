import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAutoScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);
};
