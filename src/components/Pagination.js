import React from "react";

const Pagination = ({
  booksPerPage,
  totalBooks,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => handleClick(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
