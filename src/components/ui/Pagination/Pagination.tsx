import React, { FC, memo } from 'react';
import cn from 'classnames/bind';

import { usePagination, DOTS } from '@/hooks/usePagination';

import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_small.svg';
import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

interface PaginationProps {
  theme: string;
  currentPage: number;
  totalCount: number;
  onChangePage: (page: number) => void;
  className?: string;
}

export const Pagination: FC<PaginationProps> = memo(
  ({ theme, currentPage, totalCount, onChangePage, className }) => {
    const paginationRange = usePagination({
      currentPage,
      totalCount,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
      <div className={cx('pagination', `pagination_${theme}`, className)}>
        <button
          className={cx('pagination__btn')}
          type="button"
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <ArrowIcon className={cx('pagination__arrow-icon-left')} />
        </button>

        <div className={cx('pagination__pages-numbers')}>
          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              const key = `${DOTS}${index}`;

              return (
                <span key={key} className={cx('pagination__btn', 'pagination__dots')}>
                  &#8230;
                </span>
              );
            }

            return (
              <button
                key={pageNumber}
                type="button"
                className={cx('pagination__btn', 'pagination__page-btn', {
                  'pagination__page-btn_active': pageNumber === currentPage,
                })}
                onClick={() => onChangePage(pageNumber as number)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          className={cx('pagination__btn')}
          type="button"
          disabled={currentPage === lastPage}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <ArrowIcon className={cx('pagination__arrow-icon-right')} />
        </button>
      </div>
    );
  }
);
