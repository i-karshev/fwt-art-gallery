import React, { FC, memo, useCallback, useState } from 'react';

import { IImage } from '@/types/IImage';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';

interface PaintingEditButtonProps {
  isDarkTheme: boolean;
  artistId: string;
  paintingId: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
}

export const PaintingEditButton: FC<PaintingEditButtonProps> = memo(
  ({ isDarkTheme, artistId, paintingId, name, yearOfCreation, image }) => {
    const [isShow, setIsShow] = useState(false);
    const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [setIsShow]);

    return (
      <>
        <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleToggleIsShow}>
          <EditIcon />
        </Button>

        <PaintingModal
          isDarkTheme={isDarkTheme}
          isShowModal={isShow}
          onCloseModal={handleToggleIsShow}
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
