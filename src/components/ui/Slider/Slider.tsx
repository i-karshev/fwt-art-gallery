import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';

import { IPainting } from '@/types/IPainting';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal/Modal';
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
  onCloseSlider: () => void;
}

export const Slider: FC<SliderProps> = ({
  paintings,
  currentIndex = 0,
  isDarkTheme,
  isShowSlider,
  onCloseSlider,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = paintings.length;

  useEffect(() => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slideWidth * currentIndex, 0);
      setCurrentSlide(currentIndex);
    }
  }, [isShowSlider]);

  const handleScrollSlide = (offset: 1 | -1) => {
    const slides = sliderRef.current;
    const slideWidth = slides?.children[0].clientWidth;

    if (slideWidth) {
      slides?.scrollTo(slides.scrollLeft + slideWidth * offset, 0);
      setCurrentSlide(Math.round(slides.scrollLeft / slideWidth + offset));
    }
  };

  return (
    <Modal isDarkTheme={isDarkTheme} isShowModal={isShowSlider}>
      <div className={cx('slider', { slider_dark: isDarkTheme })}>
        <div className={cx('slider__content')}>
          <div ref={sliderRef} className={cx('slider__slides')}>
            {paintings &&
              paintings.map(({ _id: id, name, yearOfCreation, image }, index) => (
                <div className={cx('slider__slide')} key={id}>
                  <Image className={cx('slider__img')} alt={name} src={image.original} />

                  <div className={cx('slider__container')}>
                    <Button isDarkTheme variant="text" className={cx('slider__cover-btn')}>
                      <PicIcon />
                      <span>Make the cover</span>
                    </Button>

                    <div className={cx('slider__img-info')}>
                      <div className={cx('slider__img-subtitle')}>{yearOfCreation}</div>
                      <div className={cx('slider__img-title')}>{name}</div>
                      <div className={cx('slider__img-control')}>
                        <Button isDarkTheme={isDarkTheme} variant="icon">
                          <EditIcon />
                        </Button>
                        <Button isDarkTheme={isDarkTheme} variant="icon">
                          <DeleteIcon />
                        </Button>
                      </div>
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
    </Modal>
  );
};
