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
  isDarkTheme: boolean;
  isShowPopup: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: 'artist' | 'painting';
}

export const DeletePopup: FC<DeletePopupProps> = memo(
  ({ isDarkTheme, isShowPopup, variant, onClose, onConfirm }) => (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowPopup}>
      <div className={cx('delete-popup', { 'delete-popup_dark': isDarkTheme })}>
        <div className={cx('delete-popup__content')}>
          <DeleteIcon className={cx('delete-popup__icon')} />

          <p className={cx('delete-popup__title')}>{textOption[variant].title}</p>
          <p className={cx('delete-popup__description')}>{textOption[variant].description}</p>

          <div className={cx('delete-popup__btn-wrapper')}>
            <Button isDarkTheme={isDarkTheme} variant="default" onClick={onConfirm}>
              Delete
            </Button>
            <Button isDarkTheme={isDarkTheme} variant="text" onClick={onClose}>
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
