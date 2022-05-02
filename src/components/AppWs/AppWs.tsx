import React, { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const AppWs = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('');
  const ws: any = useRef(null);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: { data: string }) => {
      //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message: any[] = JSON.parse(e.data);

      // console.log(message, typeof message);

      if (typeof message[1] !== 'string' && message[1]?.length > 1) {
        setData(message[1]);
      }
    };
  }, [isPaused]);

  let msg = JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD',
  });

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

      // создаем ws соединение
      ws.current.onopen = () => {
        ws.current.send(msg);
        setStatus('соединение открыто');
      }; // callback на ивент открытия соединения
      ws.current.onclose = () => setStatus('соединение закрыто'); // callback на ивент закрытия соединения

      gettingData();
    }

    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused, gettingData, msg]);

  return (
    <>
      {!!data && (
        <div>
          <div>
            <div className={styles.priceBox}>
              <div className={styles.priceHeader}>
                <h2>BTC/USD:</h2>
                <h2>{data[0]}</h2>
              </div>

              <div className={styles.priceRow}>
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
            </div>
          </div>

          <p>Статус: {status}</p>

          <button
            onClick={() => {
              ws.current.close();
              setIsPaused(!isPaused);
            }}
            className={styles.button}
          >
            {!isPaused ? 'Остановить соединение' : 'Открыть соединение'}
          </button>
        </div>
      )}
    </>
  );
};

export default AppWs;
