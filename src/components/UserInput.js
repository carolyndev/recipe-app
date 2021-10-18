import React from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';

const UserInput = (props) => {
  const { API_KEY, setLoading, setRecipes, search, setSearch, setShowRecipes } =
    props;

  const searchByRecipes = (e) => {
    e.preventDefault();
    if (!search) {
      alert('Search field cannot be empty.');
      return;
    }
    setLoading(true);

    const getRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}&number=12`
      );
      const data = await response.json();
      console.log(data.results);
      setRecipes(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    getRecipes();

    setShowRecipes(true);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="user">
        <div className="user__input min-w-xs max-w-50 max-h-80 mx-auto p-4 mb-4 bg-gray-50">
          <p className="flex mb-2 min-w-xs mx-auto text-sm text-left">
            To explore multiple ingredients or recipes at a time, separate items
            with a comma (e.g. ham, eggs, etc.).
          </p>
          <form onSubmit={searchByRecipes} className="flex items-center mb-2">
            <div className="mr-2 flex-grow">
              <input
                type="text"
                id="input-text"
                className="w-full py-1 px-2 border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder-gray-300 text-base"
                name="ingredients"
                placeholder="search for recipes..."
                onChange={updateSearch}
              />
            </div>

            <button className="py-1 px-2 h-full bg-white rounded ease-out duration-300 border border-solid border-gray-300 hover:border-gray-500 flex items-center">
              <span className="mr-1 text-base">Search</span>

              <SearchIcon className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInput;
