import React from 'react';
import Chart from 'chart.js';

class HistoricalChart extends React.Component {
  constructor() {
    super();
    this.state = {
      baseAcronym: "EUR",
      quoteAcronym: "USD",
      currencies: [],
    };
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { baseAcronym, quoteAcronym } = this.state;
    this.getRate(baseAcronym, quoteAcronym);
    this.getHistoricalRates(baseAcronym, quoteAcronym);

    fetch(`https://api.frankfurter.app/latest`)
      .then((res) => res.json())
      .then((data) => {
        const currencyArr = [data.base, ...Object.keys(data.rates)];
        currencyArr.sort();
        this.setState({ currencies: currencyArr });
      });
  }

  changeBaseAcronym = (event) => {
    const baseAcronym = event.target.value;
    this.setState({ baseAcronym });
    this.getRate(baseAcronym, this.state.quoteAcronym);
    this.getHistoricalRates(baseAcronym, this.state.quoteAcronym);
  };

  changeQuoteAcronym = (event) => {
    const quoteAcronym = event.target.value;
    this.setState({ quoteAcronym });
    this.getRate(this.state.baseAcronym, quoteAcronym);
    this.getHistoricalRates(this.state.baseAcronym, quoteAcronym);
  };

  getRate = (base, quote) => {
    this.setState({ loading: true });

    fetch(`https://api.frankfurter.app/latest?from=${base}&symbols=${quote}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rate = data.rates[quote];

        this.setState({
          rate,
          baseValue: 1,
          quoteValue: Number((1 * rate).toFixed(3)),
          loading: false,
        });
      })
      .catch((error) => console.log(error.message));
  };

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&symbols=${quote}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map((rate) => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => console.log(error.message));
  };

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      }
    });
  };

  render() {
    const { baseAcronym, quoteAcronym, currencies } = this.state;

    const currencyOptions = currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Historical Chart</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="baseAcronym">Base Currency</label>
              <select
                className="form-control"
                id="baseAcronym"
                value={baseAcronym}
                onChange={this.changeBaseAcronym}
              >
                {currencyOptions}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="quoteAcronym">Quote Currency</label>
              <select
                className="form-control"
                id="quoteAcronym"
                value={quoteAcronym}
                onChange={this.changeQuoteAcronym}
              >
                {currencyOptions}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <canvas ref={this.chartRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default HistoricalChart;