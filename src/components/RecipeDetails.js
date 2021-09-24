import React, { useState, useEffect } from 'react';
import { ReactComponent as LinkIcon } from '../images/link.svg';

const RecipeDetails = (match, props) => {
  const recipeID = match.match.params.id;
  const { recipes, setRecipes } = props;
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  // fetch recipe details (api call #2)

  async function getDetails() {
    const API_KEY = '50aa27339ac74c17a68aefe745b2be28';
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    const data = await response.json();

    setDetails(data);
    setIngredients(data.extendedIngredients);
    console.log(data);
    console.log(recipes);
  }

  //

  return (
    <div className="h-full border pb-8 max-w-75 mx-auto shadow-md">
      <p className="bg-green-400">this is recipe #{recipeID}</p>

      <div className="recipe-title md:flex m-4 items-center">
        <a
          href={details.sourceUrl}
          rel="noreferrer"
          target="_blank"
          className="hover:text-green-400 md:max-w-50 mr-4 flex items-center"
        >
          <h3 className="inline-block flex-grow-0">
            {details.title}
            <LinkIcon className="inline-block ml-2" />
          </h3>
        </a>

        <div className="flex flex-grow mt-4">
          <img
            className="inline-block max-w-sm max-h-64 mx-auto"
            src={details.image}
            alt={details.title}
          />
        </div>
      </div>

      <div className="recipe-summary">
        <h4 className="ml-4">Ingredients</h4>
        <ul className="ingredients-list">
          {ingredients.map((ingredient) => (
            <li>{ingredient.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
