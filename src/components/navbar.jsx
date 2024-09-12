import React, { useState } from 'react';
import './navbar.css';
import Login from './Login.js'; // Import Login component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Local state for login status

  const handleLoginSuccess = (loggedIn) => {
    setIsLoggedIn(loggedIn); // Update local login state
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
        <Login onLoginSuccess={handleLoginSuccess} /> {/* Pass onLoginSuccess prop */}
      </div>
    </nav>
  );
};

export default Navbar;