import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import illustration2 from '../images/food-illu-2.png';

const Favorites = (props) => {
  const { returnHome, setRecipes, setShowForm, setFavorites, uniqueFavorites } =
    props;

  useEffect(() => {
    setShowForm(false);
  }, []);

  const deleteAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      setFavorites([]);
      setRecipes([]);
    }
  };

  return (
    <>
      {uniqueFavorites.length > 0 ? (
        <>
          <div className="flex justify-between items-center max-w-90 my-8 mx-auto">
            <h3 className="">Favorited recipes</h3>
            <button
              className="py-1 px-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 hover:text-green-400"
              onClick={deleteAllFavorites}
            >
              <span>remove all</span>
            </button>
          </div>
          <div
            className="recipe__list max-w-90 3xl:max-w-50 h-full pb-8 grid grid-auto-rows auto-cols-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr gap-4 gap-y-6 md:gap-6 lg:gap-8 mx-auto"
            id="recipe-list"
          >
            {uniqueFavorites.map((item) => (
              <RecipeCard
                key={item.id}
                id={item.id}
                src={item.src}
                title={item.title}
                uniqueFavorites={uniqueFavorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex flex-col justify-center items-center">
            <img
              src={illustration2}
              alt="food illustration 2"
              className="w-6/12 mx-auto my-8"
            />
            <p className="max-w-90 mx-auto mb-4">No favorites...yet!</p>
            <Link to={'/recipe-app'} onClick={returnHome}>
              <button className="py-1 px-2 border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 hover:text-green-400">
                Discover a new go-to recipe now!
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
