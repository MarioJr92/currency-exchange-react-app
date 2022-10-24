import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import HistoricalChart from './components/HistoricalChart';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <CurrencyConverter />
      <ExchangeRates />
      <HistoricalChart />
      <Footer />
    </div>
  );
}

export default App;
