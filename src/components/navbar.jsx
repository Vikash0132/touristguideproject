import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);

    // Example search logic
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    } else {
      console.error('Search query is empty');
    }
  };

  const handleLogout = () => {
    // Remove auth token from localStorage
    localStorage.removeItem('authToken');

    // Force re-render by navigating to the login page after logging out
    navigate('/', { replace: true });
    window.location.reload(); // This forces the page to reload to ensure a fresh state
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="heading">
          <h1>Touristo</h1>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}