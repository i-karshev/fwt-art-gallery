import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';
import { ArtistModal } from '@/components/ArtistModal';

interface ArtistAddButtonProps {
  isDarkTheme: boolean;
}

export const ArtistAddButton: FC<ArtistAddButtonProps> = memo(({ isDarkTheme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [setIsShow]);

  return (
    <>
      <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleToggleIsShow}>
        <PlusIcon />
        Add artist
      </Button>

      <ArtistModal
        isDarkTheme={isDarkTheme}
        isShowModal={isShow}
        onCloseModal={handleToggleIsShow}
      />
    </>
  );
});
