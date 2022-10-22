import React from "react";

class CurrencyConventer extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: " ",
      fromCurrency: "GBP",
      toCurrency: "USD",
      rates: [],
      currencies: [],
      exchangeRate: " ",
      showResults: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://api.frankfurter.app/latest")
      .then((res) => res.json())
      .then((data) => {
        const currencyArr = [data.base, ...Object.keys(data.rates)];
        currencyArr.sort();
        this.setState({ currencies: currencyArr });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (this.state.fromCurrency && this.state.toCurrency) {
          fetch(`https://api.frankfurter.app/latest?from=${this.state.fromCurrency}&to=${this.state.toCurrency}`)
            .then((res) => res.json())
            .then((data) => {
              this.setState({
                rates: data.rates,
                exchangeRate: data.rates[this.state.toCurrency],
                showResults: true,
              });
            });
        }
      }
    );
  }


  render() {
    const { currencies, fromCurrency, toCurrency, amount, exchangeRate } = this.state;

    const currencyOptions = currencies.map((currency) => (
      <option key={currency} value={currency}>
        {" "}
        {currency}{" "}
      </option>
    ));

    return (
      <div className="container" id="currencyConverter">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h4>Currency Converter</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fromCurrency">From</label>
                    <select
                      className="form-control"
                      id="fromCurrency"
                      name="fromCurrency"
                      value={fromCurrency}
                      onChange={this.handleChange}
                    >
                      {currencyOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="toCurrency">To</label>
                    <select
                      className="form-control"
                      id="toCurrency"
                      name="toCurrency"
                      value={toCurrency}
                      onChange={this.handleChange}
                    >
                      {currencyOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exchangeRate">Exchange Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exchangeRate"
                      name="exchangeRate"
                      value={exchangeRate}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="convertedAmount">Converted Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="convertedAmount"
                      name="convertedAmount"
                      value={amount * exchangeRate}
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyConventer;