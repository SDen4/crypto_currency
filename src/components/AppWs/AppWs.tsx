import React, { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import AddInfo from '../AddInfo';

import { addInfo } from '../../constant/addInfo';

import { AppWsType } from './types';

import styles from './styles.module.css';

const AppWs: React.FC<AppWsType> = ({ symbol }) => {
  const [data, setData] = useState(null);
  const [isDisconnect, setIsDisconnect] = useState<boolean>(false);
  const ws: any = useRef(null);

  const currencyName: string = `${symbol.slice(1, 4)}/${symbol.slice(
    4,
  )}`.toUpperCase();

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
              className={clsx(styles.priceBox, isDisconnect && styles.paused)}
            >
              <div className={styles.priceHeader}>
                <h2>{currencyName}:</h2>
                <h2>{data[0]}</h2>
              </div>
              <div className={styles.priceRow}>
                <div className={styles.rowUnit}>
                  <span>24h: </span>

                  <div
                    className={clsx(
                      styles.triangle,
                      Number(data[4]) > 0
                        ? styles.triangleUp
                        : styles.triangleDown,
                    )}
                  />

                  <p
                    className={clsx(
                      styles.text,
                      Number(data[5]) > 0 ? styles.textGreen : styles.textRed,
                    )}
                  >
                    {Math.abs(Number(data[5]) * 100).toFixed(2)}%{' '}
                  </p>
                </div>
                <div className={styles.rowUnit}>
                  <span
                    className={clsx(
                      Number(data[1]) < Number(data[3])
                        ? styles.textGreen
                        : styles.textRed,
                      styles.bold,
                    )}
                  >
                    {Number(data[1]) < Number(data[3]) ? 'Buy' : 'Sell'}
                  </span>

                  <div
                    className={clsx(
                      styles.triangle,
                      Number(data[1]) < Number(data[3])
                        ? styles.triangleUp
                        : styles.triangleDown,
                    )}
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
          className={clsx(
            styles.priceBox,
            styles.noData,
            isDisconnect && styles.noConnection,
          )}
        >
          No data...
        </div>
      )}
    </>
  );
};

export default AppWs;
