import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/configureStore';
import Homepage from '../components/homepage';
import CurrencyRates from '../components/currencyRates';
import Footer from '../components/footer';

//  afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
});

describe('Homepage and currencyRate', () => {
  it('should render the homepage component', () => {
    //  useNavigate() may be used only in the context of a <Router> component.

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Currency Exchange Rates')).toBeInTheDocument();
  });
  it('should render the currencyRate component', () => {
    const rates = render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrencyRates currency={{ code: 'USD', name: 'United States Dollar' }} />
        </BrowserRouter>
      </Provider>,
    );
    expect(rates).toMatchSnapshot();
  });

  it('should render the footer component', () => {
    const footer = render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    );
    expect(footer).toMatchSnapshot();
  });
});
