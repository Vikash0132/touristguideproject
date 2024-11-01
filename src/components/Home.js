import React, { useState, useEffect, useRef } from 'react';
import { Map } from '@maptiler/sdk'; // Replace with the correct Maptiler SDK import

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const fromInputRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once on mount
    if (!mapRef.current) {
      mapRef.current = new Map({
        container: 'map', // ID of the map container in the DOM
        style: 'https://api.maptiler.com/maps/basic/style.json?key=TCsVxUMcJl3mlo6cnAXL',
        center: [0, 0], // Default center
        zoom: 2,
      });

      // Wait for the map to load before adding controls or setting user location
      mapRef.current.on('load', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });

              // Move map to user’s location and update the 'From' field
              mapRef.current.flyTo({ center: [longitude, latitude], zoom: 12 });
              if (fromInputRef.current) {
                fromInputRef.current.value = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
              }

              // Draw route if a destination is selected
              if (selectedDestination) {
                drawRoute([longitude, latitude], getDestinationCoords(selectedDestination));
              }
            },
            (error) => console.error('Error fetching location:', error)
          );
        }
      });
    }
  }, [selectedDestination]);

  const drawRoute = (fromCoords, toCoords) => {
    if (!mapRef.current || !fromCoords || !toCoords) return;

    const route = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [fromCoords, toCoords],
      },
    };

    if (mapRef.current.getSource('route')) {
      mapRef.current.getSource('route').setData(route);
    } else {
      mapRef.current.addSource('route', { type: 'geojson', data: route });
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#888', 'line-width': 6 },
      });
    }
  };

  const getDestinationCoords = (destination) => {
    const coords = {
      Paris: [2.3522, 48.8566],
      Kathmandu: [85.3240, 27.7172],
      // Add more destinations as needed
    };
    return coords[destination];
  };

  return (
    <div className="home-tab">
      {selectedDestination ? (
        <div className="booking-page">
          <h1 className="destination-title">{selectedDestination}</h1>
          <div className="booking-content">
            <div className="side-panel">
              <div>
                <label>From: </label>
                <input type="text" placeholder="Starting Location" ref={fromInputRef} readOnly />
              </div>
              <div>
                <label>To: </label>
                <input type="text" value={selectedDestination} readOnly />
              </div>
              <div className="transport-buttons">
                <button>Bus</button>
                <button>Flight</button>
                <button>Train</button>
              </div>
              <button onClick={() => setSelectedDestination(null)}>Go Back</button>
            </div>
            <div id="map" style={{ width: '100%', height: '500px' }} />
          </div>
        </div>
      ) : (
        <div className="destination-list">
          {/* Render destination tiles here */}
        </div>
      )}
    </div>
  );
};

export default Home;
