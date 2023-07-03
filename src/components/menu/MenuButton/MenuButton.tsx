import { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames/bind';

import { MenuSidebar } from '@/components/Menu/MenuSidebar';
import { ReactComponent as BurgerIcon } from '@/assets/svg/buger_icon.svg';
import styles from './MenuButton.module.scss';

const cx = cn.bind(styles);

interface MenuButtonProps {
  theme: string;
}

export const MenuButton: FC<MenuButtonProps> = memo(({ theme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleCloseSidebar = useCallback(() => setIsShow(false), []);

  return (
    <>
      <button
        className={cx('menu-button', `menu-button_${theme}`)}
        type="button"
        aria-label="Menu"
        onClick={() => setIsShow(true)}
      >
        <BurgerIcon />
      </button>

      <MenuSidebar theme={theme} isShow={isShow} onClose={handleCloseSidebar} />
    </>
  );
});
