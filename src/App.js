import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx';
import './App.css';

const App = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  // Monitor changes in authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Remove auth token and update the authentication state
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Ensures UI knows about the logout
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          {/* If not authenticated, redirect to login */}
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Redirect to login if the user is not authenticated */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
        {isAuthenticated && <Map />}
      </div>
    </Router>
  );
};

export default App;
