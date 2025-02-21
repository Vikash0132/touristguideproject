import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './navbar.css';

// Debounce function to prevent multiple calls within a short time
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);

    // Example search logic
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    } else {
      console.error('Search query is empty');
      if (!searchQuery) return;
    }

    // Call the MapTiler Geocoding API
    try {
      const response = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            key: 'TCsVxUMcJl3mlo6cnAXL', // Replace with your MapTiler API key
            limit: 10, // Limit the number of results
          },
        }
      );
      // Call the parent onSearch function with the fetched results
      onSearch(response.data.features);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogout = debounce(() => {
    // Remove auth token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/');
  }, 300); // Debounced by 300ms

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