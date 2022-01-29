import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import loadinggif from '../images/loading.gif';

const RecipeList = (props) => {
  const {
    animationReset,
    favorites,
    setFavorites,
    loading,
    matches,
    setMatches,
    recipes,
    setRecipes,
    showForm,
    setSearch,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(12);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const displayedRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  const clearResults = () => {
    setRecipes([]);
    setMatches(true);
    setSearch('');
  };

  return (
    <div className="recipe__results pb-8">
      <>
        {loading ? (
          <>
            <div className="pagination-info max-w-90 mx-auto mb-4">
              <h3 className="loading-title mb-8">Search Results</h3>
              <p className="loading-desc max-w-90 mx-auto text-center flex justify-center items-center">
                Grabbing some recipes
                <span className="ml-2">
                  <img
                    src={loadinggif}
                    alt="loading"
                    className="loading-img inline-block w-4"
                  />
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            {!matches && (
              <div className="pagination-info max-w-90 mx-auto mb-4">
                <h3 className="loading-title mb-8 flex justify-between">
                  Search Results
                  <button className="clear-btn" onClick={clearResults}>
                    <span>clear results</span>
                  </button>
                </h3>

                <p>
                  Sorry, we don't have any recipes that match that phrase. Try
                  searching a different ingredient or recipe!
                </p>
              </div>
            )}

            {recipes.length > 0 && (
              <>
                <div className="pagination">
                  <div className="pagination-info flex justify-between items-center max-w-90 mx-auto mb-2">
                    <h3 className="pagination-title">
                      Search Results: #
                      <span className="mr-2">
                        {firstRecipeIndex + 1} - #
                        {displayedRecipes.length < 12
                          ? recipes.length
                          : displayedRecipes.length * currentPage}
                      </span>
                    </h3>
                    <button className="clear-btn" onClick={clearResults}>
                      <span>clear results</span>
                    </button>
                  </div>
                  <Pagination
                    recipes={recipes}
                    recipesPerPage={recipesPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <div
                  className="max-w-90 h-full mb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
                  id="recipe-list"
                >
                  {displayedRecipes.map((recipe) => (
                    <RecipeCard
                      favorites={favorites}
                      setFavorites={setFavorites}
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      src={recipe.image}
                      showForm={showForm}
                      animationReset={animationReset}
                    />
                  ))}
                </div>
                <Pagination
                  recipes={recipes}
                  recipesPerPage={recipesPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default RecipeList;
