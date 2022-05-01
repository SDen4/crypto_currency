import { combineReducers } from 'redux';

import { mainRootReducer } from './duck';

export const RootReducer = combineReducers({
  main: mainRootReducer,
});

export type AppStateType = ReturnType<typeof RootReducer>;
