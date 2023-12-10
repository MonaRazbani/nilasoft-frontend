import React, { useState } from "react";
import Modal from "./Modal"; // Make sure you have a Modal component

const BookList = ({ books, onDelete, onUpdate }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");
  const [updatedGenre, setUpdatedGenre] = useState("");

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setUpdatedTitle(book.title);
    setUpdatedAuthor(book.author);
    setUpdatedGenre(book.genre);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = () => {
    const updatedBook = {
      id: selectedBook.id,
      title: updatedTitle,
      author: updatedAuthor,
      genre: updatedGenre,
    };

    onUpdate(updatedBook);
    setShowUpdateModal(false);
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span>** {book.title} **</span>
            <span>{book.author} **</span>
            <span>{book.genre} **</span>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            <button onClick={() => handleUpdate(book)}>Update</button>
          </li>
        ))}
      </ul>

      {showUpdateModal && (
        <Modal>
          <h2>Update Book</h2>
          <label>Title:-- </label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <label>Author: -- </label>
          <input
            type="text"
            value={updatedAuthor}
            onChange={(e) => setUpdatedAuthor(e.target.value)}
          />
          <label>Genre: -- </label>
          <input
            type="text"
            value={updatedGenre}
            onChange={(e) => setUpdatedGenre(e.target.value)}
          />
          <button onClick={handleUpdateSubmit}>OK</button>
          <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default BookList;
