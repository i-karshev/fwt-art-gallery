import React, { useEffect, useState } from 'react';

export const useOnScreen = (ref: React.MutableRefObject<HTMLElement | null>, threshold = 0) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
};
