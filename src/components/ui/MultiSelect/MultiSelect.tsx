import React, { FC, memo, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useController, FieldValues, Control } from 'react-hook-form';
import cn from 'classnames/bind';

import { ArtistFormData } from '@/components/ArtistModal';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Label } from '@/components/ui/Label';

import { ReactComponent as ArrowIcon } from '@/assets/svg/expand_icon.svg';
import { ReactComponent as CheckboxIcon } from '@/assets/svg/success_icon.svg';
import { ReactComponent as ErrorIcon } from '@/assets/svg/error_icon.svg';

import styles from './MultiSelect.module.scss';

const cx = cn.bind(styles);

export type TOption = {
  id: string;
  name: string;
};

interface SelectProps {
  theme: string;
  label?: string;
  className?: string;
  options?: TOption[];
  selected?: TOption[];
  name: string;
  control: Control<ArtistFormData & FieldValues>;
  error?: string;
}

export const MultiSelect: FC<SelectProps> = memo(
  ({ theme, label, options, selected, className, name, control, error }) => {
    const { field } = useController({ name, control });
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState<TOption[]>(selected || []);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = () => setIsOpenDropdown((prev) => !prev);
    const handleCloseDropdown = () => setIsOpenDropdown(false);

    const isSelectedItem = useMemo(
      () => (item: TOption) => {
        if (selectedItems.length) {
          const arr = selectedItems?.map((m) => JSON.stringify(m));
          return arr.includes(JSON.stringify(item));
        }

        return false;
      },
      [selectedItems]
    );

    const handleToggleSelectedItem = useCallback(
      (option: TOption) => {
        const newSelectedItems = isSelectedItem(option)
          ? selectedItems.filter((item) => item.id !== option.id)
          : selectedItems.concat(option);

        setSelectedItems(newSelectedItems);
        field.onChange(newSelectedItems);
      },
      [setSelectedItems, selectedItems]
    );

    useOutsideClick(multiSelectRef, handleCloseDropdown);

    useEffect(() => {
      if (selected?.length) {
        field.onChange(selected);
      }
    }, []);

    return (
      <div className={cx('multi-select', `multi-select_${theme}`, className)} ref={multiSelectRef}>
        {label && <p className={cx('multi-select__label')}>{label}</p>}
        <div
          className={cx('multi-select__select', {
            'multi-select__select_open': isOpenDropdown,
          })}
          role="presentation"
          onClick={handleToggleDropdown}
          tabIndex={0}
        >
          <div className={cx('multi-select__selected')}>
            {selectedItems?.map((item) => (
              <Label
                theme={theme}
                key={item.id}
                name={item.name}
                className={cx('multi-select__selected-label')}
                onClose={() => handleToggleSelectedItem(item)}
              />
            ))}
          </div>

          <ArrowIcon
            className={cx('multi-select__arrow-icon', {
              'multi-select__arrow-icon_open': isOpenDropdown,
            })}
          />
        </div>

        {error && (
          <div className={cx('multi-select__error-message')}>
            <ErrorIcon />
            <span>{error}</span>
          </div>
        )}

        {isOpenDropdown && (
          <ul className={cx('multi-select__options')}>
            {options?.map((option) => (
              <li
                className={cx('multi-select__option')}
                key={option.id}
                role="presentation"
                onClick={() => handleToggleSelectedItem(option)}
              >
                <label htmlFor={option.id} className={cx('multi-select__option-checkbox')}>
                  <input
                    className={cx('multi-select__option-checkbox-input')}
                    type="checkbox"
                    id={option.id}
                    checked={isSelectedItem(option)}
                    readOnly
                  />
                  <CheckboxIcon className={cx('multi-select__option-checkbox-icon')} />
                </label>
                <p>{option.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
