import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);  // Set authentication state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Update state after logging out
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          {/* Redirect to dashboard if already authenticated */}
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Redirect to login if not authenticated */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
        {isAuthenticated && <Map />}
      </div>
    </Router>
  );
};

export default App;
