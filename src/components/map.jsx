import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css'; // Import a CSS file for custom styles

mapboxgl.accessToken = 'TCsVxUMcJl3mlo6cnAXL'; // Your MapTiler API key

const Map = ({ searchResults }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=TCsVxUMcJl3mlo6cnAXL',
        center: [77.1025, 28.7041], // Default center position [longitude, latitude]
        zoom: 10,
      });
    }

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (searchResults && searchResults.length > 0 && mapRef.current) {
      // Remove existing markers if any
      const markers = document.getElementsByClassName('marker');
      while (markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
      }

      // Add new markers based on search results
      searchResults.forEach((location) => {
        const marker = new mapboxgl.Marker({ className: 'marker' })
          .setLngLat([location.geometry.coordinates[0], location.geometry.coordinates[1]])
          .addTo(mapRef.current);

        // Create a popup for each marker
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${location.place_name}</h3>`);

        // Show popup on hover
        marker.getElement().addEventListener('mouseenter', () => popup.addTo(mapRef.current));
        marker.getElement().addEventListener('mouseleave', () => popup.remove());
      });

      // Adjust map to fit all markers
      const bounds = new mapboxgl.LngLatBounds();
      searchResults.forEach((location) => {
        bounds.extend([location.geometry.coordinates[0], location.geometry.coordinates[1]]);
      });
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }
  }, [searchResults]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="side-panel">
        <h2>Search Results</h2>
        {searchResults && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((location, index) => (
              <li key={index}>
                <h3>{location.place_name}</h3>
                <p>{location.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <div ref={mapContainerRef} style={{ width: '80%', height: '100%' }} />
    </div>

  );
};

export default Map;
