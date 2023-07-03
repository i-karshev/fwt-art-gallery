import React, { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon_v2.svg';

interface BackButtonProps {
  theme: string;
}

export const BackButton: FC<BackButtonProps> = memo(({ theme }) => {
  const navigate = useNavigate();
  const handleNavigateToBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Button theme={theme} variant="text" onClick={handleNavigateToBack}>
      <ArrowIcon style={{ rotate: '180deg' }} />
      <p>Back</p>
    </Button>
  );
});
