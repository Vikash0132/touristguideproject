import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);

  useEffect(() => {
    if (!destination || !destination.coordinates) return;

    // Initialize the map if it hasn't been already
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=EIhSH3UkZEiWAdBabgXK', // Replace with your MapTiler API key
        center: destination.coordinates,
        zoom: 6,
      });
    } else {
      map.current.flyTo({ center: destination.coordinates, zoom: 10 });
    }

    // Add a marker at the destination location
    new maplibregl.Marker({ color: '#FF0000' })
      .setLngLat(destination.coordinates)
      .addTo(map.current);

    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];

          // Add a marker for the user's location
          if (userMarker.current) {
            userMarker.current.setLngLat(userCoordinates);
          } else {
            userMarker.current = new maplibregl.Marker({ color: '#0000FF' })
              .setLngLat(userCoordinates)
              .addTo(map.current);
          }

          // Draw a line between the user's location and the destination
          const route = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [userCoordinates, destination.coordinates],
            },
          };

          // Add or update the route source and layer
          if (map.current.getSource('route')) {
            map.current.getSource('route').setData(route);
          } else {
            map.current.addSource('route', {
              type: 'geojson',
              data: route,
            });
            map.current.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#888',
                'line-width': 4,
              },
            });
          }

          // Calculate and display distance
          const distance = calculateDistance(userCoordinates, destination.coordinates);
          const popup = new maplibregl.Popup()
            .setLngLat(destination.coordinates)
            .setHTML(`<h3>Distance: ${distance.toFixed(2)} km</h3>`)
            .addTo(map.current);
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true }
      );
    }

    return () => map.current.remove();
  }, [destination]);

  // Function to calculate distance between two coordinates in kilometers
  const calculateDistance = (coords1, coords2) => {
    const [lon1, lat1] = coords1;
    const [lon2, lat2] = coords2;
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
