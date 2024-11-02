import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination, startingCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);

  useEffect(() => {
    if (!destination || !destination.coordinates || !startingCoordinates) return;

    if (!map.current) {
      // Initialize the map
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=EIhSH3UkZEiWAdBabgXK',
        zoom: 6,
      });
    }

    // Add marker for the destination
    const destinationMarker = new maplibregl.Marker({ color: '#FF0000' })
      .setLngLat(destination.coordinates)
      .addTo(map.current);

    // Add or update user location marker
    if (userMarker.current) {
      userMarker.current.setLngLat(startingCoordinates);
    } else {
      userMarker.current = new maplibregl.Marker({ color: '#0000FF' })
        .setLngLat(startingCoordinates)
        .addTo(map.current);
    }

    // Create a bounding box that includes both locations
    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(startingCoordinates);
    bounds.extend(destination.coordinates);

    // Adjust the map to fit both markers
    map.current.fitBounds(bounds, { padding: 50 });

    // Draw a line between the starting location and the destination
    const route = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [startingCoordinates, destination.coordinates],
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

    return () => map.current.remove();
  }, [destination, startingCoordinates]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
