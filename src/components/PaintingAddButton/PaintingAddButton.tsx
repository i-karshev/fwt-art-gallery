import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';

interface PaintingAddButtonProps {
  theme: string;
  artistId: string;
}

export const PaintingAddButton: FC<PaintingAddButtonProps> = memo(({ theme, artistId }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowModal = useCallback(() => setIsShow(true), []);
  const handleCloseModal = useCallback(() => setIsShow(false), []);

  return (
    <>
      <Button theme={theme} variant="text" aria-label="Add painting" onClick={handleShowModal}>
        <PlusIcon />
        <p>Add picture</p>
      </Button>

      <PaintingModal
        theme={theme}
        artistId={artistId}
        isShowModal={isShow}
        onCloseModal={handleCloseModal}
      />
    </>
  );
});
