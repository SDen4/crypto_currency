import React from 'react';
import type { FC } from 'react';

import styles from './styles.module.css';

const InitHint: FC = () => {
  return (
    <div className={styles.arrowsContainer}>
      <p>Swipe left to see more</p>
      <div className={styles.arrowOne} />
      <div className={styles.arrowTwo} />
    </div>
  );
};

export default InitHint;
