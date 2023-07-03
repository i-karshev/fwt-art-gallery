import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { artistApi } from '@/api/features/artistApi';
import { Button } from '@/components/ui/Button';
import { DeletePopup } from '@/components/DeletePopup';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

interface ArtistDeleteButtonProps {
  theme: string;
  artistId: string;
}

export const ArtistDeleteButton: FC<ArtistDeleteButtonProps> = memo(({ theme, artistId }) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [deleteArtist, { isSuccess }] = artistApi.useDeleteArtistMutation();

  const handleShowPopup = useCallback(() => setIsShow(true), []);
  const handleClosePopup = useCallback(() => setIsShow(false), []);
  const handleConfirmDelete = useCallback(() => deleteArtist(artistId), [artistId]);

  useEffect(() => {
    if (isSuccess) {
      setIsShow(false);
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <>
      <Button theme={theme} variant="icon" aria-label="Delete artist" onClick={handleShowPopup}>
        <DeleteIcon />
      </Button>

      <DeletePopup
        variant="artist"
        theme={theme}
        isShowPopup={isShow}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
});
