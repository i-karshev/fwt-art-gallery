import React, { FC, useRef, useState } from 'react';
import cn from 'classnames/bind';

import { API_BASE_URL } from '@/constans';
import { IPainting } from '@/types/IPainting';
import { ReactComponent as ArrowIcon } from '@/assets/svg/arrow_icon.svg';
import style from './Slider.module.scss';

const cx = cn.bind(style);

interface SliderProps {
  paintings: IPainting[];
  currentIndex: number;
  isDarkTheme: boolean;
}

export const Slider: FC<SliderProps> = ({ paintings, currentIndex, isDarkTheme }) => {
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const sliderLength = paintings.length;

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const swipeRef = useRef<HTMLDivElement | null>(null);

  let xDown: number | null = null;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    xDown = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!xDown) {
      return;
    }

    const xUp = event.touches[0].clientX;

    const xDiff = xDown - xUp;

    if (xDiff > 0) {
      setCurrentSlide(currentSlide < sliderLength - 1 ? currentSlide + 1 : currentSlide);
    } else {
      setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
    }

    xDown = null;
  };

  return (
    <div className={cx('slider', { slider_dark: isDarkTheme })}>
      {paintings &&
        paintings.map(
          (painting, index) =>
            index === currentSlide && (
              <div
                ref={swipeRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                className={cx('slider__slide')}
                key={painting._id}
              >
                <img
                  className={cx('slider__img')}
                  src={`${API_BASE_URL}${painting.image.webp2x}`}
                  alt={painting.name}
                  loading="lazy"
                />
                <div className={cx('slider__container')}>
                  <div className={cx('slider__img-info')}>
                    <div className={cx('slider__img-subtitle')}>{painting.yearOfCreation}</div>
                    <div className={cx('slider__img-title')}>{painting.name}</div>
                  </div>

                  <div className={cx('slider__counter')}>{`${
                    currentSlide + 1
                  }/${sliderLength}`}</div>
                </div>
              </div>
            )
        )}

      <div className={cx('slider__control')}>
        <button
          type="button"
          className={cx('slider__prev-btn')}
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
        >
          <ArrowIcon />
        </button>
        <button
          type="button"
          className={cx('slider__next-btn')}
          onClick={handleNextSlide}
          disabled={currentSlide === sliderLength - 1}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};
