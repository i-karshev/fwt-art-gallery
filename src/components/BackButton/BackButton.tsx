import React, { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';

interface BackButtonProps {
  isDarkTheme: boolean;
}

export const BackButton: FC<BackButtonProps> = memo(({ isDarkTheme }) => {
  const navigate = useNavigate();
  const handleNavigateToBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Button isDarkTheme={isDarkTheme} variant="text" onClick={handleNavigateToBack}>
      <ArrowIcon style={{ rotate: '180deg' }} />
      <p>Back</p>
    </Button>
  );
});
