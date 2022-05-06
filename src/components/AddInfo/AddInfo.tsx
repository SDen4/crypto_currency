import React from 'react';
import clsx from 'clsx';

import { AddInfoType } from './types';

import styles from './styles.module.css';

const AddInfo: React.FC<AddInfoType> = ({ addInfo, data }) => {
  return (
    <details>
      <summary className={styles.summary}>Additional information</summary>

      <div className={styles.addContainer}>
        {addInfo.map((el: any) => (
          <div className={clsx(styles.priceRow, styles.addRow)} key={el.id}>
            <span>{el.title}:</span>
            <p className={styles.text}>{Number(data[el.id]).toFixed(el.fix)}</p>
          </div>
        ))}
      </div>
    </details>
  );
};

export default AddInfo;
