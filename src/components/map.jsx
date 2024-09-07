import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const srmCoordinates = { lng: 80.0409, lat: 12.8230 }; // SRM coordinates
  const zoom = 14;
  maptilersdk.config.apiKey = 'TCsVxUMcJl3mlo6cnAXL';

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [srmCoordinates.lng, srmCoordinates.lat],
      zoom: zoom
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([srmCoordinates.lng, srmCoordinates.lat])
      .addTo(map.current);
  }, [srmCoordinates.lng, srmCoordinates.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
