import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

const Map = ({ destination, startingCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(startingCoordinates);
  const [searchLocation, setSearchLocation] = useState(destination?.coordinates || null);
  const zoom = 14;
  maptilersdk.config.apiKey = 'TCsVxUMcJl3mlo6cnAXL';

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: userLocation || [77.2090, 28.6139], // Default to Delhi if no user location
      zoom: zoom
    });

    // Wait for map to load before adding markers and layers
    map.current.on('load', () => {
      if (userLocation) {
        new maptilersdk.Marker({ color: "#0000FF" })
          .setLngLat(userLocation)
          .addTo(map.current);
      }

      if (destination?.coordinates) {
        new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat(destination.coordinates)
          .addTo(map.current);

        // Add route line after map is loaded
        map.current.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                userLocation,
                destination.coordinates
              ]
            }
          }
        });

        map.current.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 4,
            'line-dasharray': [2, 1]
          }
        });

        // Fit bounds to show both points
        map.current.fitBounds([
          userLocation,
          destination.coordinates
        ], {
          padding: 50
        });
      }
    });
  }, [userLocation, zoom]);

  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    // Clear existing markers and layers
    const markers = document.getElementsByClassName('maplibregl-marker');
    while(markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }

    if (map.current.getLayer('route')) {
      map.current.removeLayer('route');
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }

    // Add markers and route
    if (userLocation) {
      new maptilersdk.Marker({ color: "#0000FF" })
        .setLngLat(userLocation)
        .addTo(map.current);
    }

    if (destination?.coordinates) {
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat(destination.coordinates)
        .addTo(map.current);

      // Add route line
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              userLocation,
              destination.coordinates
            ]
          }
        }
      });

      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 4,
          'line-dasharray': [2, 1]
        }
      });

      // Update map view
      map.current.fitBounds([
        userLocation,
        destination.coordinates
      ], {
        padding: 50
      });
    }
  }, [userLocation, destination]);

  useEffect(() => {
    setUserLocation(startingCoordinates);
  }, [startingCoordinates]);

  // Calculate distance between two points
  const calculateDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return null;
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2[1] - loc1[1]) * (Math.PI / 180);
    const dLng = (loc2[0] - loc1[0]) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(loc1[1] * (Math.PI / 180)) * Math.cos(loc2[1] * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const distance = destination?.coordinates ? 
    calculateDistance(userLocation, destination.coordinates) : null;

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      {distance && (
        <div className="distance-info">
          Distance: {distance.toFixed(2)} km
        </div>
      )}
    </div>
  );
};

export default Map;