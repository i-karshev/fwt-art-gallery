import React, { FC, useContext } from 'react';

import { ThemeContext } from '@/context/ThemeProvider';
import { Card } from '@/components/ui/Card';
import { convertDateToYears } from '@/utils/convertDateToYears';

interface PaintingCardProps {
  id: string;
  name: string;
  yearOfCreation: string;
  imgUrl: string;
  artist: string;
}

export const PaintingCard: FC<PaintingCardProps> = ({
  id,
  name,
  yearOfCreation,
  imgUrl,
  artist,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <li>
      <Card
        title={name}
        subtitle={convertDateToYears(yearOfCreation)}
        imgUrl={imgUrl}
        isDarkTheme={isDarkTheme}
      />
    </li>
  );
};
