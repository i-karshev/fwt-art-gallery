import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';
import { ArtistModal } from '@/components/ArtistModal';

interface ArtistAddButtonProps {
  theme: string;
}

export const ArtistAddButton: FC<ArtistAddButtonProps> = memo(({ theme }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowModal = useCallback(() => setIsShow(true), []);
  const handleCloseModal = useCallback(() => setIsShow(false), []);

  return (
    <>
      <Button theme={theme} variant="text" onClick={handleShowModal}>
        <PlusIcon />
        Add artist
      </Button>

      <ArtistModal theme={theme} isShowModal={isShow} onCloseModal={handleCloseModal} />
    </>
  );
});
