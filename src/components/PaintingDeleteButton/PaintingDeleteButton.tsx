import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { artistApi } from '@/api/features/artistApi';
import { Button } from '@/components/ui/Button';
import { DeletePopup } from '@/components/DeletePopup';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

interface PaintingDeleteButtonProps {
  theme: string;
  artistId: string;
  paintingId: string;
}

export const PaintingDeleteButton: FC<PaintingDeleteButtonProps> = memo(
  ({ theme, artistId, paintingId }) => {
    const [isShow, setIsShow] = useState(false);
    const [deletePainting, { isSuccess }] = artistApi.useDeleteArtistPaintingMutation();

    const handleShowPopup = useCallback(() => setIsShow(true), []);
    const handleClosePopup = useCallback(() => setIsShow(false), []);
    const handleConfirmDelete = useCallback(
      () => deletePainting({ artistId, paintingId }),
      [artistId, paintingId]
    );

    useEffect(() => {
      if (isSuccess) setIsShow(false);
    }, [isSuccess]);

    return (
      <>
        <Button theme={theme} variant="icon" onClick={handleShowPopup}>
          <DeleteIcon />
        </Button>

        <DeletePopup
          theme={theme}
          isShowPopup={isShow}
          onClose={handleClosePopup}
          onConfirm={handleConfirmDelete}
          variant="painting"
        />
      </>
    );
  }
);
