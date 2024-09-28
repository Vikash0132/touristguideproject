import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: require('./marker-icon.png'), // Replace with your marker icon path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ searchResults }) => {
  useEffect(() => {
    // You can use this effect to adjust the map view based on search results
    if (searchResults.length > 0) {
      // Example: Fit map bounds to the first search result
      const { center } = searchResults[0];
      map.setView(center, 13);
    }
  }, [searchResults]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=TCsVxUMcJl3mlo6cnAXL" // Replace with your MapTiler API key
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
      />
      {searchResults.map((result, index) => (
        <Marker
          key={index}
          position={[result.geometry.coordinates[1], result.geometry.coordinates[0]]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h3>{result.place_name}</h3>
              <p>{result.text}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
