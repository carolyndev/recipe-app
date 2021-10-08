import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = (props) => {
  const {
    clearResults,
    loading,
    setLoading,
    recipes,
    setRecipes,
    search,
    setSearch,
  } = props;
  return (
    <>
      {loading ? (
        <p>searching for something yummy...</p>
      ) : (
        <div
          className="recipe__list max-w-90 3xl:max-w-50 h-full mb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
          id="recipe-list"
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              src={recipe.image}
              clearResults={clearResults}
              loading={loading}
              setLoading={setLoading}
              search={search}
              setSearch={setSearch}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList;
