import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/img/lilac.jpg';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavbarData} from './NavbarData';
import { IconContext } from 'react-icons';
import './navbar.css';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <header className='navbar'>
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="#" className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar}/>
      </Link>
    </header>

    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='nav-menu-toggle'>
          <Link to='#'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        {NavbarData.map((page, index) => {
          return (
            <li key={index} className={page.cName}>
              <Link to={page.path}>
                {page.icon}
                <span>{page.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    </>
  );
}

/**
 * function NavBar() {
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
 */
export default NavBar;
