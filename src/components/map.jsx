<<<<<<< HEAD
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map({ searchQuery }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const zoom = 14;
  maptilersdk.config.apiKey = 'TCsVxUMcJl3mlo6cnAXL';
=======
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination, startingCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);
  const isMapLoaded = useRef(false); // New flag to check if the map is loaded
>>>>>>> 5195875e58bc3d5a987b4c31dcda81a09443cceb

  useEffect(() => {
    if (!destination || !destination.coordinates || !startingCoordinates) return;

<<<<<<< HEAD
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [80.0409, 12.8230], // Initial center
      zoom: zoom
    });

    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      new maptilersdk.Marker({ color: "#0000FF" })
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });
  }, [zoom]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch search location coordinates
      fetch(`https://api.maptiler.com/geocoding/${searchQuery}.json?key=TCsVxUMcJl3mlo6cnAXL`)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const { center } = data.features[0];
            setSearchLocation({ lat: center[1], lng: center[0] });

            new maptilersdk.Marker({ color: "#FF0000" })
              .setLngLat([center[0], center[1]])
              .addTo(map.current);

            map.current.flyTo({ center: [center[0], center[1]], zoom: zoom });
          }
        })
        .catch(error => console.error('Error fetching search location:', error));
    }
  }, [searchQuery, zoom]);

  const calculateDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return null;
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const distance = calculateDistance(userLocation, searchLocation);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      {distance && (
        <div className="distance-info">
          Distance from your location: {distance.toFixed(2)} km
        </div>
      )}
    </div>
  );
}
=======
    if (!map.current) {
      // Initialize the map
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=EIhSH3UkZEiWAdBabgXK',
        zoom: 6,
      });

      // Add a load event listener to mark the map as loaded
      map.current.on('style.load', () => {
        isMapLoaded.current = true;

        // Add markers and line once the style is loaded
        addMarkersAndLine();
      });
    } else if (isMapLoaded.current) {
      // If the map is already loaded, directly add markers and line
      addMarkersAndLine();
    }

    function addMarkersAndLine() {
      // Add or update destination marker
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat(destination.coordinates)
        .addTo(map.current);

      // Add or update starting location marker
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
    }

    return () => {
      // Clean up map resources on unmount
      if (map.current) {
        map.current.remove();
      }
    };
  }, [destination, startingCoordinates]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
>>>>>>> 5195875e58bc3d5a987b4c31dcda81a09443cceb
