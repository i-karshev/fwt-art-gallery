import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input';
import { InputImage } from '@/components/ui/InputImage';
import { Button } from '@/components/ui/Button';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './PaintingModal.module.scss';

const cx = cn.bind(styles);

const schema = yup.object({
  name: yup.string().required('This field is required.'),
  yearOfCreation: yup.string().required('This field is required.').length(4),
  image: yup.mixed(),
});

type FormData = yup.InferType<typeof schema>;

type TDefaultValues = {
  name: string;
  yearOfCreation: string;
  image: string;
};

export interface IPaintingModalState {
  artistId: string;
  paintingId?: string;
  defaultValues?: TDefaultValues;
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const PaintingModal: FC<IPaintingModalState> = ({
  artistId,
  paintingId,
  defaultValues,
  isDarkTheme,
  isShowModal,
  onCloseModal,
}) => {
  const currentImage = defaultValues?.image as string;

  const [editPainting, { isSuccess: isEditSuccess }] = artistApi.useEditArtistPaintingMutation();
  const [createPainting, { isSuccess: isCreateSuccess }] =
    artistApi.useCreateArtistPaintingMutation();
  const isSuccess = isEditSuccess || isCreateSuccess;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues, image: currentImage },
  });

  const onSubmit = handleSubmit(async ({ name, yearOfCreation, image }) => {
    const curImage = (image as FileList)[0];

    const data = new FormData();
    data.append('name', name);
    data.append('yearOfCreation', yearOfCreation);

    if (curImage.name) {
      data.append('image', curImage);
    }

    if (paintingId) {
      await editPainting({ artistId, paintingId, data });
    } else {
      await createPainting({ artistId, data });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
      <div className={cx('painting-modal')}>
        <div className={cx('painting-modal__content')}>
          <form className={cx('painting-modal__from')} onSubmit={onSubmit}>
            <div className={cx('painting-modal__input-wrapper')}>
              <Input
                isDarkTheme={isDarkTheme}
                className={cx('painting-modal__input-name')}
                label="The name of the picture"
                {...register('name')}
                error={errors.name?.message?.toString()}
              />

              <Input
                isDarkTheme={isDarkTheme}
                className={cx('painting-modal__input-age')}
                label="Year of creation"
                type="number"
                maxLength={4}
                {...register('yearOfCreation')}
                error={errors.yearOfCreation?.message?.toString()}
              />
            </div>

            <InputImage
              isDarkTheme={isDarkTheme}
              className={cx('painting-modal__input-image')}
              accept=".jpg,.png"
              {...register('image')}
              currentImage={currentImage}
            />

            <Button isDarkTheme={isDarkTheme} variant="default" type="submit" disabled={!isValid}>
              Save
            </Button>
          </form>

          <button type="button" className={cx('painting-modal__close-btn')} onClick={onCloseModal}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
};
