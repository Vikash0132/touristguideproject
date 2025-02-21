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
  maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILER_KEY;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: userLocation || [80.0409, 12.8230],
      zoom: zoom
    });
  }, [userLocation, zoom]);

  useEffect(() => {
    if (!map.current || !userLocation) return;

    // Clear existing markers
    const markers = document.getElementsByClassName('maplibregl-marker');
    while(markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }

    // Add user location marker
    new maptilersdk.Marker({ color: "#0000FF" })
      .setLngLat(userLocation)
      .addTo(map.current);

    if (destination?.coordinates) {
      // Add destination marker
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat(destination.coordinates)
        .addTo(map.current);

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

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;