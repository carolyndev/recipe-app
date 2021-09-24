import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ recipes, setRecipes, search, setSearch, clearAll }) => {
  return (
    <header className="header m-auto w-full  bg-green-400">
      <nav className="nav__bar max-w-50 2xl:max-w-50 py-2 mx-auto flex flex-row justify-between">
        <div className="nav__logo">LOGO</div>
        <div className="nav__links">
          <ul className="flex flex-row">
            <li className="nav__link mr-8 md:mr-16">
              <Link to={'/'} onClick={clearAll}>
                Home
              </Link>
            </li>
            <li>
              <a href="#root" className="nav__link mr-8 md:mr-16">
                link2
              </a>
            </li>
            <li>
              <a href="#root" className="nav__link">
                link3
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
