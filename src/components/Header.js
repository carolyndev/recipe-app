import React from 'react';
import { ReactComponent as Logo } from '../images/drink.svg';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { ReactComponent as StarsIcon } from '../images/stars.svg';
import { Link } from 'react-router-dom';

const Header = ({
  recipes,
  setRecipes,
  search,
  setSearch,
  clearResults,
  hideForm,
  showForm,
  setShowForm,
}) => {
  return (
    <header className="header m-auto w-full">
      <nav className="nav__bar max-w-90 py-2 mx-auto border-b border-gray-300 flex justify-between">
        <div className="nav__logo nav__link py-1 px-2 mr-8 md:mr-16">
          <Link to={'/'} onClick={clearResults} className="flex items-center">
            <Logo className="inline-block mr-2" />
            <span className="inline-block">home</span>
          </Link>
        </div>
        <div className="nav__links">
          <ul className="flex flex-row w-full justify-end">
            <li className="nav__link py-1 px-2 border border-gray-50 hover:bg-gray-100 hover:border-gray-200 rounded">
              <Link
                to={'/favorites'}
                onClick={hideForm}
                className="flex items-center"
              >
                <HeartIcon className="inline-block mr-2 w-5 h-5" />
                <span className="inline-block">favorites</span>
              </Link>
            </li>
            <li className="nav__link py-1 px-2  border border-gray-50 hover:bg-gray-100 hover:border-gray-200 rounded">
              <Link
                to={'/surprise'}
                onClick={hideForm}
                className="flex items-center"
              >
                <StarsIcon className="inline-block mr-2 w-5 h-5" />
                <span className="inline-block">surprise me</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
