import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './map';

const Home = () => {
  const [startingCoordinates, setStartingCoordinates] = useState(null);
  const [destination, setDestination] = useState({
    name: 'Paris',
    coordinates: [2.3522, 48.8566], // Default destination (Paris coordinates)
  });

  // Function to get the live location or set a default if denied
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStartingCoordinates([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      (error) => {
        console.error('Error getting location:', error);
        if (error.code === 1) {
          // If permission denied, set default coordinates (e.g., New York)
          setStartingCoordinates([-74.006, 40.7128]);
        }
      }
    );
  }, []);

  // Function to handle input change for the 'From' input box
  const handleFromInputChange = async (event) => {
    const location = event.target.value;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
      );
      if (response.data.length > 0) {
        const { lon, lat } = response.data[0];
        setStartingCoordinates([parseFloat(lon), parseFloat(lat)]);
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <div>
      <label>
        From:
        <input type="text" placeholder="Enter starting location" onBlur={handleFromInputChange} />
      </label>
      <Map destination={destination} startingCoordinates={startingCoordinates} />
    </div>
  );
};

export default Home;
