import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search Query:', searchQuery);
  };

  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>Touristo</h1>
        </div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
