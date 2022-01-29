import React, { useEffect } from 'react';
import loadinggif from '../images/loading.gif';
import RecipeDetails from './RecipeDetails';

const Surprise = (props) => {
  const {
    API_KEY,
    animationReset,
    counter,
    saveLocalFavorites,
    setFavorites,
    setShowForm,
    ingredients,
    setIngredients,
    instructions,
    setInstructions,
    details,
    setDetails,
    recipeLoading,
    setRecipeLoading,
  } = props;

  useEffect(() => {
    setShowForm(false);
    setRecipeLoading(true);
    getRandomRecipe();
  }, [counter]);

  const getRandomRecipe = async () => {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (response.ok) {
      const res = await response.json();
      const data = res.recipes[0];
      setDetails(data);

      if (data.extendedIngredients) {
        setIngredients(data.extendedIngredients);
      }
      if (data.analyzedInstructions && data.analyzedInstructions[0]) {
        setInstructions(data.analyzedInstructions[0].steps);
      }
      setRecipeLoading(false);
    } else {
      console.log(response.statusText);
    }
  };

  return (
    <div className="recipe-container h-full max-w-90 mx-auto pb-8">
      {recipeLoading === true ? (
        <p className="loading-desc h-full mt-32 flex justify-center items-center">
          Grabbing a random recipe
          <span className="ml-2">
            <img
              src={loadinggif}
              alt="loading"
              className="loading-img inline-block w-4"
            />
          </span>
        </p>
      ) : (
        <RecipeDetails
          details={details}
          ingredients={ingredients}
          instructions={instructions}
          setFavorites={setFavorites}
          saveLocalFavorites={saveLocalFavorites}
          animationReset={animationReset}
        />
      )}
    </div>
  );
};

export default Surprise;
