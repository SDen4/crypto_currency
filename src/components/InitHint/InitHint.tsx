import React, { memo } from 'react';

import styles from './styles.module.css';

const InitHint: React.FC = () => {
  return (
    <div className={styles.arrowsContainer}>
      <div className={`${styles.arrow} ${styles.arrowOne}`} />
      <div className={`${styles.arrow} ${styles.arrowTwo}`} />
    </div>
  );
};

export default memo(InitHint);
