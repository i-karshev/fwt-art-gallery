import React, { useState, useEffect, useRef } from 'react';

export interface TransitionProps {
  mount: boolean;
  duration: number;
  onEnter: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExited: () => void;
  children: React.ReactNode;
}

const rafWrapper = (fn: FrameRequestCallback) => requestAnimationFrame(fn);

export const Transition = ({
  onEnter,
  onEntered,
  onExit,
  onExited,
  children,
  mount = false,
  duration = 0,
}: Partial<TransitionProps>) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (mount) {
      setTransition(false);
    } else {
      timeoutId.current = setTimeout(() => {
        setTransition(true);
      }, duration);
    }

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [mount, duration]);

  useEffect(() => {
    if (mount && !transition && onEnter) rafWrapper(onEnter);
    if (mount && transition && onEntered) rafWrapper(onEntered);
    if (!mount && !transition && onExit) rafWrapper(onExit);
    if (!mount && transition && onExited) rafWrapper(onExited);
  }, [mount, onEnter, onEntered, onExit, onExited, transition]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return mount || !transition ? <>{children}</> : null;
};
