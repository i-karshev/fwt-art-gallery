import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import cn from 'classnames/bind';

import styles from './ActionBar.module.scss';

const cx = cn.bind(styles);

interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
}

export const ActionBar: FC<ActionBarProps> = memo(
  ({ renderLeft, renderRight, className, ...other }) => (
    <div className={cx('action-bar', className)} {...other}>
      {renderLeft && <div className={cx('action-bar__left')}>{renderLeft}</div>}
      {renderRight && <div className={cx('action-bar__right')}>{renderRight}</div>}
    </div>
  )
);
