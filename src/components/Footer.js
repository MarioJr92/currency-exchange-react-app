import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-5">
            <p className="footer-text">&copy; Copyright 2022 - Currency Exchange. All Rights Reserved.</p>
          </div>
          <div className="col-12 col-sm-4 col-md-3">
            <a href="#" className="linkedin">LinkedIn</a>
            <a href="#" className="github">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;