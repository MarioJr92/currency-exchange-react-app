import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';

function App() {
  return (
    <div>
      <Navbar />
      <CurrencyConverter />
      <ExchangeRates />
    </div>
  );
}

export default App;
