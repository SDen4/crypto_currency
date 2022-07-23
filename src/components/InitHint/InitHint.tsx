import React from 'react';
import clsx from 'clsx';

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
