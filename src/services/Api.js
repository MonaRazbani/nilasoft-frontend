import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/books"; // Adjust this URL based on your backend API endpoint

// Function to fetch all books
export const getBooks = async (searchCriteria) => {
  try {
    const response = await axios.get(API_BASE_URL, { params: searchCriteria });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new book
export const addBook = async (newBook) => {
  try {
    const response = await axios.post(API_BASE_URL, newBook);
    debugger;
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a book by ID
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a book by ID
export const updateBook = async (updatedBook) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${updatedBook.id}`,
      updatedBook
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchBooks = async (searchCriteria) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search`, searchCriteria);
    return response.data;
  } catch (error) {
    throw error;
  }
};
