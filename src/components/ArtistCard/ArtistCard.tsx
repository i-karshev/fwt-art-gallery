import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '@/context/ThemeProvider';
import { Card } from '@/components/ui/Card';
import { convertDateToYears } from '@/utils/convertDateToYears';

interface ArtistCardProps {
  id: string;
  name: string;
  yearsOfLife: string;
  imgUrl: string;
}

export const ArtistCard: FC<ArtistCardProps> = ({ id, name, yearsOfLife, imgUrl }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <li>
      <Link to={`/artists/${id}`}>
        <Card
          title={name}
          subtitle={convertDateToYears(yearsOfLife)}
          imgUrl={imgUrl}
          isDarkTheme={isDarkTheme}
          isScaleImageOnHover
        />
      </Link>
    </li>
  );
};
