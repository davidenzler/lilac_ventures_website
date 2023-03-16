import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/img/lilac.jpg';

function NavBar() {
  return (
    <nav>
      <span className="brandingInfo">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/" className="website-name">
          Lilac Financials
        </Link>
      </span>
      <ul>
        <li>
          <Link to="/about">Aboot</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
