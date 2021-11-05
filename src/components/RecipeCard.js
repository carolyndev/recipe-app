import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { ReactComponent as TrashIcon } from '../images/trash.svg';

const RecipeCard = (props) => {
  const { favorites, setFavorites, id, title, src, showForm, uniqueFavorites } =
    props;

  const addFavorites = (e) => {
    e.target.classList.add('ripple');
    setFavorites((favorites) => {
      return [
        ...favorites,
        {
          id: id,
          title: title,
          src: src,
        },
      ];
    });
  };

  const removeFavorites = (e) => {
    setFavorites(uniqueFavorites.filter((item) => item.id !== id));
  };

  return (
    <div className="recipe relative text-left py-4 px-6 mb-4 border rounded border-solid border-gray-300 border-opacity-50 shadow-lg">
      <Link
        to={`/recipe/${id}`}
        className="flex flex-col justify-between items center"
      >
        <img
          className="mx-auto h-32 md:h-40 lg:h-42 w-full rounded-t mb-2 object-cover object-center leading-snug"
          src={src}
          alt={title}
        />
        <h3 className="h-12 lg:h-14 hover:text-green-400">
          <span>{title}</span>
        </h3>
      </Link>

      {showForm === true ? (
        <HeartIcon
          className="favorite-recipe absolute top-1 right-1 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:scale-110 transform transition-transform"
          onClick={addFavorites}
          onAnimationEnd={(e) => {
            e.target.classList.remove('ripple');
          }}
          favorites={favorites}
        />
      ) : (
        <TrashIcon
          className="favorite-recipe absolute bottom-2 right-2 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:scale-110 transform transition-transform"
          onClick={removeFavorites}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default RecipeCard;
