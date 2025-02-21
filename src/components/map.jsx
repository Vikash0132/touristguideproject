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

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

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
              Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos((loc2.lat) * (Math.PI / 180)) *
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
