import React, { FC, useState } from 'react';
import cn from 'classnames/bind';

import { sliceDescription } from '@/utils/sliceDescription';
import styles from './ArtistAccordion.module.scss';
import { Button } from '@/components/ui/Button';
import { ReactComponent as ArrowIcon } from '@/assets/svg/expand_icon.svg';

const cx = cn.bind(styles);

interface ArtistAccordionProps {
  description: string;
  theme: string;
}

export const ArtistAccordion: FC<ArtistAccordionProps> = ({ description, theme }) => {
  const [isShowAccordion] = useState(description.length > 265);
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const isShowFullDescription = !isShowAccordion || isOpenAccordion;

  const handleToggleAccordion = () => setIsOpenAccordion(!isOpenAccordion);

  return (
    <div className={cx('artist-accordion', `artist-accordion_${theme}`)}>
      <p
        className={cx('artist-accordion__text', {
          'artist-accordion__text_full': isShowFullDescription,
        })}
      >
        {isShowFullDescription ? description : sliceDescription(description)}
      </p>

      {isShowAccordion && (
        <div className={cx('artist-accordion__button')}>
          <Button theme={theme} variant="text" onClick={handleToggleAccordion}>
            <p>{isOpenAccordion ? 'Read Less' : 'Read More'}</p>
            <ArrowIcon className={cx({ 'artist-accordion__button-icon': isOpenAccordion })} />
          </Button>
        </div>
      )}
    </div>
  );
};
