import React from 'react';

const Pagination = (props) => {
  const { recipes, recipesPerPage, currentPage, setCurrentPage } = props;

  const pageNumbers = [];
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const goToPage = (e) => {
    setCurrentPage(parseInt(e.target.innerText));
  };

  return (
    <div className="flex justify-center items-center max-w-90 mx-auto mb-4">
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={
            currentPage === pageNum
              ? 'border px-2 py-1 mr-1 rounded underline text-green-400 pointer-events-none'
              : 'hover:text-green-400 border px-2 py-1 mr-1 rounded cursor-pointer'
          }
          onClick={goToPage}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
