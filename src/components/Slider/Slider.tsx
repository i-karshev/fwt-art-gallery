import React, { FC, useEffect, useRef, useState } from 'react';
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
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const sliderLength = paintings.length;

  useEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentSlide, 0);
    }
  }, []);

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

  return (
    <div className={cx('slider', { slider_dark: isDarkTheme })}>
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
                <div className={cx('slider__img-info')}>
                  <div className={cx('slider__img-subtitle')}>{painting.yearOfCreation}</div>
                  <div className={cx('slider__img-title')}>{painting.name}</div>
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
  );
};
