import React, { FC, useContext } from 'react';

import { IImage } from '@/types/IImage';
import { ThemeContext } from '@/context/ThemeProvider';
import { Card } from '@/components/ui/Card';
import { convertDateToYears } from '@/utils/convertDateToYears';

interface PaintingCardProps {
  id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
  onClick: () => void;
}

export const PaintingCard: FC<PaintingCardProps> = ({
  id,
  name,
  yearOfCreation,
  image,
  artist,
  onClick,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <li role="presentation" onClick={onClick}>
      <Card
        title={name}
        subtitle={convertDateToYears(yearOfCreation)}
        image={image}
        isDarkTheme={isDarkTheme}
      />
    </li>
  );
};
