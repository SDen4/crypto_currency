import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';

import { RootReducer } from './store/RootReducer';
import RootSaga from './store/RootSaga';

const saga = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(saga)));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

saga.run(RootSaga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
