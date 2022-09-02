import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST = 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST';
const FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE = 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST_IN_SPECIIC_DATE';
const CURRENCIES_BASE_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';

export const fetchCurrencyByCodeLatest = createAsyncThunk(
  FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST,
  async (code) => {
    const response = await fetch(`${CURRENCIES_BASE_API_URL}/latest/currencies/${code}.json`);
    const data = await response.json();
    return data;
  },
);

export const fetchCurrencyByCodeLatestInSpecificDate = createAsyncThunk(
  FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE,
  async (dateCodeObj) => {
    const response = await fetch(`${CURRENCIES_BASE_API_URL}/${dateCodeObj.date}/currencies/${dateCodeObj.code}.json`);
    const data = await response.json();
    return data;
  },
);

export default function currencyRateByCodeReducer(state = {}, action) {
  switch (action.type) {
    case `${FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST}/fulfilled`:
      return action.payload;
    case `${FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE}/fulfilled`:
      return action.payload;
    default:
      return state;
  }
}
