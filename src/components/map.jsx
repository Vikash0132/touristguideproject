import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ destination }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: 'https://maps.tilehosting.com/styles/positron/style.json?key=EIhSH3UkZEiWAdBabgXK',
        center: [77.1025, 28.7041], // Default center position [longitude, latitude]
        zoom: 10,
      });

      const geolocateControl = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserLocation: true,
      });

      mapRef.current.on('load', () => {
        mapRef.current.addControl(geolocateControl);
        geolocateControl.trigger();
      });
    }

    // Update map center to selected destination
    if (destination) {
      mapRef.current.flyTo({
        center: destination,
        zoom: 12,
      });

      // Add a marker at the destination
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat(destination)
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destination]);

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Map;
