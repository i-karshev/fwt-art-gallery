import { FC, memo, ReactNode, useRef } from 'react';
import cn from 'classnames/bind';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleScroll } from '@/hooks/useToggleScroll';

import styles from './Sidebar.module.scss';

const cx = cn.bind(styles);

interface SidebarProps {
  isDarkTheme: boolean;
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(
  ({ isDarkTheme, isShow, onClose, children, className }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useOutsideClick(ref, onClose);
    useToggleScroll(isShow, isDarkTheme);

    return (
      <div
        ref={ref}
        className={cx(
          'sidebar',
          {
            sidebar_dark: isDarkTheme,
            sidebar_show: isShow,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);
