import React, { FC, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { IPainting } from '@/types/IPainting';
import { artistApi } from '@/api/features/artistApi';
import { AuthContext } from '@/context/AuthProvider';

import { PaintingModal, TDefaultValues } from '@/components/PaintingModal';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Image } from '@/components/ui/Image';

import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/svg/edit_icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete_icon.svg';
import { ReactComponent as PicIcon } from '@/assets/svg/change-pic_icon.svg';
import { ReactComponent as CloseIcon } from '@/assets/svg/close_icon.svg';

import style from './Slider.module.scss';

const cx = cn.bind(style);

interface SliderProps {
  paintings: IPainting[];
  currentIndex?: number;
  isDarkTheme: boolean;
  isShowSlider: boolean;
  mainPainting: string;
  onCloseSlider: () => void;
}

export const Slider: FC<SliderProps> = ({
  paintings,
  currentIndex = 0,
  isDarkTheme,
  isShowSlider,
  onCloseSlider,
  mainPainting,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const [isShowPaintingModal, setIsShowPaintingModal] = useState(false);
  const [paintingDefaultValue, setPaintingDefaultValue] = useState<TDefaultValues>(
    {} as TDefaultValues
  );
  const sliderLength = paintings.length;

  const { id: artist = '' } = useParams();
  const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation();
  const { isAuth } = useContext(AuthContext);

  useLayoutEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentIndex, 0);
      setCurrentSlide(currentIndex);
    }
  }, [isShowSlider]);

  const handleEditMainPainting = (artistId: string, paintingId: string) => () =>
    editMainPainting({ artistId, paintingId });

  const handleScrollSlide = (offset: 1 | -1) => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft + slideWidth * offset, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth + offset));
    }
  };

  const handleClosePaintingModal = useCallback(() => setIsShowPaintingModal(false), []);

  const handleShowPaintingModal = useCallback(
    (painting: TDefaultValues) => () => {
      setPaintingDefaultValue(painting);
      setIsShowPaintingModal(true);
    },
    []
  );

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowSlider}>
      <div className={cx('slider', { slider_dark: isDarkTheme })}>
        <div className={cx('slider__content')}>
          <div ref={sliderRef} className={cx('slider__slides')}>
            {paintings &&
              paintings.map(({ _id: id, name, yearOfCreation, image }, index) => (
                <div className={cx('slider__slide')} key={id}>
                  <Image className={cx('slider__img')} src={image.original} alt={name} />

                  <div className={cx('slider__container')}>
                    {isAuth && (
                      <Button
                        isDarkTheme
                        variant="text"
                        className={cx('slider__cover-btn')}
                        onClick={handleEditMainPainting(artist, id)}
                      >
                        <PicIcon />
                        <span>{mainPainting === id ? 'Remove the cover' : 'Make the cover'}</span>
                      </Button>
                    )}

                    <div className={cx('slider__img-info')}>
                      <div className={cx('slider__img-subtitle')}>{yearOfCreation}</div>
                      <div className={cx('slider__img-title')}>{name}</div>

                      {isAuth && (
                        <div className={cx('slider__img-control')}>
                          <Button
                            isDarkTheme={isDarkTheme}
                            variant="icon"
                            onClick={handleShowPaintingModal({
                              id,
                              name,
                              yearOfCreation,
                              image: image.webp,
                            })}
                          >
                            <EditIcon />
                          </Button>
                          <Button isDarkTheme={isDarkTheme} variant="icon">
                            <DeleteIcon />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className={cx('slider__counter')}>{`${index + 1}/${sliderLength}`}</div>
                  </div>
                </div>
              ))}
          </div>

          <div className={cx('slider__control')}>
            <button
              type="button"
              className={cx('slider__prev-btn')}
              onClick={() => handleScrollSlide(-1)}
              disabled={currentSlide === 0}
            >
              <ArrowIcon />
            </button>
            <button
              type="button"
              className={cx('slider__next-btn')}
              onClick={() => handleScrollSlide(1)}
              disabled={currentSlide === sliderLength - 1}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className={cx('slider__close-btn-wrapper')}>
          <button type="button" className={cx('slider__close-btn')} onClick={onCloseSlider}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <PaintingModal
        artistId={artist}
        isDarkTheme={isDarkTheme}
        isShowModal={isShowPaintingModal}
        onCloseModal={handleClosePaintingModal}
        defaultValues={paintingDefaultValue}
      />
    </Modal>
  );
};
