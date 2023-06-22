import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { artistApi } from '@/api/features/artistApi';
import { Button } from '@/components/ui/Button';
import { DeletePopup } from '@/components/DeletePopup';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

interface ArtistDeleteButtonProps {
  isDarkTheme: boolean;
  artistId: string;
}

export const ArtistDeleteButton: FC<ArtistDeleteButtonProps> = memo(({ isDarkTheme, artistId }) => {
  const [isShow, setIsShow] = useState(false);
  const [deleteArtist, { isSuccess }] = artistApi.useDeleteArtistMutation();

  const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [setIsShow]);
  const handleConfirmDelete = useCallback(() => deleteArtist(artistId), [artistId]);

  useEffect(() => {
    if (isSuccess) setIsShow(false);
  }, [isSuccess]);

  return (
    <>
      <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleToggleIsShow}>
        <DeleteIcon />
      </Button>

      <DeletePopup
        variant="artist"
        isDarkTheme={isDarkTheme}
        isShowPopup={isShow}
        onClose={handleToggleIsShow}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
});
