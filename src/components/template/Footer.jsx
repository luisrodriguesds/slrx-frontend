import React from 'react';
import {Link} from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer className="main-footer">
        <div className="footer-left">
          Sistema LRX <div className="bullet" /> Copyright © 2019 <div className="bullet" /> Developed By <Link to="https://nauval.in/">Luis Rodrigues</Link> <div className="bullet" /> Design By <Link to="https://nauval.in/">Muhamad Nauval Azhar</Link>
        </div>
        <div className="footer-right">
        </div>
    </footer>
  )
}

export default Footer;