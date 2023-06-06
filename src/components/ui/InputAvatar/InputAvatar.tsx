import React, {
  FC,
  InputHTMLAttributes,
  DragEvent,
  useRef,
  useState,
  memo,
  useCallback,
  ChangeEvent,
} from 'react';
import { useController, FieldValues, Control } from 'react-hook-form';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { Button } from '@/components/ui/Button';
import { ReactComponent as ProfileIcon } from '@/assets/svg/profile_icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';

import styles from './InputAvatar.module.scss';

const cx = cn.bind(styles);

interface InputAvatarProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme: boolean;
  name: string;
  control: Control<FieldValues, unknown>;
  isDraggable?: boolean;
  currentImage?: string;
}

export const InputAvatar: FC<InputAvatarProps> = memo(
  ({ isDarkTheme, isDraggable, name, control, currentImage, onDragLeave, ...other }) => {
    const { field } = useController({ name, control });
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState(currentImage ? `${API_BASE_URL}${currentImage}` : '');

    const handleDeleteImage = () => setImage('');
    const handleLoadImage = () => inputRef.current?.click();
    const handleDragImage = (event: DragEvent<HTMLElement>) => event.preventDefault();

    const handleDropImage = useCallback(async (event: DragEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];

      if (file) {
        await Promise.resolve();
        const base64 = await getBase64(file);
        setImage(base64);
        field.onChange(file);
      }

      if (onDragLeave) {
        onDragLeave(event);
      }
    }, []);

    const handleChangeImage = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        await Promise.resolve();
        const base64 = await getBase64(file);
        setImage(base64);
        field.onChange(file);
      }
    }, []);

    return (
      <div className={cx('input-avatar', { 'input-avatar_dark': isDarkTheme })}>
        {image && (
          <div className={cx('input-avatar__image-wrapper')}>
            <img className={cx('input-avatar__image')} src={image} alt="avatar" />
            <Button
              className={cx('input-avatar__delete-btn')}
              isDarkTheme={isDarkTheme}
              variant="icon"
              onClick={handleDeleteImage}
            >
              <DeleteIcon />
            </Button>
          </div>
        )}

        <div
          role="presentation"
          className={cx('input-avatar__input-wrapper', {
            'input-avatar__input-wrapper_full': isDraggable,
          })}
          onDrop={handleDropImage}
          onDragOver={handleDragImage}
          onDragLeave={onDragLeave}
          onClick={handleLoadImage}
        >
          <input
            className={cx('input-avatar__input')}
            type="file"
            ref={inputRef}
            onChange={handleChangeImage}
            {...other}
          />
          <ProfileIcon className={cx('input-avatar__profile-svg')} />
          <p className={cx('input-avatar__text')}>Drop your image here</p>
          <p
            className={cx('input-avatar__format-text', {
              'input-avatar__format-text_show': isDraggable,
            })}
          >
            Upload only .jpg or .png format less than 3 MB
          </p>
        </div>

        <Button
          isDarkTheme={isDarkTheme}
          variant="text"
          className={cx('input-avatar__upload-btn')}
          onClick={handleLoadImage}
        >
          Browse Profile Photo
        </Button>
      </div>
    );
  }
);
