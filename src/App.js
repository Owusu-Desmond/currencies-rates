import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllCurrencies } from './store/currencies/allCurrencies';
import Homepage from './components/homepage';
import Currency from './components/currencyRates';
import './styles/App.css';

function App() {
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

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* routes to fetch all currencies by code */}
          {currenciesArray.map((currency) => (
            <Route key={currency.code} path={`/currency/${currency.code}`} element={<Currency currency={currency} />} />
          ))}
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
