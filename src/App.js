import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth'; // Custom authentication hook
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx; 
import './App.css';

const App = () => {
  const { isAuthenticated, logout } = useAuth();  // Using custom hook
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onSearch={handleSearch} onLogout={logout} />}
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
        {isAuthenticated && <Map searchResults={searchResults} />} {/* Map only for authenticated users */}
      </div>
    </Router>
  );
};

export default App;
