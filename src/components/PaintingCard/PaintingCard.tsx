import React, { FC, useContext, memo, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { IImage } from '@/types/IImage';
import { artistApi } from '@/api/features/artistApi';
import { ThemeContext } from '@/context/ThemeProvider';
import { AuthContext } from '@/context/AuthProvider';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { convertDateToYears } from '@/utils/convertDateToYears';

import { Card } from '@/components/ui/Card';
import { Popover } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';
import { DeletePopup } from '@/components/DeletePopup';

import { ReactComponent as GearIcon } from '@/assets/svg/gear_icon.svg';

import styles from './PaintingCard.module.scss';

const cx = cn.bind(styles);

interface PaintingCardProps {
  id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
  onClick: () => void;
  isMainPainting: boolean;
}

export const PaintingCard: FC<PaintingCardProps> = memo(
  ({ id, name, yearOfCreation, image, onClick, isMainPainting }) => {
    const { theme } = useContext(ThemeContext);
    const { isAuth } = useContext(AuthContext);
    const [isShowPopover, setIsShowPopover] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const [isShowPaintingModal, setIsShowPaintingModal] = useState(false);
    const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);

    const { id: artist = '' } = useParams();
    const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation();
    const [deletePainting] = artistApi.useDeleteArtistPaintingMutation();

    const handleEditMainPainting = (artistId: string, paintingId: string) => () =>
      editMainPainting({ artistId, paintingId });

    const handleTogglePopover = useCallback(() => setIsShowPopover((prev) => !prev), []);
    const handleClosePopover = useCallback(() => setIsShowPopover(false), []);

    useOutsideClick(popoverRef, handleClosePopover);

    const handleShowModal = useCallback(() => setIsShowPaintingModal(true), []);
    const handleCloseModal = useCallback(() => setIsShowPaintingModal(false), []);

    const handleCloseDeletePopup = useCallback(() => setIsShowDeletePopup(false), []);

    const handleDeletePainting = (artistId: string, paintingId: string) => () =>
      deletePainting({ artistId, paintingId });

    return (
      <div className={cx('artist-card', `artist-card_${theme}`)} onMouseLeave={handleClosePopover}>
        <Card
          title={name}
          subtitle={convertDateToYears(yearOfCreation)}
          image={image}
          theme={theme}
          onClick={onClick}
        />
        {isAuth && (
          <div className={cx('artist-card__control')} ref={popoverRef}>
            <Button
              theme={theme}
              variant="icon"
              aria-label="Painting control"
              onClick={handleTogglePopover}
            >
              <GearIcon />
            </Button>
            {isShowPopover && (
              <Popover theme={theme}>
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
                    onClick={handleShowModal}
                  >
                    Edit
                  </li>
                  <li
                    className={cx('artist-card__popover-menu-item')}
                    role="presentation"
                    onClick={() => setIsShowDeletePopup(true)}
                  >
                    Delete
                  </li>
                </ul>
              </Popover>
            )}
          </div>
        )}

        <PaintingModal
          artistId={artist}
          defaultValues={{
            id,
            name,
            yearOfCreation,
            image: image.webp,
          }}
          theme={theme}
          isShowModal={isShowPaintingModal}
          onCloseModal={handleCloseModal}
        />

        <DeletePopup
          theme={theme}
          isShowPopup={isShowDeletePopup}
          onClose={handleCloseDeletePopup}
          onConfirm={handleDeletePainting(artist, id)}
          variant="painting"
        />
      </div>
    );
  }
);
