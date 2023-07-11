import React, { FC, memo, useCallback, useState } from 'react';

import { IImage } from '@/types/IImage';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';

interface PaintingEditButtonProps {
  theme: string;
  artistId: string;
  paintingId: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
}

export const PaintingEditButton: FC<PaintingEditButtonProps> = memo(
  ({ theme, artistId, paintingId, name, yearOfCreation, image }) => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = useCallback(() => setIsShow(true), []);
    const handleCloseModal = useCallback(() => setIsShow(false), []);

    return (
      <>
        <Button theme={theme} variant="icon" onClick={handleShowModal}>
          <EditIcon />
        </Button>

        <PaintingModal
          theme={theme}
          isShowModal={isShow}
          onCloseModal={handleCloseModal}
          artistId={artistId}
          defaultValues={{
            id: paintingId,
            name,
            yearOfCreation,
            image: image.webp,
          }}
        />
      </>
    );
  }
);
