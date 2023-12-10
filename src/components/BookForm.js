import React, { useState } from "react";

const BookForm = ({ onAddBook }) => {
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(newBook);
    setNewBook({ title: "", author: "", genre: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
