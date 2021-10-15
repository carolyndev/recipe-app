import React, { useState, useEffect } from 'react';
import { ReactComponent as LinkIcon } from '../images/link.svg';
import { ReactComponent as TimerIcon } from '../images/stopwatch.svg';
import { ReactComponent as PeopleIcon } from '../images/people.svg';
import { ReactComponent as PlusIcon } from '../images/plus.svg';

const RecipeDetails = (match) => {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const recipeID = match.match.params.id;

  useEffect(() => {
    match.setShowForm(false);
    match.setRecipeLoading(true);
    getDetails();
    console.log(details);
  }, [recipeID]);

  // fetch recipe details (api call #2)

  const getDetails = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${match.API_KEY}`
    );
    const data = await response.json();
    setDetails(data);
    if (data.extendedIngredients) {
      setIngredients(data.extendedIngredients);
    }
    if (data.analyzedInstructions && data.analyzedInstructions[0]) {
      setInstructions(data.analyzedInstructions[0].steps);
    }
    setTimeout(() => {
      match.setRecipeLoading(false);
    }, 500);
  };

  const addFavoritesDirect = (e) => {
    console.log('add fav');
    match.setFavorites((favorites) => {
      return [
        ...favorites,
        {
          id: details.id,
          title: details.title,
          src: details.image,
        },
      ];
    });
    match.saveLocalFavorites();
    e.target.classList.add('ripple');
  };

  const animationReset = (e) => {
    e.target.classList.remove('ripple');
  };

  //

  return (
    <div className="recipe-container h-full max-w-90 mx-auto pb-8">
      {match.recipeLoading === true ? (
        <p className="h-full mt-16 flex justify-center items-center">
          Loading Recipe Details...
        </p>
      ) : (
        <>
          <div className="py-2 pl-2 border-b border-gray-300 flex justify-between items-center">
            <h3 className="text-xl">{details.title}</h3>
            <span
              className="flex justify-center items-center py-1 px-2 border border-gray-50 hover:bg-gray-100 hover:border-gray-200 rounded hover:text-green-400 cursor-pointer"
              onClick={addFavoritesDirect}
              onAnimationEnd={animationReset}
            >
              add to favorites
              <PlusIcon className="ml-2 w-5 h-5" />
            </span>
          </div>
          <div className="recipe__details max-w-75 md:flex mx-auto my-8 justify-around items-center">
            <div className="recipe__summary mb-8">
              <a
                href={details.sourceUrl}
                rel="noreferrer"
                target="_blank"
                className="hover:text-green-400 flex items-center"
              >
                <h3 className="inline-block">
                  <LinkIcon className="inline-block mr-2" />
                  Recipe from: "{details.sourceName}"
                </h3>
              </a>
              <p className="flex items-center">
                <PeopleIcon className="mr-2" />
                serves: {details.servings}
              </p>
              <p className="flex items-center">
                <TimerIcon className="mr-2" />
                total time: {details.readyInMinutes}
              </p>
            </div>

            <div className="flex">
              <a href={details.sourceUrl} target="_blank">
                <img
                  className="inline-block max-w-sm max-h-64 mx-auto rounded"
                  src={details.image}
                  alt={details.title}
                />
              </a>
            </div>
          </div>

          <div className="recipe__information max-w-75 mx-auto">
            <div className="recipe__ingredients mb-8">
              <h4 className="ml-4 text-xl">Ingredients</h4>
              <ul className="ingredients-list pl-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={'ingredient' + index}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor={'ingredient' + index}
                      className="cursor-pointer"
                    >
                      {ingredient.original}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {instructions.length > 0 ? (
              <div className="recipe__instructions">
                <h4 className="ml-4 text-xl">Instructions</h4>
                <ol className="instructions-list list-decimal pl-8">
                  {instructions.map((step, index) => (
                    <li key={index} className="mb-1">
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
