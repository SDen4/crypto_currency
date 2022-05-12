import React, { useState } from 'react';

import AppWs from '../AppWs';
import SliderButton from '../../ui/SliderButton';

import { symbols } from '../../constant/symbols';

import styles from './styles.module.css';

const Slider = () => {
  const [slide, setSlide] = useState<number>(0);

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

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.buttonWrapper}>
        <SliderButton
          left
          onClick={() => buttonOnClick('left')}
          disabled={slide === 0}
        />
      </div>

      <div className={styles.sliderWindow}>
        <ul
          className={styles.list}
          style={{ transform: `translateX(-${slide * 250}px)` }}
        >
          {symbols.map((el, i) => (
            <li className={styles.listItem} key={el}>
              <AppWs symbol={symbols[i]} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.buttonWrapper}>
        <SliderButton
          onClick={() => buttonOnClick('right')}
          disabled={slide === symbols.length - 1}
        />
      </div>
    </section>
  );
};

export default Slider;
