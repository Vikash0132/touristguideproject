import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map({ destination, startingCoordinates }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(startingCoordinates);
  const [searchLocation, setSearchLocation] = useState(destination ? destination.coordinates : null);
  const zoom = 14;
  maptilersdk.config.apiKey = 'TCsVxUMcJl3mlo6cnAXL';

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: userLocation || [80.0409, 12.8230], // Initial center
      zoom: zoom
    });

    if (userLocation) {
      new maptilersdk.Marker({ color: "#0000FF" })
        .setLngLat(userLocation)
        .addTo(map.current);
    }
  }, [zoom, userLocation]);

  useEffect(() => {
    if (destination) {
      setSearchLocation(destination.coordinates);

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat(destination.coordinates)
        .addTo(map.current);

      map.current.flyTo({ center: destination.coordinates, zoom: zoom });
    }
  }, [destination, zoom]);

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