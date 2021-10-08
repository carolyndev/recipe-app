import React, { useState, useEffect } from 'react';
import { ReactComponent as LinkIcon } from '../images/link.svg';
import { ReactComponent as TimerIcon } from '../images/stopwatch.svg';
import { ReactComponent as PeopleIcon } from '../images/people.svg';

const RecipeDetails = (match, props) => {
  const recipeID = match.match.params.id;

  // const { recipes, loading, setLoading } = props;
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);

  useEffect(() => {
    setRecipeLoading(true);
    getDetails();
  }, [recipeID]);

  // fetch recipe details (api call #2)

  const getDetails = async () => {
    const API_KEY = '50aa27339ac74c17a68aefe745b2be28';

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    const data = await response.json();
    setDetails(data);
    setIngredients(data.extendedIngredients);
    setInstructions(data.analyzedInstructions[0].steps);
    setTimeout(() => {
      setRecipeLoading(false);
    }, 750);
  };

  //

  return (
    <div className="h-full pb-16 mb-16 max-w-90 mx-auto">
      {recipeLoading === true ? (
        <p className="max-w-75 mx-auto">Loading Recipe Details...</p>
      ) : (
        <>
          <p className="py-2 pl-2 border-t border-b border-gray-300">
            {details.title}
          </p>
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
              <a href={details.sourceName}>
                <img
                  className="inline-block max-w-sm max-h-64 mx-auto"
                  src={details.image}
                  alt={details.title}
                />
              </a>
            </div>
          </div>

          <div className="recipe__information max-w-75 mx-auto">
            <div className="recipe__ingredients mb-8">
              <h4 className="ml-4 text-2xl">Ingredients</h4>
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

            <div className="recipe__instructions">
              <h4 className="ml-4 text-2xl">Instructions</h4>
              <ol className="instructions-list list-decimal pl-8">
                {instructions.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
