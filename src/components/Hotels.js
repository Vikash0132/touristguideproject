import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const mapContainer = useRef(null);

  // Dynamic latitude and longitude
  const [latitude, setLatitude] = useState(37.7749); // Default latitude
  const [longitude, setLongitude] = useState(-122.4194); // Default longitude

  const OSM_NOMINATIM_URL = `https://nominatim.openstreetmap.org/search?`;

  const fetchHotels = async () => {
    const OSM_NOMINATIM_QUERY = `q=hotel&format=json&limit=10&addressdetails=1&bbox=${longitude - 0.1},${latitude - 0.1},${longitude + 0.1},${latitude + 0.1}`;
    try {
      const response = await axios.get(`${OSM_NOMINATIM_URL}${OSM_NOMINATIM_QUERY}`);
      setHotels(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [latitude, longitude]);

  useEffect(() => {
    if (mapContainer.current && hotels.length > 0) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://maps.tilehosting.com/styles/positron/style.json?key=EIhSH3UkZEiWAdBabgXK', // Replace with your MapTiler style URL
        center: [longitude, latitude],
        zoom: 14,
      });

      // Add markers for hotels
      hotels.forEach(hotel => {
        if (hotel.lon && hotel.lat) {
          const marker = new maplibregl.Marker({
            color: '#FF0000', // Set the color of the marker icon
          })
            .setLngLat([hotel.lon, hotel.lat])
            .addTo(map);
        }
      });
    }
  }, [hotels, mapContainer]);

  // Handle the search button click
  const handleSearch = async () => {
    try {
      const searchResponse = await axios.get(
        `${OSM_NOMINATIM_URL}q=${searchQuery}&format=json&limit=1`
      );
      if (searchResponse.data.length > 0) {
        const { lat, lon } = searchResponse.data[0];
        setLatitude(parseFloat(lat)); // Update latitude with search result
        setLongitude(parseFloat(lon)); // Update longitude with search result
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div>
      {/* Search bar for location */}
      <input
        type="text"
        placeholder="Search for a location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {hotels.map(hotel => (
            <li key={hotel.osm_id}>
              <h2>{hotel.display_name}</h2>
              <p>Lat: {hotel.lat}, Lon: {hotel.lon}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Hotels;
