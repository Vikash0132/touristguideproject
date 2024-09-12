import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search functionality here
    console.log('Search Query:', searchQuery);
  };

  // Function to handle login success (you'll need to implement this)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="heading">
          <h1>Touristo</h1>
        </div>
        {isLoggedIn && (
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
        {/* Login component or button */}
      </div>
    </nav>
  );
};

export default Navbar;