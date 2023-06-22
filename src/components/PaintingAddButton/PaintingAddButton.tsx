import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';

interface PaintingAddButtonProps {
  isDarkTheme: boolean;
  artistId: string;
}

export const PaintingAddButton: FC<PaintingAddButtonProps> = memo(({ isDarkTheme, artistId }) => {
  const [isShow, setIsShow] = useState(false);
  const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [isShow, setIsShow]);

  return (
    <>
      <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleToggleIsShow}>
        <PlusIcon />
        <p>Add picture</p>
      </Button>

      <PaintingModal
        isDarkTheme={isDarkTheme}
        artistId={artistId}
        isShowModal={isShow}
        onCloseModal={handleToggleIsShow}
      />
    </>
  );
});
