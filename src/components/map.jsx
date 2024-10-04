import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map({ locations }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(12);

  // Get live location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLng(longitude);
          setLat(latitude);

          if (map.current) {
            map.current.setCenter([longitude, latitude]); // Center the map on the user's location
          }
        },
        (error) => {
          console.error('Error getting location:', error.message); // Log the actual error message
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              console.error('An unknown error occurred.');
              break;
            default:
              console.error('Error occurred.');
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  // Initialize the map
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=VET3ydcm5LVgUZPZO2t4`, // Replace with your MapTiler key
      center: [lng, lat],
      zoom: zoom,
    });

    // Add user's location marker
    if (lng && lat) {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setText('You are here')) // Add popup
        .addTo(map.current);
    }
  }, [lng, lat, zoom]);

  // Add markers for search locations
  useEffect(() => {
    if (locations && map.current) {
      locations.forEach((location) => {
        new maplibregl.Marker()
          .setLngLat(location.geometry.coordinates)
          .setPopup(new maplibregl.Popup().setText(location.place_name)) // Add a popup with the place name
          .addTo(map.current);
      });
    }
  }, [locations]);

  return <div ref={mapContainer} className="map" style={{ width: '100%', height: '100%' }} />;
}
