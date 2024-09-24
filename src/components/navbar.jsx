import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);
  };

  const handleLogout = () => {
    // Trigger logout passed from the parent (App.js)
    onLogout();
    navigate('/', { replace: true });  // Use `replace: true` to avoid back navigation to the dashboard
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
