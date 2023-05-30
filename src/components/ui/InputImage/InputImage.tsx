import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { getBase64 } from '@/utils/getBase64';
import { useCombinedRef } from '@/hooks/useCombinedRef';

import { Button } from '@/components/ui/Button';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';
import { ReactComponent as NoImageIcon } from '@/assets/svg/no-image_icon.svg';

import styles from './InputImage.module.scss';

const cx = cn.bind(styles);

interface InputUploadImageProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme: boolean;
  currentImage: string;
}

const forwardInputImage = forwardRef<HTMLInputElement, InputUploadImageProps>(
  ({ isDarkTheme, className, onChange, currentImage, ...other }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedInputRef = useCombinedRef(ref, inputRef);
    const [image, setImage] = useState<string | null>(
      currentImage && `${API_BASE_URL}${currentImage}`
    );

    const handleChangeImage: ChangeEventHandler<HTMLInputElement> = useCallback(async (event) => {
      if (!inputRef.current) return;
      const file = event.target.files && event.target.files[0];

      if (file) {
        const base64 = await getBase64(file);
        setImage(base64);

        if (onChange) {
          onChange(event);
        }
      }
    }, []);

    const handleDeleteImage = useCallback(() => setImage(null), []);

    if (image) {
      return (
        <div className={cx('input-image__image-wrapper')}>
          <img className={cx('input-image__image')} src={image} alt="uploaded-img" />
          <Button
            isDarkTheme={isDarkTheme}
            className={cx('input-image__delete-btn')}
            variant="icon"
            onClick={handleDeleteImage}
          >
            <DeleteIcon />
          </Button>
        </div>
      );
    }

    return (
      <div className={cx('input-image', { 'input-image_dark': isDarkTheme }, className)}>
        <input
          className={cx('input-image__input')}
          type="file"
          accept="image/*"
          ref={combinedInputRef}
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
    );
  }
);

export const InputImage = memo(forwardInputImage);
