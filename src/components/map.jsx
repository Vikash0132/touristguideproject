import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS

mapboxgl.accessToken = 'TCsVxUMcJl3mlo6cnAXL'; // Replace with your MapTiler API key

const Map = ({ searchResults }) => {
  const mapContainerRef = useRef(null); // Create a ref for the map container
  const mapRef = useRef(null); // Create a ref for the map instance

  useEffect(() => {
    // Check if the map is already initialized to prevent reinitialization
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=TCsVxUMcJl3mlo6cnAXL',
        center: [77.1025, 28.7041], // Default center position [longitude, latitude]
        zoom: 10,
      });
    }

    return () => {
      // Clean up on component unmount
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
        new mapboxgl.Marker({ className: 'marker' })
          .setLngLat([location.geometry.coordinates[0], location.geometry.coordinates[1]])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${location.place_name}</h3>`))
          .addTo(mapRef.current);
      });

      // Adjust map to fit all markers
      const bounds = new mapboxgl.LngLatBounds();
      searchResults.forEach((location) => {
        bounds.extend([location.geometry.coordinates[0], location.geometry.coordinates[1]]);
      });
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }
  }, [searchResults]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
