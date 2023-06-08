import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames/bind';

import { IGenre } from '@/types/IGenre';
import { artistApi } from '@/api/features/artistApi';
import { genreApi } from '@/api/features/genreApi';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MultiSelect, TOption } from '@/components/ui/MultiSelect';
import { TextArea } from '@/components/ui/TextArea';
import { InputAvatar } from '@/components/ui/InputAvatar';

import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import styles from './ArtistModal.module.scss';

const cx = cn.bind(styles);

const schema = yup.object({
  name: yup.string().required('This field is required.'),
  yearsOfLife: yup.string().required('This field is required.'),
  location: yup.string().required(),
  description: yup.string().required(),
  genres: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
      })
    )
    .required(),
  avatar: yup.mixed(),
});

type TDefaultValues = {
  name: string;
  yearsOfLife: string;
  location: string;
  description: string;
  genres: IGenre[];
  avatar: string;
};

export type ArtistFormData = yup.InferType<typeof schema>;

interface ArtistModalProps {
  artistId: string;
  defaultValues?: TDefaultValues;
  isDarkTheme: boolean;
  isShowModal: boolean;
  onCloseModal: () => void;
}

export const ArtistModal: FC<ArtistModalProps> = ({
  artistId,
  defaultValues,
  isDarkTheme,
  isShowModal = true,
  onCloseModal,
}) => {
  const currentImage = defaultValues?.avatar as string;

  const [isDraggable, setIsDraggable] = useState(false);

  const [createArtist, { isSuccess: isCreateSuccess }] = artistApi.useCreateArtistMutation();
  const [editArtist, { isSuccess: isEditSuccess }] = artistApi.useEditArtistMutation();
  const isSuccess = isCreateSuccess || isEditSuccess;

  const { data: genresData } = genreApi.useFetchGenresQuery(null);
  const allGenres = useMemo(
    () => genresData?.map((genre) => ({ id: genre._id, name: genre.name } as TOption)),
    [genresData]
  );

  const artistGenres = defaultValues?.genres?.map(
    (genre) => ({ id: genre._id, name: genre.name } as TOption)
  );

  const methods = useForm<ArtistFormData>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = handleSubmit(
    async ({ name, yearsOfLife, location, description, genres, avatar }) => {
      const curAvatar = avatar as File;

      const data = new FormData();
      data.append('name', name);
      data.append('yearsOfLife', yearsOfLife);
      data.append('description', description);
      data.append('location', location);
      data.append('genres', genres.map((genre) => genre.id).join());

      if (curAvatar?.name) {
        data.append('avatar', curAvatar);
      }

      if (defaultValues) {
        await editArtist({ artistId, data });
      } else {
        await createArtist(data);
      }
    }
  );

  const handleDragOver = useCallback(() => setIsDraggable(true), []);
  const handleDragLeave = useCallback(() => setIsDraggable(false), []);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowModal}>
      <div
        className={cx('artist-modal', { 'artist-modal_dark': isDarkTheme })}
        onDragOver={handleDragOver}
      >
        <div className={cx('artist-modal__content')}>
          <FormProvider {...methods}>
            <form className={cx('artist-modal__form')} onSubmit={onSubmit}>
              <InputAvatar
                isDarkTheme={isDarkTheme}
                name="avatar"
                control={control}
                isDraggable={isDraggable}
                onDragLeave={handleDragLeave}
                currentImage={currentImage}
              />

              <div className={cx('artist-modal__form-inputs')}>
                <Input isDarkTheme={isDarkTheme} label="Name" {...register('name')} />

                <Input
                  isDarkTheme={isDarkTheme}
                  label="Years of life"
                  {...register('yearsOfLife')}
                  error={errors.yearsOfLife?.message?.toString()}
                />

                <Input
                  isDarkTheme={isDarkTheme}
                  label="Location"
                  {...register('location')}
                  error={errors.location?.message?.toString()}
                />

                <TextArea
                  isDarkTheme={isDarkTheme}
                  label="Description"
                  {...register('description')}
                  error={errors.description?.message?.toString()}
                />

                <MultiSelect
                  isDarkTheme={isDarkTheme}
                  name="genres"
                  label="Genres"
                  options={allGenres}
                  selected={artistGenres}
                  control={control}
                />

                <Button
                  className={cx('artist-modal__save-btn')}
                  isDarkTheme={isDarkTheme}
                  variant="default"
                  type="submit"
                  disabled={!isValid}
                >
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>

          <button type="button" className={cx('artist-modal__close-btn')} onClick={onCloseModal}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
};
