import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate(); // Add useNavigate for redirection

  // Re-check authentication when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Update state after logging out
    navigate('/'); // Navigate to login page after logout
  };

  return (
    <div className="App">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}  {/* Pass logout handler */}
      <Routes>
        {/* Redirect to dashboard if already authenticated */}
        <Route path="/" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />

        {/* Redirect to login if not authenticated */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
      {isAuthenticated && <Map />}
    </div>
  );
};

export default App;
