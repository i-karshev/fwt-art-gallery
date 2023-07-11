import React, { FC, memo, ReactNode, useState } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';
import { ReactComponent as MinusIcon } from '@/assets/svg/minus-icon.svg';

import styles from './FilterAccordion.module.scss';

const cx = cn.bind(styles);

interface FilterAccordionProps {
  theme: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const FilterAccordion: FC<FilterAccordionProps> = memo(
  ({ theme, title, children, className }) => {
    const [isShow, setIsShow] = useState(false);
    const handleToggleShow = () => setIsShow((prev) => !prev);

    return (
      <div className={cx('filter-accordion', `filter-accordion_${theme}`, className)}>
        <div
          className={cx('filter-accordion__header')}
          role="presentation"
          onClick={handleToggleShow}
        >
          <p className={cx('filter-accordion__title')}>{title}</p>

          {isShow ? (
            <MinusIcon className={cx('filter-accordion__icon')} />
          ) : (
            <PlusIcon className={cx('filter-accordion__icon')} />
          )}
        </div>

        <div
          className={cx('filter-accordion__content', { 'filter-accordion__content_show': isShow })}
        >
          {children}
        </div>
      </div>
    );
  }
);
