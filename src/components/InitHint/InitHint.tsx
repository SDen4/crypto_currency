import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

const InitHint: React.FC = () => {
  return (
    <div className={styles.arrowsContainer}>
      <div className={clsx(styles.arrow, styles.arrowOne)} />
      <div className={clsx(styles.arrow, styles.arrowTwo)} />
    </div>
  );
};

export default InitHint;
