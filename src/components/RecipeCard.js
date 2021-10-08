import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
  const {
    clearResults,
    loading,
    setLoading,
    id,
    title,
    src,
    search,
    setSearch,
  } = props;

  return (
    <div
      onClick={clearResults}
      className="recipe text-left flex flex-col justify-end py-4 px-6 mb-4 border rounded border-solid border-gray-300 border-opacity-50 shadow-lg"
    >
      <Link to={`/recipe/${id}`}>
        <img
          className="rounded-t mb-2 mx-auto object-cover object-center"
          src={src}
          alt={title}
        />
        <h3 className="h-12 lg:h-14 hover:text-green-400">{title}</h3>
      </Link>
    </div>
  );
};

export default RecipeCard;
