import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { artistApi } from '@/api/features/artistApi';
import { Button } from '@/components/ui/Button';
import { DeletePopup } from '@/components/DeletePopup';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

interface PaintingDeleteButtonProps {
  isDarkTheme: boolean;
  artistId: string;
  paintingId: string;
}

export const PaintingDeleteButton: FC<PaintingDeleteButtonProps> = memo(
  ({ isDarkTheme, artistId, paintingId }) => {
    const [isShow, setIsShow] = useState(false);
    const [deletePainting, { isSuccess }] = artistApi.useDeleteArtistPaintingMutation();

    const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [setIsShow]);
    const handleConfirmDelete = useCallback(
      () => deletePainting({ artistId, paintingId }),
      [artistId, paintingId]
    );

    useEffect(() => {
      if (isSuccess) setIsShow(false);
    }, [isSuccess]);

    return (
      <>
        <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleToggleIsShow}>
          <DeleteIcon />
        </Button>

        <DeletePopup
          isDarkTheme={isDarkTheme}
          isShowPopup={isShow}
          onClose={handleToggleIsShow}
          onConfirm={handleConfirmDelete}
          variant="painting"
        />
      </>
    );
  }
);
