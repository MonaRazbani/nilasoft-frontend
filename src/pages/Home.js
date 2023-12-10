import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
  searchBooks,
} from "../services/Api";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");
  const [updatedGenre, setUpdatedGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [foundBooks, setFoundBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [searchCriteria, currentPage, books]);

  const fetchBooks = async () => {
    try {
      const data = await searchBooks(searchCriteria);
      setFoundBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const handleAddBook = async (newBook) => {
    try {
      if (!(newBook.title && newBook.auther && newBook.genre)) {
        alert("invalid input");
        return;
      }
      const addedBook = await addBook(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleUpdateBook = async () => {
    const updatedBook = {
      id: selectedBook.id,
      title: updatedTitle,
      author: updatedAuthor,
      genre: updatedGenre,
    };

    try {
      await updateBook(updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? updatedBook : book
        )
      );
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setUpdatedTitle(book.title);
    setUpdatedAuthor(book.author);
    setUpdatedGenre(book.genre);
    setShowUpdateModal(true);
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks =
    foundBooks.length > 0
      ? foundBooks
      : books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <h1>Local Library</h1>
      <BookForm onAddBook={handleAddBook} />
      <SearchBar onSearch={handleSearch} />

      {/* Display found books section */}
      {foundBooks.length > 0 && (
        <div>
          <h2>Found Books</h2>
          <BookList
            books={foundBooks}
            onDelete={handleDeleteBook}
            onUpdate={handleUpdate}
          />
        </div>
      )}

      {/* Display all books section */}
      {foundBooks.length === 0 && (
        <div>
          <h2>All Books</h2>
          <BookList
            books={currentBooks}
            onDelete={handleDeleteBook}
            onUpdate={handleUpdate}
          />
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {showUpdateModal && (
        <Modal>
          <h2>Update Book</h2>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            value={updatedAuthor}
            onChange={(e) => setUpdatedAuthor(e.target.value)}
          />
          <label>Genre:</label>
          <input
            type="text"
            value={updatedGenre}
            onChange={(e) => setUpdatedGenre(e.target.value)}
          />
          <button onClick={handleUpdateBook}>OK</button>
          <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
}

export default Home;
