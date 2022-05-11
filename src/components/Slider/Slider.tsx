import React from 'react';

import AppWs from '../AppWs';

import { symbols } from '../../constant/symbols';

import styles from './styles.module.css';

const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <ul className={styles.list}>
        {symbols.map((el, i) => (
          <li className={styles.listItem} key={el}>
            <AppWs symbol={symbols[i]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
