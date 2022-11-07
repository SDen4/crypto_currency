import React from 'react';

import { symbols } from '../../constants';

import styles from './styles.module.css';

export const SliderDots: React.FC<{ slide: number }> = ({ slide }) => {
  return (
    <div className={styles.dotsWrapper}>
      {symbols.map((el, i) => {
        return (
          <div
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
            key={el}
          />
        );
      })}
    </div>
  );
};
