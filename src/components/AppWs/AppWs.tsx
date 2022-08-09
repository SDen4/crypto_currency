import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  useMemo,
} from 'react';

import AddInfo from '../AddInfo';

import { addInfo } from '../../constant/addInfo';

import { SymbolsType } from '../../types';

import styles from './styles.module.css';

interface IProps {
  symbol: SymbolsType;
}

const AppWs: React.FC<IProps> = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [isDisconnect, setIsDisconnect] = useState<boolean>(false);
  const ws: any = useRef(null);

  const currencyName: string = useMemo(
    () => `${symbol.slice(1, 4)}/${symbol.slice(4)}`,
    [symbol],
  );

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: { data: string }) => {
      //подписка на получение данных по вебсокету
      if (isDisconnect) return;
      const message: any[] = JSON.parse(e.data);

      // console.log(message, typeof message);

      if (typeof message[1] !== 'string' && message[1]?.length > 1) {
        setData(message[1]);
      }
    };
  }, [isDisconnect]);

  let msg = useMemo(
    () =>
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol,
      }),
    [symbol],
  );

  useEffect(() => {
    if (!isDisconnect) {
      // создаем ws соединение
      ws.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

      // callback на ивент открытия соединения
      ws.current.onopen = () => {
        ws.current.send(msg);
        // setStatus('соединение открыто');
      };

      // callback на event закрытия соединения
      ws.current.onclose = () => setIsDisconnect(true);

      gettingData();
    }

    return () => ws.current.close();
  }, [ws, gettingData, msg, isDisconnect]);

  return (
    <>
      {!!data ? (
        <>
          <>
            <div
              className={`${styles.priceBox} ${isDisconnect && styles.paused}`}
            >
              <div className={styles.priceHeader}>
                <h2>{currencyName}</h2>
                <h2>{data[0]}</h2>
              </div>
              <div className={styles.priceRow}>
                <div className={styles.rowUnit}>
                  <span>24h: </span>

                  <div
                    className={`${styles.triangle} ${
                      Number(data[4]) > 0
                        ? styles.triangleUp
                        : styles.triangleDown
                    }`}
                  />

                  <p
                    className={`${styles.text} ${
                      Number(data[5]) > 0 ? styles.textGreen : styles.textRed
                    }`}
                  >
                    {Math.abs(Number(data[5]) * 100).toFixed(2)}%{' '}
                  </p>
                </div>
                <div className={styles.rowUnit}>
                  <span
                    className={`${
                      Number(data[1]) < Number(data[3])
                        ? styles.textGreen
                        : styles.textRed
                    } ${styles.bold}`}
                  >
                    {Number(data[1]) < Number(data[3]) ? 'Buy' : 'Sell'}
                  </span>

                  <div
                    className={`${styles.triangle} ${
                      Number(data[1]) < Number(data[3])
                        ? styles.triangleUp
                        : styles.triangleDown
                    }`}
                  />
                </div>
              </div>

              <AddInfo addInfo={addInfo} data={data} />
            </div>
          </>

          {isDisconnect && <p>No connection</p>}
        </>
      ) : (
        <div
          className={`${styles.priceBox} ${styles.noData} ${
            isDisconnect && styles.noConnection
          }`}
        >
          No data...
        </div>
      )}
    </>
  );
};

export default memo(AppWs);
