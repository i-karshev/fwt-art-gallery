import React, { FC } from 'react';
import cn from 'classnames/bind';

import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { TextArea } from '@/components/ui/TextArea';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './ArtistModal.module.scss';

const cx = cn.bind(styles);

interface ArtistModalProps {
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const ArtistModal: FC<ArtistModalProps> = ({ isDarkTheme, isShowModal, onCloseModal }) => (
  <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
    <div className={cx('artist-modal', { 'artist-modal_dark': isDarkTheme })}>
      <div className={cx('artist-modal__content')}>
        <form className={cx('artist-modal__form')}>
          <div className={cx('artist-modal__img')} />
          <div className={cx('artist-modal__form-inputs')}>
            <Input isDarkTheme={isDarkTheme} name="name" label="Name*" />
            <Input isDarkTheme={isDarkTheme} name="years" label="Years of life" />
            <Input isDarkTheme={isDarkTheme} name="location" label="Location" />
            <TextArea isDarkTheme={isDarkTheme} label="Description" />
            <MultiSelect isDarkTheme={isDarkTheme} label="Genres" />
            <Button
              isDarkTheme={isDarkTheme}
              variant="default"
              className={cx('artist-modal__save-btn')}
            >
              Save
            </Button>
          </div>
        </form>
        <button type="button" className={cx('artist-modal__close-btn')} onClick={onCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </div>
  </Modal>
);
