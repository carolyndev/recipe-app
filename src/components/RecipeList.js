import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';

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

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(12);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const displayedRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  const clearResults = () => {
    setRecipes([]);
    const inputField = document.querySelector('#input-text');
    if (inputField) {
      inputField.value = '';
    }
  };

  return (
    <div className="recipe__list pb-8">
      {recipes.length > 0 && (
        <>
          {loading ? (
            <>
              <div className="max-w-90 mx-auto mb-4">
                <h3 className="mb-8">Search Results</h3>
                <p className="max-w-90 mx-auto text-center">
                  Grabbing some recipes...
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="flex justify-between items-center max-w-90 mx-auto mb-2">
                  <h3>
                    Search Results: #
                    <span className="mr-2">
                      {firstRecipeIndex + 1} - #
                      {displayedRecipes.length < 12
                        ? recipes.length
                        : displayedRecipes.length * currentPage}
                    </span>
                  </h3>
                  <button
                    className="py-1 px-2 border border-gray-200 rounded ease-out duration-300 hover:bg-gray-100 hover:border-gray-300 hover:text-green-400"
                    onClick={clearResults}
                  >
                    <span>clear results</span>
                  </button>
                </div>
                <Pagination
                  recipes={recipes}
                  recipesPerPage={recipesPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  firstRecipeIndex={firstRecipeIndex}
                  lastRecipeIndex={lastRecipeIndex}
                  displayedRecipes={displayedRecipes}
                />
              </div>

              {recipes.length > 0 ? (
                <>
                  <div
                    className="max-w-90 h-full mb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
                    id="recipe-list"
                  >
                    {displayedRecipes.map((recipe, index) => (
                      <RecipeCard
                        index={recipes.index}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        src={recipe.image}
                        showForm={showForm}
                        uniqueFavorites={uniqueFavorites}
                        recipes={recipes}
                      />
                    ))}
                  </div>
                  <Pagination
                    recipes={recipes}
                    recipesPerPage={recipesPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    firstRecipeIndex={firstRecipeIndex}
                    lastRecipeIndex={lastRecipeIndex}
                    displayedRecipes={displayedRecipes}
                  />
                </>
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
      )}
    </div>
  );
};

export default RecipeList;
