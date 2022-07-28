import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

import formatNumber from '../../utils/formatNumber';

import { fTitles } from '../../constant/addInfo';

import { AppWsType } from './types';

import styles from './styles.module.css';

const AppWsTest: React.FC<AppWsType> = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [isDisconnect, setIsDisconnect] = useState<boolean>(false);
  const ws: any = useRef(null);

  const currencyName: string = `${symbol.slice(1, 4)}`;

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

  let msg = JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol,
  });

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
              </div>

              <ul className={styles.listTest}>
                {(data as Array<any>)
                  .filter((el) => el !== null)
                  .map((el, i) => (
                    <li key={Math.random()} className={styles.listItemTest}>
                      <p>{fTitles[i]}</p>
                      <p>{formatNumber(el, 5)}</p>
                    </li>
                  ))}
              </ul>
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

export default memo(AppWsTest);
