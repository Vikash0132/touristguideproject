import React, { useState, useContext } from 'react';
import './navbar.css';
import { LoginContext } from './context/LoginContext'; // Import LoginContext

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn } = useContext(LoginContext); // Use context to access login state

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search functionality here.
    // You may need to pass data or filter results as needed.
    console.log('Search Query:', searchQuery);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="heading">
          <h1>Touristo</h1>
        </div>
        {isLoggedIn && ( // Conditionally render search bar based on isLoggedIn
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button type="submit">Search</button>
          </form>
        )}
      </div>
    </nav>
  );
}