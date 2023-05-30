import React, { FC, memo, useCallback, useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { convertDateToYears } from '@/utils/convertDateToYears';

import { Card } from '@/components/ui/Card';
import { Popover } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as GearIcon } from '@/assets/svg/gear_icon.svg';

import styles from './PaintingCard.module.scss';

const cx = cn.bind(styles);

interface PaintingCardProps {
  id: string;
  name: string;
  yearOfCreation: string;
  imgUrl: string;
  onClick: () => void;
  isMainPainting: boolean;
}

export const PaintingCard: FC<PaintingCardProps> = memo(
  ({ id, name, yearOfCreation, imgUrl, onClick, isMainPainting }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const { isAuth } = useContext(AuthContext);
    const [isShowPopover, setIsShowPopover] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const [isShowPaintingModal, setIsShowPaintingModal] = useState(false);

    const { id: artist = '' } = useParams();
    const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation();
    const [deletePainting] = artistApi.useDeleteArtistPaintingMutation();

    const handleEditMainPainting = (artistId: string, paintingId: string) => () => {
      editMainPainting({ artistId, paintingId });
    };

    const handleTogglePopover = useCallback(() => setIsShowPopover((prev) => !prev), []);
    const handleClosePopover = useCallback(() => setIsShowPopover(false), []);

    useOutsideClick(popoverRef, handleClosePopover);

    const handleTogglePaintingModal = useCallback(
      () => setIsShowPaintingModal((prev) => !prev),
      [isShowPaintingModal]
    );

    const handleDeletePainting = useCallback(
      (artistId: string, paintingId: string) => async () => {
        await deletePainting({ artistId, paintingId });
      },
      []
    );

    return (
      <li
        className={cx('artist-card', { 'artist-card_dark': isDarkTheme })}
        onMouseLeave={handleClosePopover}
      >
        <Card
          title={name}
          subtitle={convertDateToYears(yearOfCreation)}
          imgUrl={imgUrl}
          isDarkTheme={isDarkTheme}
          onClick={onClick}
        />
        {isAuth && (
          <div className={cx('artist-card__control')} ref={popoverRef}>
            <Button isDarkTheme={isDarkTheme} variant="icon" onClick={handleTogglePopover}>
              <GearIcon />
            </Button>
            <Popover isDarkTheme={isDarkTheme} isShow={isShowPopover}>
              <ul className={cx('artist-card__popover-menu')}>
                <li
                  className={cx('artist-card__popover-menu-item')}
                  onClick={handleEditMainPainting(artist, id)}
                  role="presentation"
                >
                  {isMainPainting ? 'Remove the cover' : 'Make the cover'}
                </li>
                <li
                  className={cx('artist-card__popover-menu-item')}
                  role="presentation"
                  onClick={handleTogglePaintingModal}
                >
                  Edit
                </li>
                <li
                  className={cx('artist-card__popover-menu-item')}
                  role="presentation"
                  onClick={handleDeletePainting(artist, id)}
                >
                  Delete
                </li>
              </ul>
            </Popover>
          </div>
        )}

        <PaintingModal
          artistId={artist}
          paintingId={id}
          defaultValues={{
            name,
            yearOfCreation,
            image: imgUrl,
          }}
          isDarkTheme={isDarkTheme}
          isShowModal={isShowPaintingModal}
          onCloseModal={handleTogglePaintingModal}
        />
      </li>
    );
  }
);
