import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface Props {
  totalCount: number;
  currentPage: number;
}

export const usePagination = ({ totalCount, currentPage }: Props) =>
  useMemo(() => {
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 4;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 4;
      const rightRange = range(totalCount - rightItemCount + 1, totalCount);

      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [1, DOTS, ...middleRange, DOTS, totalCount];
    }

    return range(1, totalCount);
  }, [totalCount, currentPage]);
