import React, { useState, useRef, useEffect, useCallback } from 'react';

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
      const message = JSON.parse(e.data);

      // console.log(e);
      // console.log(e.data);
      setData(message);
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
            <h2>Статус: {status}.</h2>

            <p>{`data: ${data}`}</p>
          </div>
          <button
            onClick={() => {
              ws.current.close();
              setIsPaused(!isPaused);
            }}
          >
            {!isPaused ? 'Остановить соединение' : 'Открыть соединение'}
          </button>
        </div>
      )}
    </>
  );
};

export default AppWs;
