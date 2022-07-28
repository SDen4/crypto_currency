import React, { useState, TouchEvent, useEffect, Suspense } from 'react';

import AppWs from '../AppWs';
import AppWsTest from '../AppWs/AppWsTest';

import { symbols } from '../../constant/symbols';

import styles from './styles.module.css';

const LazySliderButton = React.lazy(() => import('../../ui/SliderButton'));

const Slider: React.FC = () => {
  const [slide, setSlide] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<number>(0);

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

  const [start, setStart] = useState<number>(0);
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

  return (
    <section className={styles.sliderContainer}>
      {screenSize > 490 && (
        <div className={styles.buttonWrapper}>
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
        className={styles.sliderWindow}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ul
          className={styles.list}
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
            <li className={styles.listItem} key={el}>
              {el[0] === 't' ? (
                <AppWs symbol={symbols[i]} />
              ) : (
                <AppWsTest symbol={symbols[i]} />
              )}
            </li>
          ))}
        </ul>
      </div>

      {screenSize > 490 && (
        <div className={styles.buttonWrapper}>
          <Suspense fallback={<p>loading...</p>}>
            <LazySliderButton
              onClick={() => buttonOnClick('right')}
              disabled={slide === symbols.length - 1}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default Slider;
