import { useEffect, useState } from 'react';

export const usePaginationPageSize = () => {
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      let count = window.innerWidth >= 768 ? 8 : 4;
      if (window.innerWidth >= 1280) count = 9;

      setPageSize(count);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return pageSize;
};
