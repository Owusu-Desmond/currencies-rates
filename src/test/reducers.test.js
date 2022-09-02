import currenciesReducer from '../store/currencies/allCurrencies';
import currencyRateByCodeReducer from '../store/currencies/currencyByCode';

describe('get all currencies reducer', () => {
  it('should return the initial state', () => {
    expect(currenciesReducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_CURRENCIES', () => {
    const fetchCurrenciesAction = {
      type: 'FETCH_CURRENCIES/fulfilled',
      payload: {
        AED: 'United Arab Emirates Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram',
        ANG: 'Netherlands Antillean Guilder',
        AOA: 'Angolan Kwanza',
        ARS: 'Argentine Peso',
        AUD: 'Australian Dollar',
        AWG: 'Aruban Florin',
      },
    };
    expect(currenciesReducer({}, fetchCurrenciesAction)).toEqual({
      AED: 'United Arab Emirates Dirham',
      AFN: 'Afghan Afghani',
      ALL: 'Albanian Lek',
      AMD: 'Armenian Dram',
      ANG: 'Netherlands Antillean Guilder',
      AOA: 'Angolan Kwanza',
      ARS: 'Argentine Peso',
      AUD: 'Australian Dollar',
      AWG: 'Aruban Florin',
    });
  });
});

describe('get currency rate by code reducer', () => {
  it('should return the initial state', () => {
    expect(currencyRateByCodeReducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST', () => {
    const fetchCurrenciesByCodeLatestAction = {
      type: 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST/fulfilled',
      payload: {
        AED: 3.6725,
        AFN: 77.5,
        ALL: 102.5,
        AMD: 484.5,
        ANG: 1.79,
        AOA: 595.5,
        ARS: 78.5,
        AUD: 1.265,
        AWG: 1.79,
      },
    };

    expect(
      currencyRateByCodeReducer({}, fetchCurrenciesByCodeLatestAction),
    ).toEqual({
      AED: 3.6725,
      AFN: 77.5,
      ALL: 102.5,
      AMD: 484.5,
      ANG: 1.79,
      AOA: 595.5,
      ARS: 78.5,
      AUD: 1.265,
      AWG: 1.79,
    });
  });

  it('should handle FETCH_CURRENCIES_BY_CURRENCY_CODE_IN_SPECIIC_DATE', () => {
    const fetchCurrenciesByCodeLatestInSpecificDateAction = {
      type: 'FETCH_CURRENCIES_BY_CURRENCY_CODE_LATEST_IN_SPECIIC_DATE/fulfilled',
      payload: {
        AED: 3.6725,
        AFN: 77.5,
        ALL: 102.5,
        AMD: 484.5,
        ANG: 1.79,
        AOA: 595.5,
        ARS: 78.5,
        AUD: 1.265,
        AWG: 1.79,
      },
    };

    expect(
      currencyRateByCodeReducer({}, fetchCurrenciesByCodeLatestInSpecificDateAction),
    ).toEqual({
      AED: 3.6725,
      AFN: 77.5,
      ALL: 102.5,
      AMD: 484.5,
      ANG: 1.79,
      AOA: 595.5,
      ARS: 78.5,
      AUD: 1.265,
      AWG: 1.79,
    });
  });
});
