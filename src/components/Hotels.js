import React, { useState, useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import axios from 'axios';
import 'maplibre-gl/dist/maplibre-gl.css';

const Hotels = () => {
  const mapContainer = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [latitude, setLatitude] = useState(28.7041); // Default: New Delhi
  const [longitude, setLongitude] = useState(77.1025);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapContainer.current) {
      const initializeMap = () => {
        const mapInstance = new maplibregl.Map({
          container: mapContainer.current,
          style: 'https://maps.tilehosting.com/styles/positron/style.json?key=EIhSH3UkZEiWAdBabgXK', // MapTiler style
          center: [longitude, latitude],
          zoom: 10,
        });
        setMap(mapInstance);
      };

      if (!map) initializeMap();
    }
  }, [map, latitude, longitude]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const locations = response.data;
      if (locations.length > 0) {
        const { lat, lon } = locations[0];
        setLatitude(Number(lat));
        setLongitude(Number(lon));

        if (map) {
          map.flyTo({ center: [Number(lon), Number(lat)], zoom: 12 });

          // Remove previous markers
          document.querySelectorAll('.marker').forEach(marker => marker.remove());

          // Add a marker for the searched location
          new maplibregl.Marker({ color: '#FF0000' })
            .setLngLat([lon, lat])
            .addTo(map)
            .getElement().classList.add('marker');
        }

        setSearchResults(locations);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h1>Search for Locations</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          Search
        </button>
      </form>

      {/* Map */}
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />

      {/* Search Results */}
      <div>
        <h2>Search Results</h2>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {searchResults.map((location, index) => (
              <li key={index}>
                <h3>{location.display_name}</h3>
                <p>
                  Lat: {location.lat}, Lon: {location.lon}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Hotels;
