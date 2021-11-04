import React from 'react';

const Pagination = (props) => {
  const {
    firstRecipeIndex,
    lastRecipeIndex,
    recipes,
    recipesPerPage,
    setCurrentPage,
    displayedRecipes,
    currentPage,
  } = props;

  const pages = [];

  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pages.push(i);
  }

  const goToPage = (e) => {
    setCurrentPage(e.target.innerText);
  };

  return (
    <div className="flex justify-center items-center max-w-90 mx-auto mb-4">
      <div>
        {pages.map((page) => (
          <button
            key={page}
            className={
              currentPage === page
                ? 'border px-2 py-1 mr-1 rounded underline text-green-400 pointer-events-none'
                : 'hover:text-green-400 border px-2 py-1 mr-1 rounded cursor-pointer'
            }
            onClick={goToPage}
          >
            {page}
          </button>
        ))}
      </div>
      {/* <p>
        showing {firstRecipeIndex + 1} -{' '}
        {displayedRecipes.length < 12
          ? recipes.length
          : displayedRecipes.length * currentPage}
        {' '}
        of {recipes.length} results
      </p> */}
    </div>
  );
};

export default Pagination;
