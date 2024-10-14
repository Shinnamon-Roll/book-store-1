import React from 'react';
import ReactDOM from 'react-dom';
import './app.css'; // Import your CSS file
import BookList from './BookList'; // Adjust the path if necessary
import Register from './Register'; // Assuming you have a Register component
import Login from './Login'; // Assuming you have a Login component

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Welcome to the Book Store</h1>
      </header>
      <main>
        <BookList />
        <Register />
        <Login />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
