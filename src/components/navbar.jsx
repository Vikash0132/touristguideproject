import React, { useState } from 'react';
import './navbar.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

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
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={handleSearch} 
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}
