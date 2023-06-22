import { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames/bind';

import { MenuSidebar } from '@/components/menu/MenuSidebar';
import { ReactComponent as BurgerIcon } from '@/assets/svg/buger_icon.svg';
import styles from './MenuButton.module.scss';

const cx = cn.bind(styles);

interface MenuButtonProps {
  isDarkTheme: boolean;
}

export const MenuButton: FC<MenuButtonProps> = memo(({ isDarkTheme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleCloseSidebar = useCallback(() => setIsShow(false), []);

  return (
    <>
      <button
        className={cx('menu-button', { 'menu-button_dark': isDarkTheme })}
        type="button"
        onClick={() => setIsShow(true)}
      >
        <BurgerIcon />
      </button>

      <MenuSidebar isDarkTheme={isDarkTheme} isShow={isShow} onClose={handleCloseSidebar} />
    </>
  );
});
