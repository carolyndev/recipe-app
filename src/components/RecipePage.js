import React, { useEffect } from 'react';
import RecipeDetails from './RecipeDetails';

const RecipePage = (match) => {
  let recipeID = parseInt(match.match.params.id);

  useEffect(() => {
    match.setShowForm(false);
    match.setRecipeLoading(true);
    getDetails();
  }, [recipeID]);

  const getDetails = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${match.API_KEY}`
    );
    const data = await response.json();

    if (response.ok) {
      match.setDetails(data);
      if (data.extendedIngredients) {
        match.setIngredients(data.extendedIngredients);
      }
      if (data.analyzedInstructions && data.analyzedInstructions[0]) {
        match.setInstructions(data.analyzedInstructions[0].steps);
      }
      setTimeout(() => {
        match.setRecipeLoading(false);
      }, 500);
    } else {
      console.log(response.statusText);
    }
  };

  return (
    <div className="recipe-container h-full max-w-90 mx-auto pb-8">
      {match.recipeLoading === true ? (
        <p className="loading-desc h-full mt-32 flex justify-center items-center">
          Grabbing Recipe Details...
        </p>
      ) : (
        <RecipeDetails
          details={match.details}
          ingredients={match.ingredients}
          instructions={match.instructions}
          setFavorites={match.setFavorites}
          saveLocalFavorites={match.saveLocalFavorites}
          animationReset={match.animationReset}
        />
      )}
    </div>
  );
};

export default RecipePage;
