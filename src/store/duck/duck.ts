import { combineReducers } from 'redux';
import { createAction, createReducer } from '@reduxjs/toolkit';

const main = 'main';

// Actions ==========================
export const mainSaga = createAction(`${main}/SAGA`);
export const saveMainData = createAction<any>(`${main}/SAVE_MAIN_DATA`);

// Reducers ==========================
const mainData = createReducer('', {
  [saveMainData.toString()]: (_state, action) => action.payload,
});

// Root Reducer
const mainRootReducer = combineReducers({ mainData });

export default mainRootReducer;
