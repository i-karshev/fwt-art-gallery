import React, { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames/bind';

import { artistApi } from '@/api/features/artistApi';
import { Modal } from '@/components/ui/Modal';
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

export type PaintingFormData = yup.InferType<typeof schema>;

export type TDefaultValues = {
  id: string;
  name: string;
  yearOfCreation: string;
  image: string;
};

export interface IPaintingModalState {
  artistId: string;
  defaultValues?: TDefaultValues;
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const PaintingModal: FC<IPaintingModalState> = ({
  artistId,
  defaultValues,
  isDarkTheme,
  isShowModal,
  onCloseModal,
}) => {
  const currentImage = defaultValues?.image as string;
  const paintingId = defaultValues?.id as string;

  const [editPainting, { isSuccess: isEditSuccess }] = artistApi.useEditArtistPaintingMutation();
  const [createPainting, { isSuccess: isCreateSuccess }] =
    artistApi.useCreateArtistPaintingMutation();
  const isSuccess = isEditSuccess || isCreateSuccess;

  const methods = useForm<PaintingFormData>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = handleSubmit(async ({ name, yearOfCreation, image }) => {
    const curImage = image as File;

    const data = new FormData();
    data.append('name', name);
    data.append('yearOfCreation', yearOfCreation);

    if (curImage?.name) {
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

  useEffect(() => {
    if (defaultValues) {
      const { name, yearOfCreation } = defaultValues;
      setValue('name', name, { shouldValidate: true });
      setValue('yearOfCreation', yearOfCreation, { shouldValidate: true });
    }
  }, [defaultValues]);

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
      <div className={cx('painting-modal', { 'painting-modal_dark': isDarkTheme })}>
        <div className={cx('painting-modal__content')}>
          <FormProvider {...methods}>
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
                name="image"
                control={control}
                currentImage={currentImage}
              />

              <Button isDarkTheme={isDarkTheme} variant="default" type="submit" disabled={!isValid}>
                Save
              </Button>
            </form>
          </FormProvider>

          <button type="button" className={cx('painting-modal__close-btn')} onClick={onCloseModal}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
};
