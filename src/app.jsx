import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books');
        setBooks(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app">
      <h1>Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.BookID}>{book.BookName}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
