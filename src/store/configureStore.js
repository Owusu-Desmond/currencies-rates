import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currencies/allCurrencies';
import currencyRateByCodeReducer from './currencies/currencyByCode';

const rootReducer = combineReducers({
  currencies: currenciesReducer,
  currencyRateByCode: currencyRateByCodeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
