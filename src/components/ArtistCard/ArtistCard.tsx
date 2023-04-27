import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { IArtistStatic } from '@/types/IArtist';
import { ThemeContext } from '@/context/ThemeProvider';
import { Card } from '@/components/ui/Card';
import { convertDateToYears } from '@/utils/convertDateToYears';

interface ArtistCardProps {
  artist: IArtistStatic;
}

export const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <li>
      <Link to={`/artists/${artist._id}`}>
        <Card
          title={artist.name}
          subtitle={convertDateToYears(artist.yearsOfLife)}
          imgUrl={artist.mainPainting.image.webp}
          isDarkTheme={isDarkTheme}
          isScaleImageOnHover
        />
      </Link>
    </li>
  );
};
