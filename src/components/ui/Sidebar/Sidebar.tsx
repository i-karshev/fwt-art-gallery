import { FC, memo, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import { useOutsideClick } from '@/hooks/useOutsideClick';

import { useToggleScroll } from '@/hooks/useToggleScroll';

import { Transition } from '@/components/ui/Transition/Transition';

import styles from './Sidebar.module.scss';

const cx = cn.bind(styles);

interface SidebarProps {
  theme: string;
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ theme, isShow, onClose, children, className }) => {
  const bodyRef = useRef(document.body);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(sidebarRef, onClose);
  useToggleScroll(isShow, theme);

  const handleEnter = () => {
    const sidebar = sidebarRef.current;

    if (!sidebar) return;

    sidebar.style.opacity = '1';
    sidebar.style.transform = 'translateX(0)';
  };

  const sidebarJSX = (
    <Transition mount={isShow} duration={2000} onEnter={handleEnter}>
      <div
        ref={sidebarRef}
        className={cx('sidebar', `sidebar_${theme}`, { sidebar_show: isShow }, className)}
      >
        {children}
      </div>
    </Transition>
  );

  return createPortal(isShow ? sidebarJSX : null, bodyRef.current);
});
