import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import { AddInfo } from '../AddInfo/AddInfo';

import { formatNumber } from '../../utils/formatNumber';

import { addInfo } from '../../constants';

import type { SymbolsType } from '../../types';

import cl from './styles.module.css';

export const AppWs = ({ symbol }: { symbol: SymbolsType }) => {
  const [data, setData] = useState(null);
  const [isDisconnect, setIsDisconnect] = useState(false);
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

  const isBuy = Number(data?.[1]) < Number(data?.[3]);

  return (
    <>
      {!!data ? (
        <>
          <>
            <div className={`${cl.priceBox} ${isDisconnect && cl.paused}`}>
              <div className={cl.priceHeader}>
                <h2>{currencyName}</h2>
                <h2>{formatNumber(data[0])}</h2>
              </div>
              <div className={cl.priceRow}>
                <div className={cl.rowUnit}>
                  <span>24h: </span>

                  <div
                    className={`${cl.triangle} ${
                      Number(data[4]) > 0 ? cl.triangleUp : cl.triangleDown
                    }`}
                  />

                  <p
                    className={`${cl.text} ${
                      Number(data[5]) > 0 ? cl.textGreen : cl.textRed
                    }`}
                  >
                    {formatNumber(Math.abs(Number(data[5]) * 100), 2, '%')}
                  </p>
                </div>
                <div className={cl.rowUnit}>
                  <span
                    className={`${isBuy ? cl.textGreen : cl.textRed} ${
                      cl.bold
                    }`}
                  >
                    {isBuy ? 'Buy' : 'Sell'}
                  </span>

                  <div
                    className={`${cl.triangle} ${
                      isBuy ? cl.triangleUp : cl.triangleDown
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
          className={`${cl.priceBox} ${cl.noData} ${
            isDisconnect && cl.noConnection
          }`}
        >
          No data...
        </div>
      )}
    </>
  );
};
