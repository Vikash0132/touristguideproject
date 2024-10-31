import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'TCsVxUMcJl3mlo6cnAXL';

const Map = ({ destination }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapboxgl.accessToken}`,
        center: [77.1025, 28.7041], // Default center position [longitude, latitude]
        zoom: 10,
      });

      // Add geolocation control to the map to show live location
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      });
      mapRef.current.addControl(geolocateControl);

      // Trigger geolocation immediately
      geolocateControl.trigger();
    }

    // Update map center to selected destination
    if (destination) {
      mapRef.current.flyTo({
        center: destination.coordinates,
        zoom: 12,
      });

      // Add a marker at the destination
      new mapboxgl.Marker()
        .setLngLat(destination.coordinates)
        .addTo(mapRef.current);
    }

    return () => mapRef.current && mapRef.current.remove();
  }, [destination]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '75%', height: '90vh' }} />
    </div>
  );
};

export default Map;
