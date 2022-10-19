import React from 'react';

class ExchangeRates extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 1,
      baseCurrency: "GBP",
      rates: [],
      currencies: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.frankfurter.app/latest`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          rates: data.rates,
          currencies: Object.keys(data.rates).sort(),
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    fetch(`https://api.frankfurter.app/latest?from=${event.target.value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          rates: data.rates,
          currencies: Object.keys(data.rates).sort(),
        });
      });
  }

  render() {
    const { baseCurrency, currencies, rates } = this.state;

    const currencyOptions = currencies.map((currency) => (
      <option key={currency} value={currency}>
        {" "}
        {currency}{" "}
      </option>
    ));

    const currencyRates = Object.entries(rates).map(([currency, rate]) => {
      return (
        <div key={currency}>
          {currency} : {rate}
        </div>
      );
    });

    return (
      <div className="exchange-rates border" id="exchangeRates">
        <h2>Exchange Rates</h2>
        <div className="base-currency-box">
          <label className="choose-base-currency">Base Currency</label>
          <select
            value={baseCurrency}
            name="baseCurrency"
            onChange={this.handleChange}
          >
            {currencyOptions}
            <option>{baseCurrency}</option>
          </select>
        </div>
        <div className="currency-rates">
          {currencyRates}
        </div>
      </div>
    );
  }
}

export default ExchangeRates;