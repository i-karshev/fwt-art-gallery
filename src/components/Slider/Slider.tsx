import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { IPainting } from '@/types/IPainting';
import { artistApi } from '@/api/features/artistApi';
import { API_BASE_URL } from '@/constans';
import { AuthContext } from '@/context/AuthProvider';

import { Button } from '@/components/ui/Button';

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
  const bodyRef = useRef(document.body);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const sliderLength = paintings.length;

  const { id: artist = '' } = useParams();
  const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentIndex, 0);
    }

    if (isShowSlider) {
      bodyRef.current.style.overflow = 'hidden';
    }

    return () => {
      bodyRef.current.style.overflow = 'auto';
    };
  }, [isShowSlider]);

  if (!isShowSlider) {
    return null;
  }

  const handleEditMainPainting = (artistId: string, paintingId: string) => () => {
    editMainPainting({ artistId, paintingId });
  };

  const handleScrollToNextSlide = () => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft + slideWidth, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth + 1));
    }
  };

  const handleScrollToPrevSlide = () => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft - slideWidth, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth - 1));
    }
  };

  return createPortal(
    <div className={cx('slider', { slider_dark: isDarkTheme })}>
      <div className={cx('slider__content')}>
        <div ref={sliderRef} className={cx('slider__slides')}>
          {paintings &&
            paintings.map((painting, index) => (
              <div className={cx('slider__slide')} key={painting._id}>
                <img
                  className={cx('slider__img')}
                  src={`${API_BASE_URL}${painting.image.webp2x}`}
                  alt={painting.name}
                  loading="lazy"
                />

                <div className={cx('slider__container')}>
                  {isAuth && (
                    <Button
                      isDarkTheme
                      variant="text"
                      className={cx('slider__cover-btn')}
                      onClick={handleEditMainPainting(artist, painting._id)}
                    >
                      <PicIcon />
                      <span>
                        {mainPainting === painting._id ? 'Remove the cover' : 'Make the cover'}
                      </span>
                    </Button>
                  )}

                  <div className={cx('slider__img-info')}>
                    <div className={cx('slider__img-subtitle')}>{painting.yearOfCreation}</div>
                    <div className={cx('slider__img-title')}>{painting.name}</div>

                    {isAuth && (
                      <div className={cx('slider__img-control')}>
                        <Button isDarkTheme={isDarkTheme} variant="icon">
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
            onClick={handleScrollToPrevSlide}
            disabled={currentSlide === 0}
          >
            <ArrowIcon />
          </button>
          <button
            type="button"
            className={cx('slider__next-btn')}
            onClick={handleScrollToNextSlide}
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
    </div>,
    bodyRef.current
  );
};
