import React from 'react';

import AppWs from '../AppWs';
import SliderButton from '../../ui/SliderButton';

import { symbols } from '../../constant/symbols';

import styles from './styles.module.css';

const Slider = () => {
  return (
    <section className={styles.sliderContainer}>
      <div className={styles.buttonWrapper}>
        <SliderButton left />
      </div>
      <div className={styles.sliderWindow}>
        <ul className={styles.list}>
          {symbols.map((el, i) => (
            <li className={styles.listItem} key={el}>
              <AppWs symbol={symbols[i]} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttonWrapper}>
        <SliderButton />
      </div>
    </section>
  );
};

export default Slider;
