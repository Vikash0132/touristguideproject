import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

// Debounce function to prevent multiple calls within a short time
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10000); // Start with 10km
  const navigate = useNavigate();

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error.message); // Log the actual error message
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              console.error('An unknown error occurred.');
              break;
            default:
              console.error('Error occurred.');
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery || !userLocation) return;

    const fetchResults = async (radius) => {
      try {
        const response = await axios.get(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(searchQuery)}.json`,
          {
            params: {
              key: 'VET3ydcm5LVgUZPZO2t4', // Replace with your MapTiler API key
              proximity: `${userLocation.longitude},${userLocation.latitude}`, // Focus on user's location
              radius, // Limit search results to the given radius
              limit: 10,
            },
          }
        );

        if (response.data.features.length === 0 && radius < 300000) {
          // If no results found and radius is less than 300km, increase the radius and search again
          setSearchRadius((prevRadius) => prevRadius + 50000); // Increase by 50km
          fetchResults(searchRadius + 50000); // Retry with larger radius
        } else {
          onSearch(response.data.features); // Call the parent with the fetched results
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults(searchRadius);
  };

  const handleLogout = debounce(() => {
    // Remove auth token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/');
  }, 300); // Debounced by 300ms

  return (
    <nav>
      <div className="nav-container">
        <div className="heading">
          <h1>Touristo</h1>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
