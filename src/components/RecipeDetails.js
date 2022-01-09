import React from 'react';
import { ReactComponent as LinkIcon } from '../images/link.svg';
import { ReactComponent as TimerIcon } from '../images/stopwatch.svg';
import { ReactComponent as PeopleIcon } from '../images/people.svg';
import { ReactComponent as PlusIcon } from '../images/plus.svg';

const RecipeDetails = (props) => {
  const {
    animationReset,
    details,
    ingredients,
    instructions,
    setFavorites,
    saveLocalFavorites,
  } = props;

  const addFavoritesDirect = (e) => {
    setFavorites((favorites) => {
      return [
        ...favorites,
        {
          id: details.id,
          title: details.title,
          src: details.image,
        },
      ];
    });
    saveLocalFavorites();
    e.target.classList.add('ripple');
  };

  return (
    <>
      <div className="recipe__header py-2 pl-2 border-b border-gray-300 flex justify-between items-end">
        <h3 className="header-title text-xl">{details.title}</h3>
        <span
          className="header-favorite flex justify-center items-center py-1 px-2 border border-gray-50 hover:bg-gray-100 hover:border-gray-200 rounded hover:text-green-400 cursor-pointer"
          onClick={addFavoritesDirect}
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
              href={details.sourceUrl}
              rel="noreferrer"
              target="_blank"
              className="hover:text-green-400 flex items-center"
            >
              <LinkIcon className="inline-block mr-2" />
              Recipe from: "{details.sourceName}"
            </a>
          </h3>
          <p className="flex items-center">
            <PeopleIcon className="mr-2" />
            serves: {details.servings}
          </p>
          <p className="flex items-center">
            <TimerIcon className="mr-2" />
            total time: {details.readyInMinutes} mins
          </p>
        </div>

        <div className="flex justify-center">
          <a href={details.sourceUrl} rel="noreferrer" target="_blank">
            <img
              className="inline-block max-w-sm max-h-64 mx-auto rounded"
              src={details.image}
              alt={details.title}
            />
          </a>
        </div>
      </div>

      <div className="recipe__information max-w-75 mx-auto">
        {ingredients.length > 0 && (
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
        )}
        {instructions.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
