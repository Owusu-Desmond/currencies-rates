import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { BsArrowRightCircle } from 'react-icons/bs';
import getSymbolFromCurrency from 'currency-symbol-map';
import { fetchCurrencyByCodeLatest, fetchCurrencyByCodeLatestInSpecificDate } from '../store/currencies/currencyByCode';
import Nav from './nav';

const Currency = ({ currency }) => {
  const { code, name } = currency;
  const currencyExchangeRatesByCurrencies = useSelector((state) => state.currencyRateByCode);
  const dispatch = useDispatch();

  // restructure the object data to be an array of objects
  const currencyDate = currencyExchangeRatesByCurrencies.date;
  const currencyExchangeRatesObject = currencyExchangeRatesByCurrencies[code] || {};
  const currencyExchangeRates = Object.keys(currencyExchangeRatesObject).map((key) => ({
    code: key,
    rate: currencyExchangeRatesByCurrencies[code][key],
  }));

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
    if (Object.keys(currencyExchangeRatesObject).length === 0) {
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
          <Link to="/">
            <IoIosArrowBack />
          </Link>
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
      <section className="currency-container">
        <div className="currency-body">
          {currencyExchangeRates.map((cur) => (
            <div className="currency-exchange-rate" key={cur.code}>
              <div>{cur.code.toUpperCase()}</div>
              <div className="rate-arrow-container">
                <div>{cur.rate.toFixed(3)}</div>
                <div><BsArrowRightCircle /></div>
              </div>
            </div>
          ))}
        </div>
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
