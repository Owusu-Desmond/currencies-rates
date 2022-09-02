import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST = 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST';
const FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE = 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST_IN_SPECIIC_DATE';
const CURRENCIES_BASE_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';
const DISPLAY_SINGLE_RATE = 'DISPLAY_SINGLE_RATE';
const DISPLAY_ALL_RATES = 'DISPLAY_ALL_RATES';

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

export const displaySingleRate = (data) => ({
  type: DISPLAY_SINGLE_RATE,
  payload: data,
});

export const displayAllRates = () => ({
  type: DISPLAY_ALL_RATES,
});

export default function currencyRateByCodeReducer(state = [{}, {}], action) {
  switch (action.type) {
    case `${FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST}/fulfilled`:
      return [
        {
          ...state[0],
          ...action.payload,
        },
        {},
      ];
    case `${FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE}/fulfilled`:
      return [
        {
          ...state[0],
          ...action.payload,
        },
        {},
      ];
    case DISPLAY_SINGLE_RATE:
      return [
        {
          ...state[0],
        },
        {
          [action.payload.rateCode]: state[0][action.payload.code][action.payload.rateCode],
        },
      ];
    case DISPLAY_ALL_RATES:
      return [
        state[0],
        {},
      ];
    default:
      return state;
  }
}
