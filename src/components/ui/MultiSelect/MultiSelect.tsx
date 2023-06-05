import React, { FC, memo, useState, useCallback, useRef } from 'react';
import cn from 'classnames/bind';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Label } from '@/components/ui/Label';
import { ReactComponent as ArrowIcon } from '@/assets/svg/expand_icon.svg';
import { ReactComponent as CheckboxIcon } from '@/assets/svg/success_icon.svg';

import styles from './MultiSelect.module.scss';

const cx = cn.bind(styles);

type TOption = {
  id: string;
  name: string;
};

interface SelectProps {
  isDarkTheme: boolean;
  label?: string;
  className: string;
  options?: TOption[];
  selected?: TOption[];
  onChange: (selected: TOption[]) => void;
}

export const MultiSelect: FC<SelectProps> = memo(
  ({ isDarkTheme, label, options, selected, onChange, className }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState<TOption[]>(selected || []);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = () => setIsOpenDropdown((prev) => !prev);
    const handleCloseDropdown = () => setIsOpenDropdown(false);

    const handleToggleSelectedItem = useCallback(
      (option: TOption) => () => {
        const newSelectedItems = selectedItems.includes(option)
          ? selectedItems.filter((item) => item.id !== option.id)
          : selectedItems.concat(option);

        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
      },
      [setSelectedItems, selectedItems]
    );

    useOutsideClick(multiSelectRef, handleCloseDropdown);

    return (
      <div
        className={cx('multi-select', { 'multi-select_dark': isDarkTheme }, className)}
        ref={multiSelectRef}
      >
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
                isDarkTheme={isDarkTheme}
                key={item.id}
                name={item.name}
                className={cx('multi-select__selected-label')}
                onClose={handleToggleSelectedItem(item)}
              />
            ))}
          </div>

          <ArrowIcon
            className={cx('multi-select__arrow-icon', {
              'multi-select__arrow-icon_open': isOpenDropdown,
            })}
          />
        </div>

        {isOpenDropdown && (
          <ul className={cx('multi-select__options')}>
            {options?.map((option) => (
              <li
                className={cx('multi-select__option')}
                key={option.id}
                role="presentation"
                onClick={handleToggleSelectedItem(option)}
              >
                <label htmlFor={option.id} className={cx('multi-select__option-checkbox')}>
                  <input
                    className={cx('multi-select__option-checkbox-input')}
                    type="checkbox"
                    id={option.id}
                    checked={selectedItems.includes(option)}
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
