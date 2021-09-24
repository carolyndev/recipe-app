import React from 'react';
import Recipe from './Recipe';

const RecipeCards = (props) => {
  const { clearAll, recipes, setRecipes } = props;
  return (
    <div
      className="recipe__list max-w-90 mb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
      id="recipe-list"
    >
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          src={recipe.image}
          clearAll={clearAll}
        />
      ))}
    </div>
  );
};

export default RecipeCards;
