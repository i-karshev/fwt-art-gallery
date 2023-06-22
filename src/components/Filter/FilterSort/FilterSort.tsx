import React, { FC, memo } from 'react';
import cn from 'classnames/bind';

import styles from './FilterSort.module.scss';

const cx = cn.bind(styles);

export type TSort = 'asc' | 'desc' | null;

interface FilterSortProps {
  isDarkTheme: boolean;
  selected?: TSort;
  onChange: (sort: TSort) => void;
}

export const FilterSort: FC<FilterSortProps> = memo(({ isDarkTheme, selected, onChange }) => {
  const handleSelectSort = (type: TSort) => () => onChange(type);

  return (
    <div className={cx('filter-sort', { 'filter-sort_dark': isDarkTheme })}>
      <p
        className={cx('filter-sort__item', { 'filter-sort__item_selected': selected === null })}
        role="presentation"
        onClick={handleSelectSort(null)}
      >
        Recently added
      </p>
      <p
        className={cx('filter-sort__item', { 'filter-sort__item_selected': selected === 'asc' })}
        role="presentation"
        onClick={handleSelectSort('asc')}
      >
        A-Z
      </p>
      <p
        className={cx('filter-sort__item', { 'filter-sort__item_selected': selected === 'desc' })}
        role="presentation"
        onClick={handleSelectSort('desc')}
      >
        Z-A
      </p>
    </div>
  );
});
