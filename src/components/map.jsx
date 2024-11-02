import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);

  useEffect(() => {
    if (!destination || !destination.coordinates) return;

    if (!map.current) {
      // Initialize the map
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=EIhSH3UkZEiWAdBabgXK', // Replace with your MapTiler API key
        zoom: 6,
      });
    }

    // Add marker for the destination
    const destinationMarker = new maplibregl.Marker({ color: '#FF0000' })
      .setLngLat(destination.coordinates)
      .addTo(map.current);

    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];

          // Add or update user location marker
          if (userMarker.current) {
            userMarker.current.setLngLat(userCoordinates);
          } else {
            userMarker.current = new maplibregl.Marker({ color: '#0000FF' })
              .setLngLat(userCoordinates)
              .addTo(map.current);
          }

          // Create a bounding box that includes both locations
          const bounds = new maplibregl.LngLatBounds();
          bounds.extend(userCoordinates);
          bounds.extend(destination.coordinates);

          // Adjust the map to fit both markers
          map.current.fitBounds(bounds, { padding: 50 });

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

          // Calculate midpoint and distance
          const midpoint = [
            (userCoordinates[0] + destination.coordinates[0]) / 2,
            (userCoordinates[1] + destination.coordinates[1]) / 2,
          ];
          const distance = calculateDistance(userCoordinates, destination.coordinates);

          // Display distance at the midpoint
          new maplibregl.Popup({ closeButton: false, closeOnClick: false })
            .setLngLat(midpoint)
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
