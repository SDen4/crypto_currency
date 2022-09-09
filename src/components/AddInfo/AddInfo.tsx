import React, { memo } from 'react';

import styles from './styles.module.css';

interface addInfoItemType {
  title: string;
  id: number;
  fix: number;
}

interface IProps {
  addInfo: addInfoItemType[];
  data: number[];
}

export const AddInfo: React.FC<IProps> = memo(({ addInfo, data }) => {
  return (
    <details>
      <summary className={styles.summary}>Additional information</summary>

      <div className={styles.addContainer}>
        {addInfo.map((el: addInfoItemType) => (
          <div className={styles.priceRow} key={el.id}>
            <span>{el.title}:</span>
            <p>{Number(data[el.id]).toFixed(el.fix)}</p>
          </div>
        ))}
      </div>
    </details>
  );
});
