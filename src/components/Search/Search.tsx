import React, { ChangeEvent, FC, InputHTMLAttributes, memo, useContext, useEffect } from 'react';
import cn from 'classnames/bind';

import { FilterContext } from '@/context/FilterProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/Input';

import { ReactComponent as SearchIcon } from '@/assets/svg/search_icon.svg';
import { ReactComponent as ClearIcon } from '@/assets/svg/close_icon_small.svg';

import styles from './Search.module.scss';

const cx = cn.bind(styles);

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme?: boolean;
  onChangeValue?: (value: string) => void;
}

export const Search: FC<SearchProps> = memo(
  ({ isDarkTheme, placeholder = 'Search', className, onChangeValue, ...other }) => {
    const { filters, changeFilters, clearSearch } = useContext(FilterContext);
    const [debouncedValue, value, setValue] = useDebounce(filters.name || '', 500);

    const handleClearValue = () => {
      setValue('');
      clearSearch();
    };

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value);

    useEffect(() => {
      if (!debouncedValue) {
        clearSearch();
        return;
      }

      changeFilters({ ...filters, name: debouncedValue });
    }, [debouncedValue]);

    return (
      <Input
        isDarkTheme={false}
        className={cx('input-search', className)}
        placeholder={placeholder}
        type="text"
        name="search"
        value={value}
        onChange={handleChangeValue}
        {...other}
        renderAddon={
          <>
            <SearchIcon className={cx('input-search__search-icon')} />

            {value && (
              <button
                className={cx('input-search__clear-btn')}
                type="button"
                onClick={handleClearValue}
              >
                <ClearIcon />
              </button>
            )}
          </>
        }
      />
    );
  }
);
