import React from 'react';

import { formatNumber } from '../../utils/formatNumber';

import styles from './styles.module.css';

interface addInfoItemType {
  title: string;
  id: number;
  fix?: number;
}

interface IProps {
  addInfo: addInfoItemType[];
  data: number[];
}

export const AddInfo: React.FC<IProps> = ({ addInfo, data }) => {
  return (
    <details>
      <summary className={styles.summary}>Additional information</summary>

      <div className={styles.addContainer}>
        {addInfo.map((el: addInfoItemType) => (
          <div className={styles.priceRow} key={el.id}>
            <span>{el.title}:</span>
            <p>{formatNumber(Number(data[el.id]), el.fix)}</p>
          </div>
        ))}
      </div>
    </details>
  );
};
