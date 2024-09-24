import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar';
import Map from './components/map';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  // Watch for authentication state updates when app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);  // Ensure state is updated after logout
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}  {/* Pass the logout function */}
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
        {isAuthenticated && <Map />}  {/* Render the Map component only when authenticated */}
      </div>
    </Router>
  );
};

export default App;
