// Map.js
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize the map only once
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

    return () => map.current.remove(); // Clean up the map instance on unmount
  }, [destination.coordinates]);

  useEffect(() => {
    if (map.current) {
      map.current.flyTo({ center: destination.coordinates, zoom: 10 });
    }
  }, [destination.coordinates]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
