import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; // Adjust the URL according to your back-end setup

// Function to get all books
export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${apiUrl}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Function to get a book by ID
export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        throw error;
    }
};

// Function to create a new book
export const createBook = async (bookData) => {
    try {
        const response = await axios.post(`${apiUrl}/books`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Function to update a book
export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${apiUrl}/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Function to delete a book
export const deleteBook = async (id) => {
    try {
        await axios.delete(`${apiUrl}/books/${id}`);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
