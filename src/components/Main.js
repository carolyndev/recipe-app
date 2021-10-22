import React, { useEffect } from 'react';
import illustration from '../images/food-illu.svg';

import UserInput from './UserInput';
import RecipeList from './RecipeList';

const Main = (props) => {
  const {
    API_KEY,
    favorites,
    setFavorites,
    loading,
    setLoading,
    recipes,
    setRecipes,
    search,
    setSearch,
    showForm,
    setShowForm,
    uniqueFavorites,
    setUniqueFavorites,
    showRecipes,
    setShowRecipes,
  } = props;

  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="main">
      {showForm === false ? (
        <></>
      ) : (
        <div>
          <div className="max-w-90 mx-auto lg:my-8 flex flex-col lg:flex-row justify-center items-center">
            {recipes.length > 0 ? (
              <img
                src={illustration}
                alt="food illustration"
                className="w-1/2 md:w-2/5 lg:w-3/12 mx-auto my-8"
              />
            ) : (
              <>
                <div className="mx-auto lg:ml-auto lg:mr-0">
                  <h1 className="block mt-12 mb-4 text-6xl tracking-wider text-green-400 text-center lg:text-left">
                    Recipeace
                  </h1>
                  <p className="block mb-2 mx-auto text-center lg:text-left">
                    In a culinary pinch? We've got you covered!
                  </p>
                  <p className="mx-auto text-center lg:text-left">
                    Unlock your cooking inspiration today with our recipe search
                    & save.
                  </p>
                </div>
                <img
                  src={illustration}
                  alt="food illustration"
                  className="lg:max-w-50 w-3/5 mx-auto my-8"
                />
              </>
            )}
          </div>

          <UserInput
            API_KEY={API_KEY}
            loading={loading}
            setLoading={setLoading}
            recipes={recipes}
            setRecipes={setRecipes}
            search={search}
            setSearch={setSearch}
            showRecipes={showRecipes}
            setShowRecipes={setShowRecipes}
          />
          <RecipeList
            favorites={favorites}
            setFavorites={setFavorites}
            loading={loading}
            setLoading={setLoading}
            recipes={recipes}
            setRecipes={setRecipes}
            search={search}
            setSearch={setSearch}
            showForm={showForm}
            setShowForm={setShowForm}
            uniqueFavorites={uniqueFavorites}
            setUniqueFavorites={setUniqueFavorites}
            showRecipes={showRecipes}
            setShowRecipes={setShowRecipes}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
