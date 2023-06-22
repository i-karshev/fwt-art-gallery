import React, { FC, memo, useCallback, useState } from 'react';

import { IArtistDetail } from '@/types/IArtist';

import { Button } from '@/components/ui/Button';
import { ArtistModal } from '@/components/ArtistModal';

import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';

interface ArtistEditButtonProps {
  isDarkTheme: boolean;
  artist: IArtistDetail;
}

export const ArtistEditButton: FC<ArtistEditButtonProps> = memo(
  ({ isDarkTheme, artist: { _id: artistId, name, yearsOfLife, description, avatar, genres } }) => {
    const [isShow, setIsShow] = useState(false);
    const handleToggleIsShow = useCallback(() => setIsShow((prev) => !prev), [setIsShow]);

    return (
      <>
        <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleToggleIsShow}>
          <EditIcon />
        </Button>

        <ArtistModal
          artistId={artistId}
          defaultValues={{
            name,
            description,
            yearsOfLife,
            avatar: avatar.webp,
            genres,
          }}
          isDarkTheme={isDarkTheme}
          isShowModal={isShow}
          onCloseModal={handleToggleIsShow}
        />
      </>
    );
  }
);
