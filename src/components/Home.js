import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Home = () => {
  const mapContainer = useRef(null);
  const [latitude, setLatitude] = useState(28.7041); // Default latitude (New Delhi)
  const [longitude, setLongitude] = useState(77.1025); // Default longitude (New Delhi)
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Request user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (mapContainer.current && !map) {
      // Initialize the map
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://maps.tilehosting.com/styles/positron/style.json?key=EIhSH3UkZEiWAdBabgXK', // MapTiler style URL
        center: [longitude, latitude],
        zoom: 10,
      });

      // Add a marker for the user's location
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);

      setMap(mapInstance);
    }

    // Fly to updated location when latitude or longitude changes
    if (map) {
      map.flyTo({ center: [longitude, latitude], zoom: 12 });
    }
  }, [mapContainer, map, latitude, longitude]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="side-panel" style={{ width: '300px', padding: '10px', background: '#f2f2f2' }}>
        <label>From:</label>
        <input type="text" placeholder="Starting Location" value="Your Location" readOnly />
        <label>To:</label>
        <input type="text" placeholder="Destination" readOnly />
        <div>
          <button>Bus</button>
          <button>Flight</button>
          <button>Train</button>
        </div>
      </div>
      <div ref={mapContainer} style={{ flexGrow: 1, height: '100%' }} />
    </div>
  );
};

export default Home;
