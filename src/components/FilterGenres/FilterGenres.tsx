import React, { FC, memo, useCallback } from 'react';
import cn from 'classnames/bind';

import { IGenre } from '@/types/IGenre';
import styles from './FilterGenres.module.scss';

const cx = cn.bind(styles);

interface FilterGenresProps {
  isDarkTheme: boolean;
  genres: IGenre[];
  selected: string[];
  onChange: (items: string[]) => void;
}

export const FilterGenres: FC<FilterGenresProps> = memo(
  ({ isDarkTheme, genres = [], selected = [], onChange }) => {
    const handleToggleSelected = useCallback(
      (id: string) =>
        onChange(
          selected?.includes(id) ? selected?.filter((item) => item !== id) : selected?.concat(id)
        ),
      [selected]
    );

    return (
      <div className={cx('filter-genres', { 'filter-genres_dark': isDarkTheme })}>
        {genres?.map(({ _id: id, name }) => (
          <label
            key={id}
            className={cx('filter-genres__item')}
            htmlFor={id}
            role="presentation"
            onClick={() => handleToggleSelected(id)}
          >
            <input
              type="checkbox"
              name={id}
              className={cx('filter-genres__input')}
              checked={selected?.includes(id)}
              readOnly
            />
            <p className={cx('filter-genres__text')}>{name}</p>
          </label>
        ))}
      </div>
    );
  }
);
