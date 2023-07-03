import React, { ChangeEvent, FC, InputHTMLAttributes, memo, useCallback, useState } from 'react';
import { useController, FieldValues, Control } from 'react-hook-form';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { getBase64 } from '@/utils/getBase64';

import { PaintingFormData } from '@/components/PaintingModal';
import { Button } from '@/components/ui/Button';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';
import { ReactComponent as NoImageIcon } from '@/assets/svg/no-image_icon.svg';

import styles from './InputImage.module.scss';

const cx = cn.bind(styles);

interface InputImageProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: string;
  currentImage: string;
  name: string;
  control: Control<PaintingFormData & FieldValues>;
}

export const InputImage: FC<InputImageProps> = memo(
  ({ theme, className, onChange, currentImage, name, control, ...other }) => {
    const [isDraggable, setIsDraggable] = useState(false);
    const { field } = useController({ name, control });
    const [image, setImage] = useState(currentImage ? `${API_BASE_URL}${currentImage}` : '');

    const handleChangeImage = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const base64 = await getBase64(file);
        setImage(base64);
        field.onChange(file);
      }
      setIsDraggable(false);
    }, []);

    const handleDeleteImage = useCallback(() => setImage(''), []);
    const handleDragOver = useCallback(() => setIsDraggable(true), []);
    const handleDragLeave = useCallback(() => setIsDraggable(false), []);

    return (
      <div className={cx('input-image', `input-image_${theme}`, className)}>
        {image && (
          <div className={cx('input-image__image-wrapper')}>
            <img className={cx('input-image__image')} src={image} alt="uploaded-img" />
            <Button
              theme={theme}
              className={cx('input-image__delete-btn')}
              variant="icon"
              onClick={handleDeleteImage}
            >
              <DeleteIcon />
            </Button>
          </div>
        )}

        <div
          className={cx('input-image__input-wrapper', {
            'input-image__input-wrapper_drag': isDraggable,
          })}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            className={cx('input-image__input')}
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            {...other}
          />
          <NoImageIcon className={cx('input-image__no-image-icon')} />
          <span className={cx('input-image__description')}>Drop your image here, or </span>
          <p className={cx('input-image__browse')}>browse image</p>
          <p className={cx('input-image__format-text')}>
            Upload only .jpg or .png format less than 3 MB
          </p>
        </div>
      </div>
    );
  }
);
