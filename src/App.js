import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Update the state after logging out
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onSearch={handleSearch} onLogout={handleLogout} />}
        <Routes>
          {/* Redirect to login page if not authenticated */}
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Dashboard page - visible only if authenticated */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

          {/* Home page - visible only if authenticated */}
          <Route path="/home" element={isAuthenticated ? <Home searchQuery={searchQuery} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;