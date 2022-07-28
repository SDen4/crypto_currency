import React from 'react';

import styles from './styles.module.css';

const InitHint: React.FC = () => {
  return (
    <div className={styles.arrowsContainer}>
      <div className={styles.arrowOne} />
      <div className={styles.arrowTwo} />
    </div>
  );
};

export default InitHint;
