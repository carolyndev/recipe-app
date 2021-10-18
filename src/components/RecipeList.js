import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = (props) => {
  const {
    favorites,
    setFavorites,
    loading,
    recipes,
    setRecipes,
    showForm,
    uniqueFavorites,
  } = props;

  const clearResults = () => {
    setRecipes([]);
    const inputField = document.querySelector('#input-text');
    if (inputField) {
      inputField.value = '';
    }
  };

  return (
    <div className="recipe__list pb-8">
      {recipes.length > 0 ? (
        <>
          {loading ? (
            <div className="flex justify-between items-center max-w-90 mx-auto mb-4">
              <h3>Search Results</h3>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center max-w-90 mx-auto mb-4">
                <h3>Search Results</h3>
                <button
                  className="py-1 px-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 hover:text-green-400"
                  onClick={clearResults}
                >
                  <span>clear results</span>
                </button>
              </div>

              {recipes.length > 0 ? (
                <div
                  className="max-w-90 h-full mb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
                  id="recipe-list"
                >
                  {recipes.map((recipe) => (
                    <RecipeCard
                      favorites={favorites}
                      setFavorites={setFavorites}
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      src={recipe.image}
                      showForm={showForm}
                      uniqueFavorites={uniqueFavorites}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <p className="max-w-90 mx-auto">
                    To get started, use search below to find some recipe
                    inspiration!
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default RecipeList;
