import { FC, memo } from 'react';
import cn from 'classnames/bind';

import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';

import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon_big.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './DeletePopup.module.scss';

const cx = cn.bind(styles);

const textOption = {
  artist: {
    title: 'Do you want to delete this artist profile?',
    description: 'You will not be able to recover this profile afterwards.',
  },
  painting: {
    title: 'Do you want to delete this picture?',
    description: 'You will not be able to recover this picture afterwards.',
  },
};

interface DeletePopupProps {
  theme: string;
  isShowPopup: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: 'artist' | 'painting';
}

export const DeletePopup: FC<DeletePopupProps> = memo(
  ({ theme, isShowPopup, variant, onClose, onConfirm }) => (
    <Modal theme={theme} isShowModal={isShowPopup} onClose={onClose}>
      <div className={cx('delete-popup', `delete-popup_${theme}`)}>
        <div className={cx('delete-popup__content')}>
          <DeleteIcon className={cx('delete-popup__icon')} />

          <p className={cx('delete-popup__title')}>{textOption[variant].title}</p>
          <p className={cx('delete-popup__description')}>{textOption[variant].description}</p>

          <div className={cx('delete-popup__btn-wrapper')}>
            <Button theme={theme} variant="default" onClick={onConfirm}>
              Delete
            </Button>
            <Button theme={theme} variant="text" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>

        <button type="button" className={cx('delete-popup__close-btn')} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  )
);
