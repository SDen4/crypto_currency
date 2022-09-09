import { SymbolsType } from '../types';

export const addInfo = [
  { title: 'Price of the last trade', id: 6, fix: 0 },
  { title: 'Price of the last lowest ask', id: 2, fix: 0 },
  { title: 'Sum of the 25 highest bid sizes', id: 1, fix: 2 },
  { title: 'Sum of the 25 lowest ask sizes', id: 3, fix: 2 },
  { title: 'Daily volume', id: 7, fix: 2 },
  { title: 'Daily high', id: 8, fix: 0 },
  { title: 'Daily low', id: 9, fix: 0 },
  {
    title: 'Amount that the last price has changed since yesterday',
    id: 4,
    fix: 0,
  },
];

export const symbols: SymbolsType[] = [
  'tBTCUSD',
  'tBTCEUR',
  'tETHUSD',
  'tETHEUR',
];
