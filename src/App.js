import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar.jsx';
import Map from './components/map.jsx';
import './App.css';

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="App">
      {/* Conditionally render Navbar and Map based on the current route */}
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {location.pathname !== '/' && <Map />} {/* Show Map only on non-login pages */}
    </div>
  );
}

// Wrapping the app in Router for proper navigation
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
