import { useState, TouchEvent, useEffect, Suspense, lazy } from 'react';

import { AppWs } from '../AppWs/AppWs';
import { SliderDots } from '../SliderDots/SliderDots';

import { BtcBlockInfoButton } from '../BtcBlockInfoButton';
import { Modal } from '../Modal';
import { BtcBlockInfoContent } from '../BtcBlockInfoContent';

import { symbols } from '../../constants';
import cl from './styles.module.css';

const LazySliderButton = lazy(
  () => import('../../ui/SliderButton/SliderButton'),
);

export const Slider = () => {
  const [slide, setSlide] = useState(0);
  const [screenSize, setScreenSize] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const isBtcSlide = slide === 0;

  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);

  // resize & height
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => setScreenSize(window.innerWidth),
      true,
    );
  }, [screenSize]);

  const buttonOnClick = (direction: 'right' | 'left') => {
    if (
      (direction === 'right' && slide >= symbols.length - 1) ||
      (direction === 'left' && slide <= 0)
    )
      return;

    if (direction === 'right') {
      setSlide((prev) => prev + 1);
    } else {
      setSlide((prev) => prev - 1);
    }
  };

  const [start, setStart] = useState(0);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setStart(event.changedTouches[0].clientX);
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const end = event.changedTouches[0].clientX;

    if (
      (start > end && slide >= symbols.length - 1) ||
      (start < end && slide <= 0) ||
      Math.abs(start - end) < 50
    )
      return;

    if (start - end > 50) {
      setSlide((prev) => prev + 1);
    } else if (start - end < 50) {
      setSlide((prev) => prev - 1);
    }
  };

  const onDotClick = (i: number) => {
    if (i === slide) return;
    setSlide(i);
  };

  return (
    <div className={cl.sliderWrapper}>
      <section className={cl.sliderContainer}>
        {screenSize > 490 && (
          <div className={cl.buttonWrapper}>
            <Suspense fallback={<p>loading...</p>}>
              <LazySliderButton
                left
                onClick={() => buttonOnClick('left')}
                disabled={slide === 0}
              />
            </Suspense>
          </div>
        )}

        <div
          className={cl.sliderWindow}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <ul
            className={cl.list}
            style={
              screenSize < 490
                ? {
                    transform: `translateX(calc(-${slide * 95}vw - ${
                      slide * 5
                    }px))`,
                  }
                : { transform: `translateX(-${slide * 340}px)` }
            }
          >
            {symbols.map((el, i) => (
              <li className={cl.listItem} key={el}>
                <AppWs symbol={symbols[i]} />
              </li>
            ))}
          </ul>

          <SliderDots slide={slide} onDotClick={onDotClick} />
        </div>

        {screenSize > 490 && (
          <div className={cl.buttonWrapper}>
            <Suspense fallback={<p>loading...</p>}>
              <LazySliderButton
                onClick={() => buttonOnClick('right')}
                disabled={slide === symbols.length - 1}
              />
            </Suspense>
          </div>
        )}
      </section>

      {isBtcSlide && <BtcBlockInfoButton onClick={() => setIsModal(true)} />}

      {isModal && isBtcSlide && (
        <Modal onClose={() => setIsModal(false)}>
          <BtcBlockInfoContent />
        </Modal>
      )}
    </div>
  );
};
