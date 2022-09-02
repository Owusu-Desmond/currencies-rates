import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { BsArrowRightCircle, BsCurrencyExchange } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { fetchAllCurrencies } from '../store/currencies/allCurrencies';
import Nav from './nav';
import '../styles/homepage.css';

const Homepage = () => {
  const currencies = useSelector((state) => state.currencies);
  const dispatch = useDispatch();
  // restructure the object data to be an array of objects
  const currenciesArray = Object.keys(currencies).map((key) => ({
    code: key,
    name: currencies[key],
  }));

  useEffect(() => {
    if (currenciesArray.length === 0) {
      dispatch(fetchAllCurrencies());
    }
  }, []);

  const navigate = useNavigate();

  const redirectToCurrency = (code) => { // use react router to redirect to the currency page
    navigate(`/currency/${code}`);
  };

  return (
    <>
      <header>
        <Nav text="All Currencies">
          <AiFillHome />
        </Nav>
        <div className="all-currencies-header">
          <div className="all-currency-icon">
            <BsCurrencyExchange />
          </div>
          <div className="all-currency-text">
            <p>Currency Exchange Rates</p>
            <span>
              {currenciesArray.length}
              {' '}
              Currencies
            </span>
          </div>
        </div>
        <p>STAT BY CURRENCY CODE</p>
      </header>
      <section className="all-currencies-body">
        {currenciesArray.map((currency) => (
          <button data-testid="currency" type="button" key={currency.code} onClick={() => redirectToCurrency(currency.code)}>
            <div className="currency-container">
              {/* eslint-disable-previous-line jsx-a11y/click-events-have-key-events */}
              <span className="forward-icon">
                <BsArrowRightCircle />
              </span>
              {
              // get the currency symbol from the currency code
              (getSymbolFromCurrency(currency.code)) ? (
                <span className="currency-symbol">
                  {getSymbolFromCurrency(currency.code)}
                </span>
              ) : (
                <span className="currency-symbol">
                  {currency.code[0].toUpperCase() + currency.code[1]}
                </span>
              )
            }
              {/* routes to fetch all currencies by code */}
              <div className="currency-name">
                <Link to={`/currency/${currency.code}`}>
                  {currency.name}
                </Link>
              </div>
              <div className="currency-code">{currency.code.toUpperCase()}</div>
            </div>
          </button>
        ))}
      </section>
    </>
  );
};

export default Homepage;
