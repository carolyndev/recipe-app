import React, { useState, useEffect } from 'react';
import { ReactComponent as LinkIcon } from '../images/link.svg';
import { ReactComponent as TimerIcon } from '../images/stopwatch.svg';
import { ReactComponent as PeopleIcon } from '../images/people.svg';
import { ReactComponent as PlusIcon } from '../images/plus.svg';
import loadinggif from '../images/loading.gif';

const Surprise = (props) => {
  const {
    API_KEY,
    animationReset,
    counter,
    saveLocalFavorites,
    setFavorites,
    setShowForm,
  } = props;
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [randomRecipeIng, setRandomRecipeIng] = useState([]);
  const [randomRecipeInst, setRandomRecipeInst] = useState([]);
  const [randomLoading, setRandomLoading] = useState(false);

  useEffect(() => {
    setRandomLoading(true);
    setShowForm(false);
    getRandomRecipe();
  }, [counter]);

  const getRandomRecipe = async () => {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (response.ok) {
      const res = await response.json();
      const data = res.recipes[0];
      setRandomRecipe(data);
      if (data.extendedIngredients) {
        setRandomRecipeIng(data.extendedIngredients);
      }
      if (data.analyzedInstructions && data.analyzedInstructions[0]) {
        setRandomRecipeInst(data.analyzedInstructions[0].steps);
      }
      setRandomLoading(false);
    } else {
      console.log(response.statusText);
    }
  };

  const addRandomFavorite = (e) => {
    setFavorites((favorites) => {
      return [
        ...favorites,
        {
          id: randomRecipe.id,
          title: randomRecipe.title,
          src: randomRecipe.image,
        },
      ];
    });
    saveLocalFavorites();
    e.target.classList.add('ripple');
  };

  return (
    <>
      {randomLoading ? (
        <p className="loading-desc h-full mt-32 flex justify-center items-center">
          Grabbing a random recipe
          <span className="ml-1">
            <img
              src={loadinggif}
              alt="loading"
              className="loading-img inline-block w-4"
            />
          </span>
        </p>
      ) : (
        <div className="recipe-container max-w-90 mx-auto pb-8">
          <div className="recipe__header py-2 pl-2 border-b border-gray-300 flex justify-between items-end">
            <h3 className="header-title text-xl">{randomRecipe.title}</h3>
            <span
              className="header-favorite flex justify-center items-center py-1 px-2 border border-gray-50 hover:bg-gray-100 hover:border-gray-200 rounded hover:text-green-400 cursor-pointer"
              onClick={addRandomFavorite}
              onAnimationEnd={animationReset}
            >
              add to favorites
              <PlusIcon className="ml-2 w-5 h-5" />
            </span>
          </div>
          <div className="recipe__details max-w-75 md:flex mx-auto my-8 justify-around items-center">
            <div className="recipe__summary mb-8">
              <h3 className="inline-block">
                <a
                  href={randomRecipe.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="hover:text-green-400 flex items-center"
                >
                  <LinkIcon className="inline-block mr-2" />
                  Recipe from: "{randomRecipe.sourceName}"
                </a>
              </h3>
              <p className="flex items-center">
                <PeopleIcon className="mr-2" />
                serves: {randomRecipe.servings}
              </p>
              <p className="flex items-center">
                <TimerIcon className="mr-2" />
                total time: {randomRecipe.readyInMinutes}
              </p>
            </div>

            <div className="recipe__image flex justify-center">
              <a href={randomRecipe.sourceUrl} rel="noreferrer" target="_blank">
                <img
                  className="inline-block max-w-sm max-h-64 mx-auto rounded"
                  src={randomRecipe.image}
                  alt={randomRecipe.title}
                />
              </a>
            </div>
          </div>

          <div className="recipe__information max-w-75 mx-auto">
            <div className="recipe__ingredients mb-8">
              {randomRecipeIng.length > 0 && (
                <>
                  <h4 className="ingredients-title ml-4 text-xl">
                    Ingredients
                  </h4>
                  <ul className="ingredients-list pl-2">
                    {randomRecipeIng.map((ingredient, index) => (
                      <li key={index}>
                        <input
                          type="checkbox"
                          id={'ingredient' + index}
                          className="ingredient mr-2 cursor-pointer"
                        />
                        <label
                          htmlFor={'ingredient' + index}
                          className="ingredient-label cursor-pointer"
                        >
                          {ingredient.original}
                        </label>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {randomRecipeInst.length > 0 && (
              <div className="recipe__instructions">
                <h4 className="ml-4 text-xl">Instructions</h4>
                <ol className="instructions-list list-decimal pl-8">
                  {randomRecipeInst.map((step, index) => (
                    <li key={index} className="mb-1">
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Surprise;
