import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);  // Set authentication state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

<<<<<<< HEAD
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
=======
>>>>>>> 5195875e58bc3d5a987b4c31dcda81a09443cceb

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
<<<<<<< HEAD
        {isAuthenticated && <Map searchQuery={searchQuery} />}
=======
        {/*removed map component*/}
>>>>>>> 5195875e58bc3d5a987b4c31dcda81a09443cceb
      </div>
    </Router>
  );
};

export default App;