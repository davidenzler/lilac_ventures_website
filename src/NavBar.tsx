import React from 'react';
import { Link } from 'react-router-dom';
import logo from './lilac.jpg';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
            <img src={logo} className="App-logo" alt="logo" />
        </li>
        <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
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
