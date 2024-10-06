import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx'; // Your Map component
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [searchResults, setSearchResults] = useState([]); // State for storing search results

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);  // Set authentication state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const handleSearch = (results) => {
    setSearchResults(results); // Update search results state
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onSearch={handleSearch} onLogout={handleLogout} />}
        <Routes>
          {/* Redirect to dashboard if already authenticated */}
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Redirect to login if not authenticated */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
        {isAuthenticated && <Map searchResults={searchResults} />} {/* Pass searchResults to Map */}
      </div>
    </Router>
  );
};

export default App;