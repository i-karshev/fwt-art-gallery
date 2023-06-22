import { FC, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';

import { CardGrid } from '@/components/ui/CardGrid/CardGrid';
import { EmptyPainting } from '@/components/ui/Empty/EmptyPainting';
import { Button } from '@/components/ui/Button';
import { PaintingModal } from '@/components/PaintingModal';

import { ReactComponent as PlusIcon } from '@/assets/svg/plus_icon.svg';
import styles from './EmptyPaintingList.module.scss';

const cx = cn.bind(styles);

interface EmptyPaintingListProps {
  isDarkTheme: boolean;
  className?: string;
}

export const EmptyPaintingList: FC<EmptyPaintingListProps> = memo(({ isDarkTheme, className }) => {
  const { id = '' } = useParams();
  const [isShow, setIsShow] = useState(false);

  const handleShowModal = useCallback(() => setIsShow(true), []);
  const handleCloseModal = useCallback(() => setIsShow(false), []);

  return (
    <div
      className={cx('empty-painting-list', { 'empty-painting-list_dark': isDarkTheme }, className)}
    >
      <CardGrid>
        <div className={cx('empty-painting-list__card')}>
          <EmptyPainting isDarkTheme={isDarkTheme} />
          <Button
            isDarkTheme={isDarkTheme}
            variant="default"
            className={cx('empty-painting-list__button')}
            onClick={handleShowModal}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardGrid>
      <p className={cx('empty-painting-list__text')}>
        The paintings of this artist have not been uploaded yet.
      </p>

      <PaintingModal
        artistId={id}
        isDarkTheme={isDarkTheme}
        isShowModal={isShow}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
});
