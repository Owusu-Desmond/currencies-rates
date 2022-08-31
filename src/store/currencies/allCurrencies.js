import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_CURRENCIES_ALL = 'FETCH_CURRENCIES';
const CURRENCIES_BASE_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';

export const fetchAllCurrencies = createAsyncThunk(FETCH_CURRENCIES_ALL, async () => {
  const response = await fetch(`${CURRENCIES_BASE_API_URL}/latest/currencies.json`);
  const data = await response.json();
  return data;
});

export default function currenciesReducer(state = {}, action) {
  switch (action.type) {
    case `${FETCH_CURRENCIES_ALL}/fulfilled`:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
