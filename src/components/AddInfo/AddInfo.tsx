import { formatNumber } from '../../utils/formatNumber';

import cl from './styles.module.css';

interface addInfoItemType {
  title: string;
  id: number;
  fix?: number;
}

interface IProps {
  addInfo: addInfoItemType[];
  data: number[];
}

export const AddInfo = ({ addInfo, data }: IProps) => {
  return (
    <details>
      <summary className={cl.summary}>Additional info</summary>

      <div className={cl.addContainer}>
        {addInfo.map((el) => (
          <div className={cl.priceRow} key={el.id}>
            <span>{el.title}:</span>
            <p>{formatNumber(Number(data[el.id]), el.fix)}</p>
          </div>
        ))}
      </div>
    </details>
  );
};
