import { call, takeEvery } from 'redux-saga/effects';
import WebSocket from 'isomorphic-ws';

import { mainSaga } from '../duck';

async function getWsTestyData() {
  // eslint-disable-next-line no-console
  console.log('async func');

  const ws = new WebSocket(
    'wss://stream.cryptowat.ch/connect?apikey=JEDGFQ30K8E1OIQTSJFP',
  );

  ws.onopen = function open() {
    console.log('connected');
    ws.send(Date.now());
  };

  ws.onclose = function close() {
    console.log('disconnected');
  };

  ws.onmessage = function incoming(data: any) {
    console.log(`Data: ${data}`);
    console.log(`Data: ${data.marketUpdate}`);

    setTimeout(function timeout() {
      ws.send(Date.now());
    }, 500);
  };
}

function* testTest() {
  // eslint-disable-next-line no-console
  console.log('saga');
  yield call(getWsTestyData);
}

export function* rootMainSaga(): Generator<unknown> {
  yield takeEvery(mainSaga, testTest);
}
