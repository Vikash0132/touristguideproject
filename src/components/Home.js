import React, { useState, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Home.css';

const MAPTILER_API_KEY = "YOUR_MAPTILER_API_KEY"; // Replace with your MapTiler API Key

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const mapRef = useRef(null);

  const destinations = {
    International: [
      { name: "Paris", coords: [2.3522, 48.8566], img: "paris.jpg" },
      { name: "Kathmandu", coords: [85.324, 27.7172], img: "kathmandu.jpg" },
      { name: "Italy", coords: [12.4964, 41.9028], img: "italy.jpg" },
      { name: "Thailand", coords: [100.9925, 15.8700], img: "thailand.jpg" },
      { name: "Dubai", coords: [55.2708, 25.2048], img: "dubai.jpg" },
      { name: "Bali", coords: [115.209, -8.3405], img: "bali.jpg" },
    ],
    National: [
      { name: "Dehradun", coords: [78.0322, 30.3165], img: "dehradun.jpg" },
      { name: "Manali", coords: [77.1892, 32.2432], img: "manali.jpg" },
      { name: "Goa", coords: [74.1240, 15.2993], img: "goa.jpg" },
    ],
  };

  const handleClick = (destination) => {
    setSelectedDestination(destination);
  };

  useEffect(() => {
    // Initialize map
    if (mapRef.current && !mapRef.current.map) {
      mapRef.current.map = new maplibregl.Map({
        container: mapRef.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
        center: [77.2090, 28.6139],
        zoom: 5,
      });
    }

    // Fetch user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFromLocation({ latitude, longitude });
        document.querySelector('#fromInput').value = `${latitude}, ${longitude}`;

        if (mapRef.current.map) {
          new maplibregl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current.map);
        }
      },
      (error) => console.error('Error fetching location:', error)
    );

    return () => mapRef.current && mapRef.current.map && mapRef.current.map.remove();
  }, []);

  useEffect(() => {
    if (mapRef.current.map && fromLocation && selectedDestination) {
      const destinationCoords = selectedDestination.coords;

      // Remove existing line if any
      if (mapRef.current.map.getSource('line-source')) {
        mapRef.current.map.removeLayer('line-layer');
        mapRef.current.map.removeSource('line-source');
      }

      // Add line connecting user's location to destination
      mapRef.current.map.addSource('line-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [fromLocation.longitude, fromLocation.latitude],
              destinationCoords,
            ],
          },
        },
      });

      mapRef.current.map.addLayer({
        id: 'line-layer',
        type: 'line',
        source: 'line-source',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#3b82f6', 'line-width': 3 },
      });

      // Center map to fit both locations
      mapRef.current.map.fitBounds([
        [fromLocation.longitude, fromLocation.latitude],
        destinationCoords,
      ], { padding: 50 });
    }
  }, [fromLocation, selectedDestination]);

  return (
    <div className="home-tab">
      {selectedDestination ? (
        <div className="booking-page">
          <h1 className="destination-title">{selectedDestination.name}</h1>
          <div className="booking-content">
            <div className="side-panel">
              <div>
                <label>From: </label>
                <input id="fromInput" type="text" placeholder="Starting Location" readOnly />
              </div>
              <div>
                <label>To: </label>
                <input type="text" value={selectedDestination.name} readOnly />
              </div>
              <div className="transport-buttons">
                <button>Bus</button>
                <button>Flight</button>
                <button>Train</button>
              </div>
              <button onClick={() => setSelectedDestination(null)}>Go Back</button>
            </div>
            <div className="map-container">
              <div ref={mapRef} className="map" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {Object.keys(destinations).map((category) => (
            <div key={category} className="category-container">
              <div className="category-header">{category}</div>
              <div className="grid-container">
                {destinations[category].map((destination) => (
                  <div
                    key={destination.name}
                    className="destination-tile"
                    onClick={() => handleClick(destination)}
                  >
                    <img src={destination.img} alt={destination.name} className="destination-img" />
                    <span>{destination.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
