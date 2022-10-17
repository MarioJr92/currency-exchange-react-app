import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div className="d-flex flex-grow-1">
          <span className="w-100 d-lg-none d-block"></span>
          <a className="navbar-brand d-sm-inline-block" href="#">
            Currency Exchange
          </a>
          <div className="w-100 text-right">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-md-none">
                <i className="fa fa-bars">MENU</i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#currencyConverter">Currency Converter</Dropdown.Item>
                <Dropdown.Item href="#exchangeRates">Exchange Rates</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
          <ul className="navbar-nav ml-auto flex-nowrap">
            <li className="nav-item">
              <a href="#currencyConverter" className="nav-link m-2 menu-item nav-active">
                Currency Converter
              </a>
            </li>
            <li className="nav-item">
              <a href="#exchangeRates" className="nav-link m-2 menu-item">
                Exchange Rates
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
