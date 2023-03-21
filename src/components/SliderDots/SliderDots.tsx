import React, { FC } from 'react';

import { symbols } from '../../constants';

import styles from './styles.module.css';

interface IProps {
  slide: number;
  onDotClick: (i: number) => void;
}

export const SliderDots: FC<IProps> = ({ slide, onDotClick }) => {
  const onClickHandler = (i: number) => onDotClick(i);

  return (
    <div className={styles.dotsWrapper}>
      {symbols.map((el, i) => {
        return (
          <div
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
            key={el}
            onClick={() => onClickHandler(i)}
          />
        );
      })}
    </div>
  );
};
