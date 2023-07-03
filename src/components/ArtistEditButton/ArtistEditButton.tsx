import React, { FC, memo, useCallback, useState } from 'react';

import { IArtistDetail } from '@/types/IArtist';

import { Button } from '@/components/ui/Button';
import { ArtistModal } from '@/components/ArtistModal';

import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';

interface ArtistEditButtonProps {
  theme: string;
  artist: IArtistDetail;
}

export const ArtistEditButton: FC<ArtistEditButtonProps> = memo(
  ({ theme, artist: { _id: artistId, name, yearsOfLife, description, avatar, genres } }) => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = useCallback(() => setIsShow(true), []);
    const handleCloseModal = useCallback(() => setIsShow(false), []);

    return (
      <>
        <Button theme={theme} variant="icon" aria-label="Edit artist" onClick={handleShowModal}>
          <EditIcon />
        </Button>

        <ArtistModal
          artistId={artistId}
          defaultValues={{
            name,
            description,
            yearsOfLife,
            avatar: avatar?.webp,
            genres,
          }}
          theme={theme}
          isShowModal={isShow}
          onCloseModal={handleCloseModal}
        />
      </>
    );
  }
);
