import React from 'react';
import { ReactComponent as Logo } from '../images/drink.svg';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { ReactComponent as StarsIcon } from '../images/stars.svg';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { returnHome, counter, setCounter } = props;

  const newSurprise = () => {
    setCounter(counter + 1);
  };

  return (
    <header className="header m-auto w-full">
      <nav className="nav__bar max-w-90 py-2 mx-auto border-b border-gray-300 flex justify-between text-sm">
        <div className="nav__logo py-1">
          <Link to={'/'} onClick={returnHome} className="flex items-center">
            <Logo className="nav-icon" />
            <span className="hidden xs:inline-block">Recipeace</span>
          </Link>
        </div>

        <div className="nav__links">
          <ul className="flex flex-row w-full justify-end">
            <li className="nav__btn mr-2 md:mr-4">
              <Link to={'/favorites'} className="flex items-center">
                <HeartIcon className="nav-icon" />
                <span className="inline-block">favorites</span>
              </Link>
            </li>

            <li className="nav__btn">
              <Link
                to={'/surprise'}
                onClick={newSurprise}
                className="flex items-center"
              >
                <StarsIcon className="nav-icon" />
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
