import React, { useState } from 'react';

import { ReactComponent as SearchIcon } from '../images/search.svg';
import RecipeCards from './RecipeCards';

const UserInput = (props) => {
  const { recipes, setRecipes, search, setSearch } = props;

  function handleSubmit(e) {
    e.preventDefault();

    if (!search) {
      alert('Ingredients field cannot be empty.');
      return;
    }

    const API_KEY = '50aa27339ac74c17a68aefe745b2be28';
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${search}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setRecipes(data);
      console.log(recipes);
    };
    getRecipes();
  }

  function updateSearch(e) {
    setSearch(e.target.value);
    console.log(search);
  }

  return (
    <>
      <div className="user">
        <h2 className="px-4 mx-auto my-8 min-w-xs text-3xl text-center">
          Ingredient Search
        </h2>
        <p className="px-4 mb-8 max-w-50 min-w-xs mx-auto text-left">
          To search for multiple ingredients, separate each item with a comma
          (e.g. ham, eggs, etc.).
        </p>
        <div className="user__input min-w-xs max-w-50 max-h-80 mx-auto p-8 mb-16 bg-gray-100 border border-solid border-gray-300 rounded shadow-md">
          <form onSubmit={handleSubmit} className="flex items-end">
            <div className="mr-4 flex-grow">
              <label className="" htmlFor="ingredients">
                Ingredient(s)
              </label>
              <input
                type="text"
                id="input-text"
                className="w-full pl-2 border border-solid border-gray-400 rounded focus:outline-none focus:border-gray-700 placeholder-gray-300"
                name="ingredients"
                placeholder="search ingredients..."
                onChange={updateSearch}
              />
            </div>
            <button className="px-2 h-full bg-white border rounded border-solid border-gray-400 ease-out duration-300 hover:bg-green-400 hover:border-gray-700 flex items-center">
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
