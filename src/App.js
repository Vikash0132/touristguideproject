import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx';
import './App.css';

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (can be passed to the Login component)
  const handleLogin = () => {
    // Simulate login (you would replace this with real login logic)
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {/* Conditionally render the Navbar and Map only if the user is logged in */}
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* Conditionally render the Map only if the user is logged in */}
        {isLoggedIn && <Map />}
      </div>
    </Router>
  );
}

export default App;
