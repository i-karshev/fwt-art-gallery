import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { IImage } from '@/types/IImage';
import { ThemeContext } from '@/context/ThemeProvider';
import { Card } from '@/components/ui/Card';
import { convertDateToYears } from '@/utils/convertDateToYears';

interface ArtistCardProps {
  id: string;
  name: string;
  yearsOfLife: string;
  image: IImage;
}

export const ArtistCard: FC<ArtistCardProps> = ({ id, name, yearsOfLife, image }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to={`/artists/${id}`}>
      <Card
        title={name}
        subtitle={convertDateToYears(yearsOfLife)}
        image={image}
        theme={theme}
        isScaleImageOnHover
      />
    </Link>
  );
};
