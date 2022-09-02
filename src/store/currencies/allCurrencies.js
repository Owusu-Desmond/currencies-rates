import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_CURRENCIES_ALL = 'FETCH_CURRENCIES';
const DISPLAY_CURRENCIES = 'DISPLAY_CURRENCIES';
const DISPLAY_SINGLE_CURRENCY = 'DISPLAY_SINGLE_CURRENCY';
const CURRENCIES_BASE_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';

export const fetchAllCurrencies = createAsyncThunk(FETCH_CURRENCIES_ALL, async () => {
  const response = await fetch(`${CURRENCIES_BASE_API_URL}/latest/currencies.json`);
  const data = await response.json();
  return data;
});

// action creator returns an action object
export const displaySingleCurrency = (code) => ({
  type: DISPLAY_SINGLE_CURRENCY,
  payload: code,
});

export const displayCurrencies = () => ({
  type: DISPLAY_CURRENCIES,
  payload: {},
});

export default function currenciesReducer(state = [{}, {}], action) {
  switch (action.type) {
    case `${FETCH_CURRENCIES_ALL}/fulfilled`:
      return [
        { ...state[0], ...action.payload },
        {},
      ];
    case DISPLAY_CURRENCIES:
      return [
        state[0],
        {},
      ];
    case DISPLAY_SINGLE_CURRENCY:
      /* return the currency object from the state with the
      code as the key and the value as the payload */
      return [
        {
          ...state[0],
        },
        {
          [action.payload]: state[0][action.payload],
        },
      ];
    default:
      return state;
  }
}
