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
  onClick: () => void;
}

export const PaintingCard: FC<PaintingCardProps> = ({
  id,
  name,
  yearOfCreation,
  imgUrl,
  artist,
  onClick,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li onClick={onClick}>
      <Card
        title={name}
        subtitle={convertDateToYears(yearOfCreation)}
        imgUrl={imgUrl}
        isDarkTheme={isDarkTheme}
      />
    </li>
  );
};
