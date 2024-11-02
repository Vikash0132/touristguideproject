// Map.js
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Check if destination and coordinates are defined before initializing the map
    if (!destination || !destination.coordinates) return;

    // Initialize map if it hasn't been initialized already
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=EIhSH3UkZEiWAdBabgXK', // Replace with your MapTiler API key
        center: destination.coordinates,
        zoom: 10,
      });

      // Add a marker at the destination
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat(destination.coordinates)
        .addTo(map.current);
    } else {
      // If map is already initialized, fly to the new coordinates
      map.current.flyTo({ center: destination.coordinates, zoom: 10 });
    }

    return () => map.current.remove(); // Clean up the map instance on unmount
  }, [destination]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
