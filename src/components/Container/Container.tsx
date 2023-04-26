import React, { FC, ReactNode } from 'react';
import cn from 'classnames/bind';

import styles from './Container.module.scss';

const cx = cn.bind(styles);

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => (
  <div className={cx('container')}>{children}</div>
);