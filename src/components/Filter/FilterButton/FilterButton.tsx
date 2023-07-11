import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { FilterSidebar } from '@/components/Filter/FilterSidebar';

import { ReactComponent as FilterIcon } from '@/assets/svg/filter_icon.svg';

interface FilterButtonProps {
  theme: string;
}

export const FilterButton: FC<FilterButtonProps> = memo(({ theme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowSidebar = useCallback(() => setIsShow(true), [setIsShow]);
  const handleCloseSidebar = useCallback(() => setIsShow(false), [setIsShow]);

  return (
    <>
      <Button theme={theme} variant="icon" aria-label="Filter" onClick={handleShowSidebar}>
        <FilterIcon />
      </Button>

      <FilterSidebar theme={theme} isShowSidebar={isShow} onCloseSidebar={handleCloseSidebar} />
    </>
  );
});
