import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <CurrencyConverter />
      <ExchangeRates />
      <Footer />
    </div>
  );
}

export default App;
