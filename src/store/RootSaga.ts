import { fork, all } from 'redux-saga/effects';

import { rootMainSaga } from './sagas/saga';

export default function* rootSaga(): Generator<unknown> {
  yield all([fork(rootMainSaga)]);
}
