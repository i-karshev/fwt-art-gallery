import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { FilterSidebar } from '@/components/Filter/FilterSidebar';

import { ReactComponent as FilterIcon } from '@/assets/svg/filter_icon.svg';

interface FilterButtonProps {
  isDarkTheme: boolean;
}

export const FilterButton: FC<FilterButtonProps> = memo(({ isDarkTheme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowSidebar = useCallback(() => setIsShow(true), [setIsShow]);
  const handleCloseSidebar = useCallback(() => setIsShow(false), [setIsShow]);

  return (
    <>
      <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleShowSidebar}>
        <FilterIcon />
      </Button>

      <FilterSidebar
        isDarkTheme={isDarkTheme}
        isShowSidebar={isShow}
        onCloseSidebar={handleCloseSidebar}
      />
    </>
  );
});
