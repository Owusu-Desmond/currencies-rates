import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  fetchCurrencyByCodeLatest,
  fetchCurrencyByCodeLatestInSpecificDate,
  displayAllRates, displaySingleRate,
} from '../store/currencies/currencyByCode';
import Nav from './nav';

const Currency = ({ currency }) => {
  const { code, name } = currency;
  const exchangeRates = useSelector((state) => state.currencyRateByCode);
  const dispatch = useDispatch();

  // restructure the object data to be an array of objects
  const currencyDate = exchangeRates[0].date;
  const exchangeRatesObj = exchangeRates[0][code] || {};
  const exchangeRateObj = exchangeRates[1] || {};

  // all the exchange rates for the currency
  const currencyExchangeRates = Object.keys(exchangeRatesObj).map((key) => ({
    code: key,
    rate: exchangeRates[0][code][key],
  }));

  // single exchange rate for the currency
  const currencyExchangeRate = Object.keys(exchangeRateObj).map((key) => ({
    code: key,
    rate: exchangeRateObj[key],
  }));

  // function to display the exchange rates
  const dataToDisplayFunc = () => (
    (currencyExchangeRate.length !== 0) ? currencyExchangeRate : currencyExchangeRates
  );
  const dataToDisplay = dataToDisplayFunc();

  const showPreferedCurrencyRate = (e) => {
    const rateCode = e.target.value;
    if (rateCode === 'ALL') {
      dispatch(displayAllRates(code)); // display all the exchange rates for the currency
    } else {
      dispatch(displaySingleRate({ code, rateCode }));
    }
    // remove focus from the select element
    e.target.blur();
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    dispatch(fetchCurrencyByCodeLatestInSpecificDate({ date, code }));
  };

  const dateNow = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // fetch the latest currency exchange rates for the currency code
    const date = '2022-09-03';
    dispatch(fetchCurrencyByCodeLatestInSpecificDate({ date, code }));
    // check if the latest currency exchange rates is empty
    if (Object.keys(exchangeRatesObj).length === 0) {
      dispatch(fetchCurrencyByCodeLatest(code));
    }
  }, []);

  return (
    <>
      <header>
        <Nav
          text={
          `${code.toUpperCase()} - ${currencyDate} 
          ${(currencyDate === dateNow) ? '(latest)' : ''}`
          }
        >
          <select onChange={showPreferedCurrencyRate}>
            {/* default options to be all currencies */}
            <option value="ALL">All RATES</option>
            {currencyExchangeRates.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </Nav>
        <div className="currency-search-container">
          <input type="date" value={currencyDate} min="2020-01-01" onChange={handleDateChange} max={dateNow} />
        </div>
        <div className="all-currencies-header">
          <div className="currency-icon">
            {
              // get the currency symbol from the currency code
              (getSymbolFromCurrency(code)) ? (
                <span>
                  {getSymbolFromCurrency(code)}
                </span>
              ) : (
                <span>
                  {code[0].toUpperCase() + code[1]}
                </span>
              )
            }
          </div>
          <div className="all-currency-text">
            <p>{name}</p>
            <span>
              {currencyExchangeRates.length}
              {' '}
              Exchange rates
            </span>
          </div>
        </div>
        <p>
          Currency Name/Exchange Rates -
          {currencyDate}
        </p>
      </header>
      <section
        className={
        `${(currencyExchangeRate.length) === 1 ? 'currency-exchange-rate-section' : ''}`
      }
      >
        {dataToDisplay.map((cur) => (
          <div
            className={
              `${(currencyExchangeRate.length) === 1 ? 'currency-exchange-rate-single' : 'currency-exchange-rate'}`
            }
            key={cur.code}
          >
            <div>{cur.code.toUpperCase()}</div>
            <div className="rate-arrow-container">
              <div>{cur.rate.toFixed(3)}</div>
              <div><BsArrowRightCircle /></div>
            </div>
          </div>
        ))}
      </section>
    </>

  );
};

Currency.propTypes = {
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Currency;
