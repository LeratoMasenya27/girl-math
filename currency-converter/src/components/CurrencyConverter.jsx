import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR'];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
        setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
      } catch (err) {
        setError(err.message);
        // Fallback rates if API fails
        const fallbackRates = {
          USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, CAD: 1.25, AUD: 1.30, CNY: 6.45, INR: 74.50 },
          EUR: { USD: 1.18, GBP: 0.86, JPY: 129.50, CAD: 1.47, AUD: 1.53, CNY: 7.59, INR: 87.65 },
          // Add more fallback rates as needed
        };
        if (fallbackRates[fromCurrency] && fallbackRates[fromCurrency][toCurrency]) {
          setExchangeRate(fallbackRates[fromCurrency][toCurrency]);
          setConvertedAmount((amount * fallbackRates[fromCurrency][toCurrency]).toFixed(2));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value || 0);
    if (exchangeRate) {
      setConvertedAmount((value * exchangeRate).toFixed(2));
    }
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      
      {error && <div className="error-message">{error} (using fallback rates)</div>}
      
      <div className="converter-form">
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="currency-selectors">
          <div className="input-group">
            <label htmlFor="fromCurrency">From</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          
          <button className="swap-button" onClick={swapCurrencies}>
            ⇄
          </button>
          
          <div className="input-group">
            <label htmlFor="toCurrency">To</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="result">
            <h2>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
            <div className="rate-info">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;