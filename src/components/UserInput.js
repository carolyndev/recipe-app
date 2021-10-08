import React from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';

const UserInput = (props) => {
  const { loading, setLoading, recipes, setRecipes, search, setSearch } = props;

  const API_KEY = '50aa27339ac74c17a68aefe745b2be28';

  const searchByRecipes = (e) => {
    e.preventDefault();

    if (!search) {
      alert('Recipes field cannot be empty.');
      return;
    }
    setLoading(true);

    const getRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results);
      setRecipes(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 750);
    };
    getRecipes();
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="user">
        <h2 className="px-4 mx-auto mt-8 mb-4 min-w-xs text-3xl text-center">
          Recipe Search
        </h2>
        <p className="px-4 mb-4 max-w-50 min-w-xs mx-auto text-sm text-left">
          To search for multiple ingredients or recipes, separate each item with
          a comma (e.g. ham, eggs, etc.).
        </p>
        <div className="user__input min-w-xs max-w-50 max-h-80 mx-auto p-4 mb-16 bg-gray-100 border border-solid border-gray-200 rounded shadow-md">
          <form onSubmit={searchByRecipes} className="flex items-end mb-2">
            <div className="mr-4 flex-grow">
              <div>
                <label htmlFor="ingredients">Recipe(s)</label>
                <input
                  type="text"
                  id="input-text"
                  className="w-full pl-2 mt-1 border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-700 placeholder-gray-400"
                  name="ingredients"
                  placeholder="search by recipe..."
                  onChange={updateSearch}
                />
              </div>
            </div>

            <button className="px-2 h-full bg-white rounded ease-out duration-300 border border-solid border-gray-300 hover:border-gray-700 flex items-center">
              <span className="mr-1">Search</span>

              <SearchIcon className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInput;
